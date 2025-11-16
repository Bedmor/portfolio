import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export interface WeatherData {
  Degree: number;
  Condition: string;
  Location: string;
  High: number;
  Low: number;
  Humidity: number;
  Wind: number;
  Description: string;
}

export async function fetchWeatherData(): Promise<WeatherData> {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      console.error("Weather API key not configured");
      return {
        Degree: 20,
        Condition: "clouds",
        Location: "Sakarya, TR",
        High: 22,
        Low: 18,
        Humidity: 60,
        Wind: 10,
        Description: "API key not configured",
      };
    }

    const location = "Sakarya";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      main: {
        temp: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
      };
      weather: Array<{ main: string; description: string }>;
      name: string;
      sys: { country: string };
      wind: { speed: number };
    };

    return {
      Degree: Math.round(data.main.temp),
      Condition: data.weather[0]!.main.toLowerCase(),
      Location: `${data.name}, ${data.sys.country}`,
      High: Math.round(data.main.temp_max),
      Low: Math.round(data.main.temp_min),
      Humidity: data.main.humidity,
      Wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      Description: data.weather[0]!.description,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Return fallback data
    return {
      Degree: 20,
      Condition: "clouds",
      Location: "Sakarya, TR",
      High: 22,
      Low: 18,
      Humidity: 60,
      Wind: 10,
      Description: "Unable to fetch weather",
    };
  }
}

function getWeatherIcon(condition: string) {
  switch (condition) {
    case "clear":
      return <Sun className="h-16 w-16 text-yellow-400" />;
    case "clouds":
      return <Cloud className="h-16 w-16 text-gray-400" />;
    case "rain":
    case "drizzle":
      return <CloudRain className="h-16 w-16 text-blue-400" />;
    default:
      return <Cloud className="h-16 w-16 text-gray-400" />;
  }
}

function getWeatherGradient(condition: string) {
  switch (condition) {
    case "clear":
      return "from-blue-400 to-blue-600";
    case "clouds":
      return "from-gray-400 to-gray-600";
    case "rain":
    case "drizzle":
      return "from-blue-500 to-blue-700";
    default:
      return "from-gray-400 to-gray-600";
  }
}

export function WeatherForecastDisplay({ data }: { data: WeatherData }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-linear-to-br ${getWeatherGradient(data.Condition)} p-4 text-white shadow-lg sm:gap-4 sm:p-6`}
    >
      {/* Location */}
      <div className="w-full text-center">
        <h3 className="text-sm font-medium opacity-90 sm:text-base">
          {data.Location}
        </h3>
        <p className="text-xs capitalize opacity-75 sm:text-sm">
          {data.Description}
        </p>
      </div>

      {/* Main Temperature and Icon */}
      <div className="flex w-full items-center justify-center gap-4">
        {getWeatherIcon(data.Condition)}
        <div className="text-center">
          <div className="text-5xl font-bold sm:text-6xl">{data.Degree}°</div>
          <div className="mt-1 flex items-center justify-center gap-3 text-sm opacity-90">
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
      <div className="flex w-full items-center justify-around border-t border-white/20 pt-3 text-xs sm:text-sm">
        <div className="flex flex-col items-center gap-1">
          <Wind className="h-5 w-5 opacity-75" />
          <span className="font-medium">{data.Wind} km/h</span>
          <span className="text-xs opacity-75">Wind</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="h-5 w-5 opacity-75" />
          <span className="font-medium">{data.Humidity}%</span>
          <span className="text-xs opacity-75">Humidity</span>
        </div>
      </div>
    </div>
  );
}

export default async function WeatherForecast() {
  const weather = await fetchWeatherData();

  return (
    <div
      className={`col-span-2 flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-linear-to-br ${getWeatherGradient(weather.Condition)} p-4 text-white shadow-lg sm:col-span-4 sm:gap-4 sm:p-6 md:col-span-5 lg:col-span-3`}
    >
      {/* Location */}
      <div className="w-full text-center">
        <h3 className="text-sm font-medium opacity-90 sm:text-base">
          {weather.Location}
        </h3>
        <p className="text-xs capitalize opacity-75 sm:text-sm">
          {weather.Description}
        </p>
      </div>

      {/* Main Temperature and Icon */}
      <div className="flex w-full items-center justify-center gap-4">
        {getWeatherIcon(weather.Condition)}
        <div className="text-center">
          <div className="text-5xl font-bold sm:text-6xl">
            {weather.Degree}°
          </div>
          <div className="mt-1 flex items-center justify-center gap-3 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4" />
              {weather.High}°
            </span>
            <span className="flex items-center gap-1">
              <ArrowDown className="h-4 w-4" />
              {weather.Low}°
            </span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex w-full items-center justify-around border-t border-white/20 pt-3 text-xs sm:text-sm">
        <div className="flex flex-col items-center gap-1">
          <Wind className="h-5 w-5 opacity-75" />
          <span className="font-medium">{weather.Wind} km/h</span>
          <span className="text-xs opacity-75">Wind</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="h-5 w-5 opacity-75" />
          <span className="font-medium">{weather.Humidity}%</span>
          <span className="text-xs opacity-75">Humidity</span>
        </div>
      </div>
    </div>
  );
}
