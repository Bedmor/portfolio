import Link from "next/link";
export default function Twitter() {
  return (
    <div className="relative col-span-1 flex flex-col items-center justify-center">
      <Link
        href="https://twitter.com/acabesim"
        className="relative h-20 w-20 overflow-hidden rounded-lg bg-white p-4 transition hover:scale-110 sm:h-24 sm:w-24 sm:p-6"
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>X</title>
          <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
        </svg>
      </Link>
      <h1 className="mt-3 text-xs font-semibold text-gray-200 sm:text-sm">
        Twitter
      </h1>
    </div>
  );
}
