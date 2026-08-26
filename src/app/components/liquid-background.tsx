"use client";

import Image from "next/image";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden select-none pointer-events-none">
      {/* Underlying base image */}
      <Image
        src="/bg.png"
        alt="Background"
        fill
        className="object-cover scale-105 brightness-[0.82] contrast-[1.1] saturate-[1.25] transition-transform duration-1000 ease-out"
        priority
      />

      {/* Dynamic ambient color mesh lights for Apple Liquid Glass depth */}
      <div className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-full bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent blur-[120px] animate-pulse" />
      <div className="absolute top-[40%] -right-[15%] h-[65vh] w-[65vw] rounded-full bg-gradient-to-tl from-cyan-500/25 via-blue-600/20 to-transparent blur-[130px]" />
      <div className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vw] rounded-full bg-gradient-to-t from-fuchsia-600/20 via-sky-500/15 to-transparent blur-[140px]" />

      {/* Contrast vignette overlay: ensures elements stand out clearly from background */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(5,7,15,0.65)_100%]" />
      <div className="absolute inset-0 bg-black/25 backdrop-contrast-125 backdrop-saturate-150" />
    </div>
  );
}
