import { NextResponse } from "next/server";

// In-memory storage (will reset on server restart)
// For production, use a database like Vercel KV, Redis, or PostgreSQL
let viewCount = 0;

export async function POST() {
  try {
    viewCount += 1;

    return NextResponse.json({ views: viewCount });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ views: viewCount });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json(
      { error: "Failed to fetch views" },
      { status: 500 },
    );
  }
}
