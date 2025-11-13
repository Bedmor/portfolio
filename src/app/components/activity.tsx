import { Octokit } from "octokit";
import Image from "next/image";
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface GitHubCommit {
  message: string;
  sha: string;
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: {
    commits?: GitHubCommit[];
  };
}

export default async function ActivityFeed() {
  // Get user's recent events (includes commits, pushes, PRs, etc.)
  const events = await octokit.request("GET /users/{username}/events/public", {
    username: "Bedmor",
    per_page: 10, // Get last 10 events
  });

  // Filter for push events (commits)
  const pushEvents = (events.data as GitHubEvent[]).filter(
    (event) => event.type === "PushEvent",
  );

  // Get the most recent commit
  const latestPush = pushEvents[0];
  const latestCommit = latestPush?.payload?.commits?.[0];

  return (
    <div className="flex flex-col gap-4 p-4">
      {latestCommit && latestPush ? (
        <div className="rounded-lg bg-white p-4 shadow">
            <Image
            src={events.data[0].actor.avatar_url}
            alt="User Avatar"
            width={50}
            height={50}
          />
          <h3 className="font-bold">Latest Commit</h3>
          <p className="text-sm text-gray-600">{latestCommit.message}</p>
          <p className="text-xs text-gray-400">
            Repository: {latestPush.repo.name}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(latestPush.created_at).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>No recent commits found</p>
      )}
    </div>
  );
}
