"use server";

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

export async function fetchWeatherData(lat?: number, lon?: number): Promise<WeatherData> {
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

    let url = "";
    if (lat !== undefined && lon !== undefined) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      const location = "Sakarya";
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    }

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
