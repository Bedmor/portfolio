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
          <div className="liquid-glass flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border border-pink-400/40 shadow-2xl transition hover:scale-110 sm:h-24 sm:w-24">
            <NotebookPen className="h-10 w-10 text-white drop-shadow-lg sm:h-14 sm:w-14" />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-xs font-semibold text-white drop-shadow-md sm:text-sm">
          Blog
        </h1>
      </div>

      <MorphingPopoverContent className="z-50 h-screen w-screen overflow-auto">
        <button
          onClick={() => {
            setIsOpen(false);
            setSelectedPost(null);
          }}
          className="glass-matte-button fixed top-12 left-4 z-50 h-10 w-10 text-xl sm:top-6 sm:left-6 md:h-12 md:w-12"
          aria-label="Close"
        >
          &larr;
        </button>

        <div className="mx-auto min-h-screen w-full bg-slate-950/85 backdrop-blur-2xl p-4 pt-20 text-white sm:p-6 sm:pt-24 md:p-8 md:pt-28 lg:p-12">
          {!selectedPost ? (
            <>
              <div className="mb-6 text-center sm:mb-8">
                <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
                  Blog Posts
                </h1>
                <p className="text-sm text-white/75 sm:text-base">
                  Thoughts, tutorials, and updates
                </p>
              </div>

              {loading ? (
                <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="glass-matte-card overflow-hidden p-6"
                    >
                      <div className="h-48 w-full animate-pulse rounded-xl bg-white/10" />
                      <div className="mt-4 space-y-2">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-white/15" />
                        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="glass-matte-card mx-auto max-w-md p-8 text-center text-white/75">
                  No blog posts available yet. Check back soon!
                </div>
              ) : (
                <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => handlePostClick(post)}
                      className="group glass-matte-card cursor-pointer overflow-hidden p-0"
                    >
                      {post.coverImage && (
                        <div className="h-48 w-full overflow-hidden bg-slate-900/50">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={400}
                            height={192}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h2 className="mb-2 text-xl font-bold text-white transition group-hover:text-pink-300">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mb-4 line-clamp-3 text-sm text-white/75">
                            {post.excerpt}
                          </p>
                        )}
                        <time className="text-xs text-white/55 font-medium">
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
                className="glass-matte-button mb-6 px-4 py-2 text-xs sm:text-sm"
              >
                ← Back to all posts
              </button>
              <article className="glass-matte-card p-6 sm:p-8 md:p-10">
                {selectedPost.coverImage && (
                  <div className="-mx-6 -mt-6 mb-6 h-56 w-[calc(100%+3rem)] overflow-hidden rounded-t-xl sm:-mx-8 sm:-mt-8 sm:mb-8 sm:h-72 sm:w-[calc(100%+4rem)] md:-mx-10 md:-mt-10 md:w-[calc(100%+5rem)]">
                    <Image
                      src={selectedPost.coverImage}
                      alt={selectedPost.title}
                      width={800}
                      height={288}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <h1 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl md:text-4xl tracking-tight">
                  {selectedPost.title}
                </h1>
                <time className="mb-6 block text-xs font-medium text-pink-300/80 sm:text-sm">
                  {new Date(selectedPost.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
                <div className="prose prose-invert prose-lg max-w-none text-white/85">
                  {selectedPost.content.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-4 leading-relaxed">
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
