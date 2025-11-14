"use client";
import { useState, useEffect } from "react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../../../components/motion-primitives/morphing-popover";
import { NotebookPen } from "lucide-react";
import Image from "next/image";
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  coverImage?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && posts.length === 0) {
      void fetchPosts();
    }
  }, [isOpen, posts.length]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await fetch("/api/blog?published=true");
      if (response.ok) {
        const data = (await response.json()) as BlogPost[];
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  return (
    <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex flex-col items-center justify-center">
        <MorphingPopoverTrigger>
          <div className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white text-3xl transition hover:scale-110 sm:h-24 sm:w-24">
            <NotebookPen size={64} />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-xs font-semibold text-gray-900 sm:text-sm">
          Blog
        </h1>
      </div>

      <MorphingPopoverContent className="z-50 h-screen w-screen overflow-auto">
        <button
          onClick={() => {
            setIsOpen(false);
            setSelectedPost(null);
          }}
          className="fixed top-4 left-4 z-50 rounded-full bg-white p-2 text-2xl text-gray-600 shadow-lg transition-transform hover:scale-110 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close"
        >
          &larr;
        </button>

        <div className="mx-auto min-h-screen w-full bg-gray-100 p-4 pt-16 sm:p-6 md:p-8 lg:p-12">
          {!selectedPost ? (
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                  Blog Posts
                </h1>
                <p className="text-gray-600">
                  Thoughts, tutorials, and updates
                </p>
              </div>

              {loading ? (
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              ) : posts.length === 0 ? (
                <div className="text-center text-gray-600">
                  No blog posts available yet. Check back soon!
                </div>
              ) : (
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => handlePostClick(post)}
                      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:scale-105 hover:shadow-xl"
                    >
                      {post.coverImage && (
                        <div className="h-48 w-full overflow-hidden bg-gray-200">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={400}
                            height={192}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-blue-600">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mb-4 line-clamp-3 text-gray-600">
                            {post.excerpt}
                          </p>
                        )}
                        <time className="text-sm text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mx-auto max-w-4xl">
              <button
                onClick={handleBackToPosts}
                className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                ← Back to all posts
              </button>
              <article className="rounded-lg bg-white p-8 shadow-md">
                {selectedPost.coverImage && (
                  <div className="-mx-8 -mt-8 mb-6 h-64 w-[calc(100%+4rem)] overflow-hidden bg-gray-200">
                    <Image
                      src={selectedPost.coverImage}
                      alt={selectedPost.title}
                      width={800}
                      height={256}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h1 className="mb-4 text-4xl font-bold text-gray-900">
                  {selectedPost.title}
                </h1>
                <time className="mb-6 block text-sm text-gray-400">
                  {new Date(selectedPost.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
                <div className="prose prose-lg max-w-none">
                  {selectedPost.content.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          )}
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
