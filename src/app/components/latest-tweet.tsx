"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
interface Tweet {
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
}

export default function LatestTweet() {
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestTweet() {
      try {
        const response = await fetch("/api/twitter/latest");
        if (!response.ok) {
          throw new Error("Failed to fetch tweet");
        }
        const data = (await response.json()) as Tweet;
        setTweet(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    void fetchLatestTweet();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full animate-pulse flex-row items-center gap-2 rounded-lg bg-white p-3 shadow sm:p-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 sm:h-12 sm:w-12"></div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-gray-200 sm:h-4"></div>
          <div className="h-2 w-1/2 rounded bg-gray-200 sm:h-3"></div>
        </div>
      </div>
    );
  }

  if (error || !tweet) {
    return (
      <div className="flex w-full flex-row items-center gap-2 rounded-lg bg-white p-3 shadow sm:p-4">
        <p className="text-xs text-gray-500 sm:text-sm">
          Unable to load latest tweet. Follow me{" "}
          <a
            href="https://twitter.com/acabesim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            @acabesim
          </a>
        </p>
      </div>
    );
  }

  const tweetUrl = `https://twitter.com/${tweet.author.username}/status/${tweet.id}`;
  const formattedDate = new Date(tweet.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Remove t.co URLs from text if media is present
  const cleanText =
    tweet.media_urls && tweet.media_urls.length > 0
      ? tweet.text.replace(/https:\/\/t\.co\/\S+/g, "").trim()
      : tweet.text;

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full flex-row items-start gap-2 rounded-lg bg-white p-3 shadow transition-shadow hover:shadow-md sm:gap-3 sm:p-4"
    >
      <Image
        src={tweet.author.profile_image_url}
        alt={`${tweet.author.name} avatar`}
        width={40}
        height={40}
        className="shrink-0 rounded-full sm:h-12 sm:w-12"
      />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1 sm:gap-2">
          <h3 className="truncate text-xs font-bold sm:text-sm">
            {tweet.author.name}
          </h3>
          <span className="shrink-0 text-xs text-gray-500">
            @{tweet.author.username}
          </span>
          <span className="hidden shrink-0 text-xs text-gray-400 sm:inline">
            · {formattedDate}
          </span>
        </div>
        <p className="line-clamp-3 text-xs text-gray-700 sm:text-sm">
          {cleanText}
        </p>
        {tweet.media_urls && tweet.media_urls.length > 0 && (
          <div className="mt-2 grid gap-2">
            {tweet.media_urls.map((url, index) => (
              <div
                key={index}
                className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 sm:h-64"
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
        {tweet.public_metrics && (
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
    </a>
  );
}
