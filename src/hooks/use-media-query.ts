"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Modern way
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Convenience hooks for common breakpoints
export function useIsMobile() {
  return useMediaQuery("(max-width: 640px)"); // sm breakpoint
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 641px) and (max-width: 1024px)"); // between sm and lg
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1025px)"); // lg breakpoint and up
}
