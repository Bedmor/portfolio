import Link from "next/link";
import Image from "next/image";
export default function Mail() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Link
        href="mailto:besimozdemir33@gmail.com"
        className="relative h-20 w-20 overflow-hidden rounded-lg bg-white p-4 transition hover:scale-110 sm:h-24 sm:w-24 sm:p-6"
      >
        <Image
          src="https://images.icon-icons.com/2631/PNG/512/gmail_new_logo_icon_159149.png"
          alt="Mail Icon"
          height={96}
width={96}
className="object-cover"
        />
      </Link>
      <h1 className="mt-2 text-xs font-semibold text-gray-200 sm:text-sm">
        Email
      </h1>
    </div>
  );
}
