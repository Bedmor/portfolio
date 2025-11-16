export async function fetchSpotifyNowPlaying() {
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId || !clientSecret) {
    throw new Error("Spotify API credentials are not configured");
  }
  const token = fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = (await (await token).json()) as {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  return data.access_token;
}
