"use client";

import { useEffect, useState } from "react";
import Tweet, { type TweetData } from "./tweet";

export default function LatestTweet() {
  const [tweet, setTweet] = useState<TweetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestTweet() {
      try {
        const response = await fetch("/api/twitter/latest");
        if (!response.ok) {
          throw new Error("Failed to fetch tweet");
        }
        const data = (await response.json()) as TweetData;
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
      <div className="glass flex w-full animate-pulse flex-row items-center gap-2 rounded-lg p-3 shadow sm:p-4">
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
      <div className="glass flex w-full flex-row items-center gap-2 rounded-lg p-3 shadow sm:p-4">
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

  return <Tweet tweet={tweet} />;
}
