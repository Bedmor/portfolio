"use client";
import { useState, useEffect } from "react";
import { TableProperties } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../../../components/motion-primitives/morphing-popover";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  has_pages: boolean;
  homepage?: string;
}

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && repos.length === 0) {
      void fetchGitHubRepos();
    }
  }, [isOpen, repos.length]);

  async function fetchGitHubRepos() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.github.com/users/Bedmor/repos?sort=updated&per_page=10",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = (await response.json()) as GitHubRepo[];
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function getRepoLink(repo: GitHubRepo): string {
    // Check for GitHub Pages in homepage
    if (repo.homepage?.includes("github.io")) {
      return repo.homepage;
    }
    // Check if has_pages is true and construct the GitHub Pages URL
    if (repo.has_pages) {
      return `https://bedmor.github.io/${repo.name}`;
    }
    // Default to repository URL
    return repo.html_url;
  }

  return (
    <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex flex-col items-center justify-center">
        <MorphingPopoverTrigger>
          <div className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white transition hover:scale-110 sm:h-24 sm:w-24">
            <TableProperties size={48} />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-center text-xs font-semibold text-white sm:text-sm">
          Projects
        </h1>
      </div>

      <MorphingPopoverContent className="z-50 h-screen w-screen overflow-y-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="z-50 mt-3 h-16 w-16 rounded-full bg-white p-2 text-xl font-bold text-gray-600 shadow-lg transition-transform hover:scale-110 hover:bg-gray-100 hover:text-gray-900 sm:top-4 sm:left-4 sm:text-2xl"
          aria-label="Close"
        >
          &larr;
        </button>
        <div className="w-full bg-gray-100 p-4 pt-16 sm:p-6 sm:pt-20 md:p-8 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl">
              My GitHub Projects
            </h2>

            {loading && (
              <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-lg bg-white shadow-md"
                  >
                    {/* Image skeleton */}
                    <div className="h-48 w-full animate-pulse bg-gray-200" />

                    {/* Content skeleton */}
                    <div className="space-y-3 p-6">
                      {/* Title skeleton */}
                      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

                      {/* Excerpt skeleton */}
                      <div className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
                      </div>

                      {/* Date skeleton */}
                      <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-center text-red-600">
                <p className="font-semibold">Error loading repositories</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!loading && !error && repos.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo, index) => {
                  const repoLink = getRepoLink(repo);
                  const isGitHubPages =
                    repo.has_pages || repo.homepage?.includes("github.io");
                  return (
                    <a
                      key={repo.id}
                      href={repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group animate-in fade-in slide-in-from-bottom rounded-lg bg-white p-5 shadow-md transition duration-500 hover:shadow-xl"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "backwards",
                      }}
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                            {repo.name}
                          </h3>
                          {isGitHubPages && (
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              <svg
                                className="h-3 w-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Live Demo
                            </span>
                          )}
                        </div>
                        <svg
                          className="h-5 w-5 shrink-0 text-gray-400 transition group-hover:text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </div>

                      <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                        {repo.description || "No description available"}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span className="h-3 w-3 rounded-full bg-purple-800"></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            {!loading && !error && repos.length === 0 && (
              <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-600">
                <p className="text-lg">No repositories found</p>
              </div>
            )}
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
