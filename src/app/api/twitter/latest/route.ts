import { NextResponse } from "next/server";

interface TwitterUser {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

interface TwitterTweet {
  id: string;
  text: string;
  created_at: string;
  author_id: string;
  referenced_tweets?: Array<{
    type: string;
    id: string;
  }>;
  public_metrics?: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
    impression_count: number;
  };
  entities?: {
    urls?: Array<{
      url: string;
      expanded_url: string;
      display_url: string;
      images?: Array<{
        url: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  attachments?: {
    media_keys?: string[];
  };
}

interface TwitterMedia {
  media_key: string;
  type: string;
  url?: string;
  preview_image_url?: string;
  width?: number;
  height?: number;
}

interface TwitterApiResponse {
  data: TwitterTweet[];
  includes?: {
    users: TwitterUser[];
    media?: TwitterMedia[];
    tweets?: TwitterTweet[];
  };
}

export async function GET() {
  try {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
      return NextResponse.json(
        { error: "Twitter API token not configured" },
        { status: 500 },
      );
    }

    // Fetch user ID first
    const userResponse = await fetch(
      "https://api.twitter.com/2/users/by/username/acabesim?user.fields=profile_image_url",
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    );

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Failed to fetch user:", errorText);
      throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
    }

    const userData = (await userResponse.json()) as { data: TwitterUser };
    const userId = userData.data.id;

    // Fetch user's tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,entities,attachments,referenced_tweets&expansions=attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&media.fields=url,preview_image_url,width,height&user.fields=name,username,profile_image_url&exclude=retweets,replies`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    );

    if (!tweetsResponse.ok) {
      const errorText = await tweetsResponse.text();
      console.error("Failed to fetch tweets:", errorText);
      throw new Error(`Failed to fetch tweets: ${tweetsResponse.statusText}`);
    }

    const tweetsData = (await tweetsResponse.json()) as TwitterApiResponse;

    if (!tweetsData.data || tweetsData.data.length === 0) {
      return NextResponse.json({ error: "No tweets found" }, { status: 404 });
    }

    const latestTweet = tweetsData.data[0]!;

    // Extract media/images
    const mediaUrls: string[] = [];

    // Check for attached media
    if (latestTweet.attachments?.media_keys && tweetsData.includes?.media) {
      console.log("Media found:", tweetsData.includes.media);
      for (const mediaKey of latestTweet.attachments.media_keys) {
        const media = tweetsData.includes.media.find(
          (m) => m.media_key === mediaKey,
        );
        if (media) {
          // For photos, use url. For videos, use preview_image_url
          const mediaUrl =
            media.type === "photo" ? media.url : media.preview_image_url;
          if (mediaUrl) {
            console.log("Adding media URL:", mediaUrl);
            mediaUrls.push(mediaUrl);
          }
        }
      }
    }

    // Check for image URLs in entities (like https://t.co links with images)
    if (latestTweet.entities?.urls) {
      for (const urlEntity of latestTweet.entities.urls) {
        if (urlEntity.images && urlEntity.images.length > 0) {
          mediaUrls.push(urlEntity.images[0]!.url);
        }
      }
    }

    console.log("Final media URLs:", mediaUrls);

    // Extract quoted tweet if present
    let quotedTweet = null;
    if (latestTweet.referenced_tweets) {
      const quotedRef = latestTweet.referenced_tweets.find(
        (ref) => ref.type === "quoted",
      );
      if (quotedRef && tweetsData.includes?.tweets) {
        const quotedTweetData = tweetsData.includes.tweets.find(
          (t) => t.id === quotedRef.id,
        );
        if (quotedTweetData && tweetsData.includes?.users) {
          const quotedAuthor = tweetsData.includes.users.find(
            (u) => u.id === quotedTweetData.author_id,
          );
          if (quotedAuthor) {
            // Extract media for quoted tweet
            const quotedMediaUrls: string[] = [];
            if (
              quotedTweetData.attachments?.media_keys &&
              tweetsData.includes?.media
            ) {
              for (const mediaKey of quotedTweetData.attachments.media_keys) {
                const media = tweetsData.includes.media.find(
                  (m) => m.media_key === mediaKey,
                );
                if (media) {
                  const mediaUrl =
                    media.type === "photo"
                      ? media.url
                      : media.preview_image_url;
                  if (mediaUrl) {
                    quotedMediaUrls.push(mediaUrl);
                  }
                }
              }
            }

            quotedTweet = {
              id: quotedTweetData.id,
              text: quotedTweetData.text,
              created_at: quotedTweetData.created_at,
              author: {
                name: quotedAuthor.name,
                username: quotedAuthor.username,
                profile_image_url: quotedAuthor.profile_image_url,
              },
              public_metrics: quotedTweetData.public_metrics,
              media_urls:
                quotedMediaUrls.length > 0 ? quotedMediaUrls : undefined,
            };
          }
        }
      }
    }

    // Format response
    const response = {
      id: latestTweet.id,
      text: latestTweet.text,
      created_at: latestTweet.created_at,
      author: {
        name: userData.data.name,
        username: userData.data.username,
        profile_image_url: userData.data.profile_image_url,
      },
      public_metrics: latestTweet.public_metrics,
      media_urls: mediaUrls.length > 0 ? mediaUrls : undefined,
      quoted_tweet: quotedTweet,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching tweet:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch latest tweet",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
