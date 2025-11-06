"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000); // Updates every 1000ms (1 second)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="clock p-4 font-mono text-lg text-gray-200 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      <h1 className="">{time}</h1>
    </div>
  );
}
