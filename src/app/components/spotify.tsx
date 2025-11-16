export interface SpotifyData {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; height: number; width: number }>;
    };
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
  };
  progress_ms: number;
}

//Shows what song is currently playing on Spotify
export async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error("Spotify credentials not configured");
    return null;
  }

  const tokenUrl = "https://accounts.spotify.com/api/token";

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      console.error(
        "Failed to get Spotify access token:",
        await response.text(),
      );
      return null;
    }

    const data = (await response.json()) as {
      access_token: string;
      token_type: string;
      expires_in: number;
    };

    return data.access_token;
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    return null;
  }
}

export async function fetchSpotifyData(): Promise<SpotifyData | null> {
  try {
    const token = await getSpotifyAccessToken();

    if (!token) {
      console.error("No Spotify access token available");
      return null;
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    );

    // 204 means no content (not playing anything)
    if (response.status === 204 || response.status === 202) {
      return null;
    }

    if (!response.ok) {
      console.error(
        "Spotify API error:",
        response.status,
        await response.text(),
      );
      return null;
    }

    const data = (await response.json()) as SpotifyData;
    return data;
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return null;
  }
}

import Image from "next/image";

export function Spotify({ data }: { data: SpotifyData | null }) {
  if (!data?.is_playing) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white p-4 shadow">
        <div className="flex items-center gap-2">
          <svg
            className="h-8 w-8"
            fill="#1DB954"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Not playing</h3>
            <p className="text-xs text-gray-500">No active session</p>
          </div>
        </div>
      </div>
    );
  }

  const artistNames = data.item.artists.map((artist) => artist.name).join(", ");
  const albumArt = data.item.album.images[0]?.url;

  return (
    <div className="flex w-full h-full flex-col items-center gap-3 rounded-lg bg-white p-3 shadow">
      I am now listening to
      <div className="flex flex-row items-center gap-3">
        {albumArt && (
          <Image
            src={albumArt}
            alt={`${data.item.album.name} cover`}
            width={64}
            height={64}
            className="h-16 w-16 rounded-md"
            unoptimized
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900">
            {data.item.name}
          </h3>
          <p className="truncate text-xs text-gray-600">{artistNames}</p>
          <p className="truncate text-xs text-gray-400">{data.item.album.name}</p>
        </div>
        <svg
          className="h-6 w-6 shrink-0"
          fill="#1DB954"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
    </div>
  );
}
