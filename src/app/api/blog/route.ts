import { NextResponse } from "next/server";
import { db } from "~/lib/db";
import { auth } from "~/auth";

// GET all blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const posts = await db.blogPost.findMany({
      where: published === "true" ? { published: true } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

// POST create a new blog post (admin only)
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      title?: string;
      slug?: string;
      content?: string;
      excerpt?: string;
      coverImage?: string;
      published?: boolean;
    };
    const { title, slug, content, excerpt, coverImage, published } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 },
      );
    }

    // Check if slug already exists
    const existingPost = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 },
      );
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt ?? null,
        coverImage: coverImage ?? null,
        published: published ?? false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
