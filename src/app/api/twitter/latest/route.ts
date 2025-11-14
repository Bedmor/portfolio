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
  public_metrics?: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
    impression_count: number;
  };
}

interface TwitterApiResponse {
  data: TwitterTweet[];
  includes?: {
    users: TwitterUser[];
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
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics&exclude=retweets,replies`,
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
