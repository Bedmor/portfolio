import { LoaderCircle } from "lucide-react";
interface LatestPush {
  repo: {
    name: string;
  };
}

export default function CurrentlyWorkingOn({
  latestPush,
}: {
  latestPush?: LatestPush;
}) {
  return (
    <div className="glass flex flex-row gap-2 rounded-lg p-4">
      <h3 className="text-sm font-bold text-black">Currently Working On:</h3>
      <div className="flex items-center gap-2">
        <LoaderCircle className="h-4 w-4 animate-spin text-blue-600" />
        <p className="text-sm text-black">
          {latestPush ? latestPush.repo.name : "Loading..."}
        </p>
      </div>
    </div>
  );
}
