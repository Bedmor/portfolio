"use client";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function incrementAndFetchViews() {
      try {
        const response = await fetch("/api/views", {
          method: "POST",
        });
        if (response.ok) {
          const data = (await response.json()) as { views: number };
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to fetch views:", error);
      } finally {
        setLoading(false);
      }
    }

    void incrementAndFetchViews();
  }, []);

  if (loading) {
    return (
      <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
        <Eye className="h-3 w-3 text-white sm:h-4 sm:w-4" />
        <div className="h-4 w-12 animate-pulse rounded bg-white/20"></div>
      </div>
    );
  }

  if (views === null) {
    return null;
  }

  return (
    <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
      <Eye className="h-3 w-3 text-white sm:h-4 sm:w-4" />
      <span className="text-xs font-semibold text-white sm:text-sm">
        {views.toLocaleString()} {views === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
