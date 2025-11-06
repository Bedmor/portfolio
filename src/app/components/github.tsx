"use client";
import Image from "next/image";
import Link from "next/link";
export default function GitHub() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Link
        className="relative h-20 w-20 overflow-hidden rounded-lg bg-white p-4 transition hover:scale-110 sm:h-24 sm:w-24"
        href="https://github.com/bedmor"
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="GitHub Icon"
          height={96}
          width={96}
          className="object-cover"
        />
      </Link>
      <h1 className="mt-2 text-xs font-semibold text-gray-200 sm:text-sm">
        GitHub
      </h1>
    </div>
  );
}
