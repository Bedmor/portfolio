"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

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

interface FormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  published: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    published: false,
  });

  useEffect(() => {
    void fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      if (response.ok) {
        const data = (await response.json()) as BlogPost[];
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
      const method = editingPost ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form and refresh posts
        setFormData({
          title: "",
          slug: "",
          content: "",
          excerpt: "",
          coverImage: "",
          published: false,
        });
        setEditingPost(null);
        await fetchPosts();
      } else {
        const error = (await response.json()) as { error: string };
        alert(error.error || "Failed to save post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt ?? "",
      coverImage: post.coverImage ?? "",
      published: post.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchPosts();
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      published: false,
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
    if (!editingPost) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(title) }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
          <div className="flex flex-row gap-2">
              <button onClick={() => signOut({ callbackUrl: '/' })} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Logout
              </button>
              <button
                onClick={() => router.push("/")}
                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                Back to Site
              </button>
          </div>
        </div>

        {/* Blog Post Form */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            {editingPost ? "Edit Post" : "Create New Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="post-url-slug"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Brief description (optional)"
                rows={2}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 p-2 font-mono text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Write your blog post content here..."
                rows={12}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cover Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="published"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Publish immediately
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingPost
                    ? "Update Post"
                    : "Create Post"}
              </button>
              {editingPost && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg bg-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts List */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            All Posts ({posts.length})
          </h2>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-500">
                No blog posts yet. Create your first post above!
              </p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          post.published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                    {post.excerpt && (
                      <p className="mt-1 text-sm text-gray-500">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">
                      Created:{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
