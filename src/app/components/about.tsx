"use client";
import { useState } from "react";
import Image from "next/image";
export default function About() {
  const [showAbout, setShowAbout] = useState(false);
  function handleAbout() {
    setShowAbout(!showAbout);
  }
  function AboutContent() {
    return showAbout ? (
      <>
        <div className="fixed inset-0 z-40 overflow-y-auto bg-white">
          <button
            onClick={handleAbout}
            className="fixed top-4 right-4 z-50 text-2xl font-bold text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
          <div className="mx-auto max-w-4xl p-4 pt-16 sm:p-6 md:p-8 lg:p-12">
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
                About Me
              </h1>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-6">
                <h2 className="mb-3 border-b-2 border-blue-500 pb-2 text-xl font-semibold text-gray-800 sm:mb-4 sm:text-2xl">
                  Who I Am
                </h2>
                <p className="mb-4 text-base sm:text-lg">
                  I&apos;m a passionate software developer with a love for
                  creating innovative solutions and beautiful user experiences.
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-6">
                <h2 className="mb-3 border-b-2 border-blue-500 pb-2 text-xl font-semibold text-gray-800 sm:mb-4 sm:text-2xl">
                  Skills
                </h2>
                <ul className="space-y-3">
                  <li className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 text-sm font-medium sm:text-base">
                    JavaScript & React
                  </li>
                  <li className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 text-sm font-medium sm:text-base">
                    Node.js & Express
                  </li>
                  <li className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 text-sm font-medium sm:text-base">
                    Database Design
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 shadow-sm sm:p-6">
                <h2 className="mb-3 border-b-2 border-blue-500 pb-2 text-xl font-semibold text-gray-800 sm:mb-4 sm:text-2xl">
                  Experience
                </h2>
                <p className="text-base sm:text-lg">
                  I have worked on various projects ranging from web
                  applications to mobile apps, always focusing on clean code and
                  user-centered design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null;
  }
  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={handleAbout}
        className="relative h-20 w-20 cursor-pointer overflow-hidden rounded-2xl bg-white transition hover:scale-110 sm:h-24 sm:w-24"
      >
        <div className="h-20 w-20 sm:h-24 sm:w-24">
          <Image
            className="object-cover"
            src="/about.jpeg"
            alt="About Me Icon"
            height={96}
            width={96}
          />
        </div>
      </button>
      <h1 className="mt-2 text-xs font-semibold text-gray-200 sm:text-sm">
        About Me
      </h1>
      <AboutContent />
    </div>
  );
}
