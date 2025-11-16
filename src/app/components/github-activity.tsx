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
      <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 shadow sm:flex-row sm:items-center sm:gap-2 sm:p-4">
        <p className="text-xs text-gray-600">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 shadow sm:items-center sm:gap-2 sm:p-4">
      <Image
        src={data.avatarUrl}
        alt="User Avatar"
        width={50}
        height={50}
        className="self-start rounded-full sm:self-auto"
      />
      <h3 className="text-xs font-bold sm:text-sm">Latest Commit</h3>
      <p className="min-w-0 truncate text-xs text-gray-600 sm:text-sm">
        {data.commitMessage}
      </p>
      <p className="text-xs text-gray-400">{data.repoName}</p>
      <p className="hidden shrink-0 text-xs text-gray-400 sm:block">
        {data.branch}
      </p>
      <p className="text-xs whitespace-nowrap text-gray-400">
        {data.createdAt}
      </p>
    </div>
  );
}
