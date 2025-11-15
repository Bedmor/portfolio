import { Octokit } from "octokit";
import LatestTweet from "./latest-tweet";
import Image from "next/image";
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface PushPayload {
  repository_id: number;
  push_id: number;
  ref: string;
  head: string;
  before: string;
}

export default async function ActivityFeed() {
  // Get user's recent events (includes commits, pushes, PRs, etc.)
  const events = await octokit.request("GET /users/{username}/events/public", {
    username: "Bedmor",
    per_page: 10, // Get last 10 events
  });

  // Filter for push events (commits)
  const pushEvents = events.data.filter((event) => event.type === "PushEvent");

  // Get the most recent push event
  const latestPush = pushEvents[0];

  let commitData = null;
  if (latestPush) {
    const payload = latestPush.payload as PushPayload;
    // Extract owner and repo from repo name (e.g., "Bedmor/portfolio")
    const [owner, repo] = latestPush.repo.name.split("/");

    if (owner && repo) {
      // Fetch the actual commit details using the SHA
      const commitResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/commits/{ref}",
        {
          owner,
          repo,
          ref: payload.head,
        },
      );
      commitData = commitResponse.data;
    }
  }
  const payload = latestPush ? (latestPush.payload as PushPayload) : null;

  return (
    <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2 p-2 sm:col-span-2 sm:gap-3 sm:p-4 lg:col-span-3">
      {latestPush && commitData && payload && latestPush.created_at && (
        <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 shadow sm:flex-row sm:items-center sm:gap-2 sm:p-4">
          <Image
            src={latestPush.actor.avatar_url}
            alt="User Avatar"
            width={50}
            height={50}
            className="shrink-0 self-start rounded-full sm:self-auto"
          />
          <h3 className="shrink-0 text-xs font-bold sm:text-sm">
            Latest Commit
          </h3>
          <p className="min-w-0 truncate text-xs text-gray-600 sm:text-sm">
            {commitData.commit.message}
          </p>
          <p className="shrink-0 text-xs text-gray-400">
            {latestPush.repo.name}
          </p>
          <p className="hidden shrink-0 text-xs text-gray-400 sm:block">
            {payload.ref.replace("refs/heads/", "")}
          </p>
          <p className="shrink-0 text-xs whitespace-nowrap text-gray-400">
            {new Date(latestPush.created_at).toLocaleDateString()}
          </p>
        </div>
      )}
      <LatestTweet />
    </div>
  );
}
