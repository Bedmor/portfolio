import Link from "next/link";
export default function Mail() {
  return (
    <div className="relative col-span-1 flex flex-col items-center justify-center">
      <Link
        href="mailto:besimozdemir33@gmail.com"
        className="glass relative col-span-1 h-16 w-16 overflow-hidden rounded-2xl p-4 transition hover:scale-110 sm:h-24 sm:w-24 sm:p-6"
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Gmail</title>
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
        </svg>
      </Link>
      <h1 className="mt-3 text-xs font-semibold text-white sm:text-sm">
        Email
      </h1>
    </div>
  );
}
