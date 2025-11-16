"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "components/motion-primitives/carousel";
import { useState } from "react";
import LatestTweet from "./latest-tweet";
import GitHubActivity, { type GitHubActivityData } from "./github-activity";
import { WeatherForecastDisplay, type WeatherData } from "./weather-forecast";
import Spotify, { type SpotifyData } from "./spotify";

export default function Carouseli({
  githubData,
  weatherData,
  spotifyData,
}: {
  githubData: GitHubActivityData | null;
  weatherData: WeatherData;
  spotifyData: SpotifyData | null;
}) {
  const [index, setIndex] = useState(0);
  const elements = [
    <GitHubActivity key={1} data={githubData} />,
    <LatestTweet key={2} />,
    <Spotify data={spotifyData} key={3} />,
    <WeatherForecastDisplay key={4} data={weatherData} />,
  ];
  return (
    <>
      <Carousel
        index={index}
        onIndexChange={setIndex}
        className="w-full max-w-full"
      >
        <CarouselContent>
          {elements.map((element, idx) => (
            <CarouselItem key={idx} className="w-full">
              {element}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-row justify-center">
        {elements.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setIndex(idx)}
            className={`mx-1 h-2 w-2 rounded-full ${
              index === idx ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}
