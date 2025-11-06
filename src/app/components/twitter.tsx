import Link from "next/link";
import Image from "next/image";
export default function Twitter() {
  return (
    <div className="relative col-span-1 flex flex-col items-center justify-center">
      <Link
        href="https://twitter.com/acabesim"
        className="relative h-20 w-20 overflow-hidden rounded-lg bg-white p-4 transition hover:scale-110 sm:h-24 sm:w-24 sm:p-6"
      >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            alt="Twitter Icon"
            height={96}
            width={96}
          />
      </Link>
      <h1 className="mt-2 text-xs font-semibold text-gray-200 sm:text-sm">
        Twitter
      </h1>
    </div>
  );
}
