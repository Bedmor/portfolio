import { Octokit } from "octokit";
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

export interface GitHubActivityData {
  avatarUrl: string;
  commitMessage: string;
  repoName: string;
  branch: string;
  createdAt: string;
}

export async function fetchGitHubActivity(): Promise<GitHubActivityData | null> {
  try {
    const events = await octokit.request(
      "GET /users/{username}/events/public",
      {
        username: "Bedmor",
        per_page: 10,
      },
    );

    const pushEvents = events.data.filter(
      (event) => event.type === "PushEvent",
    );
    const latestPush = pushEvents[0];

    if (!latestPush) return null;

    const payload = latestPush.payload as PushPayload;
    const [owner, repo] = latestPush.repo.name.split("/");

    if (!owner || !repo) return null;

    const commitResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/commits/{ref}",
      {
        owner,
        repo,
        ref: payload.head,
      },
    );

    return {
      avatarUrl: latestPush.actor.avatar_url,
      commitMessage: commitResponse.data.commit.message,
      repoName: latestPush.repo.name,
      branch: payload.ref.replace("refs/heads/", ""),
      createdAt: new Date(latestPush.created_at!).toLocaleDateString(),
    };
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return null;
  }
}

export default function GitHubActivity({
  data,
}: {
  data: GitHubActivityData | null;
}) {
  if (!data) {
    return (
      <div className="liquid-glass flex w-full flex-col items-center justify-center gap-2 rounded-2xl p-5 shadow-2xl">
        <p className="text-sm font-medium text-white/70">No recent GitHub activity</p>
      </div>
    );
  }

  return (
    <div className="liquid-glass flex w-full flex-col gap-3 rounded-2xl p-4 shadow-2xl sm:flex-row sm:items-center sm:gap-4">
      <Image
        src={data.avatarUrl}
        alt="User Avatar"
        width={50}
        height={50}
        className="self-start rounded-full border border-white/30 shadow-md sm:self-auto"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Latest Commit</span>
          <span className="text-xs text-white/50">• {data.createdAt}</span>
        </div>
        <h3 className="truncate text-sm font-bold text-white mt-0.5">{data.commitMessage}</h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
          <span className="font-medium text-purple-200">{data.repoName}</span>
          <span>({data.branch})</span>
        </div>
      </div>
    </div>
  );
}
