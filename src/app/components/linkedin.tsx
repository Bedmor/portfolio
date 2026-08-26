"use client";
import Image from "next/image";
import Link from "next/link";

export default function LinkedIn() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Link
        href="https://www.linkedin.com/in/besim-özdemir-0848b1241"
        className="glass relative h-16 w-16 overflow-hidden rounded-2xl p-4 transition hover:scale-110 sm:h-24 sm:w-24"
      >
        <div className="h-16 w-16 p-4 sm:h-24 sm:w-24">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn Icon"
            height={96}
            width={96}
            className="black-and-white object-cover"
          />
        </div>
      </Link>
      <h1 className="mt-3 text-xs font-semibold text-white sm:text-sm">
        LinkedIn
      </h1>
    </div>
  );
}
