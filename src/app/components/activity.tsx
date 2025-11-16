import Carouseli from "./carouseli";
import { fetchGitHubActivity } from "./github-activity";
import { fetchWeatherData } from "./weather-forecast";
import { fetchSpotifyData } from "./spotify";

export default async function ActivityFeed() {
  const githubData = await fetchGitHubActivity();
  const weatherData = await fetchWeatherData();
  const spotifyData = await fetchSpotifyData();

  return (
    <div className="col-span-2 flex w-full max-w-full flex-col items-center justify-center gap-2 overflow-hidden p-2 sm:gap-3 sm:p-4 lg:col-span-3">
      <Carouseli
        githubData={githubData}
        weatherData={weatherData}
        spotifyData={spotifyData}
      />
    </div>
  );
}
