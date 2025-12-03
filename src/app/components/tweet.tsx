import Image from "next/image";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

export interface TweetData {
  id: string;
  text: string;
  created_at: string;
  author: {
    name: string;
    username: string;
    profile_image_url: string;
  };
  public_metrics?: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
  };
  media_urls?: string[];
  quoted_tweet?: TweetData;
}

interface TweetProps {
  tweet: TweetData;
  isQuoted?: boolean;
  showMetrics?: boolean;
}

export default function Tweet({
  tweet,
  isQuoted = false,
  showMetrics = true,
}: TweetProps) {
  const tweetUrl = `https://twitter.com/${tweet.author.username}/status/${tweet.id}`;
  const formattedDate = new Date(tweet.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Remove t.co URLs from text if media or quoted tweet is present
  const cleanText = tweet.text.replace(/https:\/\/t\.co\/\S+/g, "").trim();

  const Component = isQuoted ? "div" : "a";
  const linkProps = isQuoted
    ? {}
    : {
        href: tweetUrl,
        target: "_blank" as const,
        rel: "noopener noreferrer" as const,
      };

  return (
    <Component
      {...linkProps}
      className={`glass flex w-full flex-row items-start gap-2 rounded-lg p-3 shadow sm:gap-3 sm:p-4 ${
        !isQuoted ? "transition-shadow hover:shadow-md" : ""
      } ${isQuoted ? "border border-gray-200" : ""}`}
    >
      <Image
        src={tweet.author.profile_image_url}
        alt={`${tweet.author.name} avatar`}
        width={isQuoted ? 32 : 40}
        height={isQuoted ? 32 : 40}
        className={`shrink-0 rounded-full ${isQuoted ? "h-8 w-8" : "sm:h-12 sm:w-12"}`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <h3
            className={`truncate font-bold ${isQuoted ? "text-xs" : "text-xs sm:text-sm"}`}
          >
            {tweet.author.name}
          </h3>
          <span
            className={`shrink-0 text-gray-800 ${isQuoted ? "text-xs" : "text-xs"}`}
          >
            @{tweet.author.username}
          </span>
          <span
            className={`shrink-0 text-gray-800 ${isQuoted ? "text-xs" : "text-xs"} ${isQuoted ? "" : "hidden sm:inline"}`}
          >
            · {formattedDate}
          </span>
        </div>
        <p
          className={`text-gray-900 ${isQuoted ? "line-clamp-3 text-xs" : "line-clamp-3 text-xs sm:text-sm"}`}
        >
          {cleanText}
        </p>

        {/* Media */}
        {tweet.media_urls && tweet.media_urls.length > 0 && (
          <div className="mt-2 grid gap-2">
            {tweet.media_urls.map((url, index) => (
              <div
                key={index}
                className={`glass relative w-full overflow-hidden rounded-lg bg-gray-100/10 ${
                  isQuoted ? "h-32" : "h-16 sm:h-48 md:h-56"
                }`}
              >
                <Image
                  src={url}
                  alt={`Tweet image ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}

        {/* Quoted Tweet */}
        {tweet.quoted_tweet && (
          <div className="mt-2">
            <Tweet
              tweet={tweet.quoted_tweet}
              isQuoted={true}
              showMetrics={false}
            />
          </div>
        )}

        {/* Metrics */}
        {showMetrics && tweet.public_metrics && (
          <div className="mt-2 flex gap-3 text-xs text-gray-500 sm:gap-4">
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {tweet.public_metrics.reply_count}
            </span>
            <span className="flex items-center gap-1">
              <Repeat2 className="h-3 w-3" />
              {tweet.public_metrics.retweet_count}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {tweet.public_metrics.like_count}
            </span>
          </div>
        )}
      </div>
    </Component>
  );
}
