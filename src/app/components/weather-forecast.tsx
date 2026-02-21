"use client";

import { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { fetchWeatherData, type WeatherData } from "../actions/weather";

function getWeatherIcon(condition: string) {
  switch (condition) {
    case "clear":
      return <Sun className="h-16 w-16 text-yellow-600" />;
    case "clouds":
      return <Cloud className="h-16 w-16 text-black" />;
    case "rain":
    case "drizzle":
      return <CloudRain className="h-16 w-16 text-blue-700" />;
    default:
      return <Cloud className="h-16 w-16 text-black" />;
  }
}

function getWeatherGradient(condition: string) {
  switch (condition) {
    case "clear":
      return "from-blue-200 to-blue-400";
    case "clouds":
      return "from-gray-200 to-gray-400";
    case "rain":
    case "drizzle":
      return "from-blue-300 to-blue-500";
    default:
      return "from-gray-200 to-gray-400";
  }
}

export function WeatherForecastDisplay({
  data: initialData,
}: {
  data: WeatherData;
}) {
  const [data, setData] = useState<WeatherData>(initialData);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const fetchWeather = async () => {
            try {
              const { latitude, longitude } = position.coords;
              const newData = await fetchWeatherData(latitude, longitude);
              setData(newData);
            } catch (error) {
              console.error("Error fetching weather for location:", error);
            }
          };
          fetchWeather();
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
      );
    }
  }, []);

  return (
    <div
      className={`glass flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-linear-to-br ${getWeatherGradient(data.Condition)} p-4 text-black shadow-lg sm:gap-4 sm:p-6`}
    >
      {/* Location */}
      <div className="w-full text-center">
        <h3 className="text-sm font-semibold sm:text-base">{data.Location}</h3>
        <p className="text-xs font-medium capitalize sm:text-sm">
          {data.Description}
        </p>
      </div>

      {/* Main Temperature and Icon */}
      <div className="flex w-full items-center justify-center gap-4">
        {getWeatherIcon(data.Condition)}
        <div className="text-center">
          <div className="text-5xl font-bold sm:text-6xl">{data.Degree}°</div>
          <div className="mt-1 flex items-center justify-center gap-3 text-sm font-medium">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4" />
              {data.High}°
            </span>
            <span className="flex items-center gap-1">
              <ArrowDown className="h-4 w-4" />
              {data.Low}°
            </span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex w-full items-center justify-around border-t border-black/20 pt-3 text-xs sm:text-sm">
        <div className="flex flex-col items-center gap-1">
          <Wind className="h-5 w-5" />
          <span className="font-semibold">{data.Wind} km/h</span>
          <span className="text-xs font-medium">Wind</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="h-5 w-5" />
          <span className="font-semibold">{data.Humidity}%</span>
          <span className="text-xs font-medium">Humidity</span>
        </div>
      </div>
    </div>
  );
}
