"use client";
import { useState } from "react";
import { Phone, Mail as MailIcon, Copy, Check } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../../../components/motion-primitives/morphing-popover";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactInfo = {
    email: "besimozdmr@gmail.com", // Replace with your actual phone
    location: "Sakarya, Turkey",
    linkedin: "https://www.linkedin.com/in/besim-özdemir-0848b1241",
    github: "https://github.com/Bedmor",
    twitter: "https://twitter.com/acabesim",
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex flex-col items-center justify-center">
        <MorphingPopoverTrigger>
          <div className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-orange-400/30 bg-orange-500/20 shadow-xl transition hover:scale-110 hover:border-orange-400/50 hover:bg-orange-500/30 hover:shadow-2xl sm:h-24 sm:w-24">
            <Phone className="h-10 w-10 text-white drop-shadow-lg sm:h-14 sm:w-14" />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-xs font-semibold text-white drop-shadow-md sm:text-sm">
          Contact
        </h1>
      </div>

      <MorphingPopoverContent className="z-50 h-screen w-screen overflow-y-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-12 left-4 z-50 mt-3 h-10 w-10 rounded-full p-2 text-3xl text-black transition-transform hover:scale-110 hover:text-gray-900 sm:top-4 sm:left-4 sm:text-2xl md:h-16 md:w-16"
          aria-label="Close"
        >
          &larr;
        </button>
        <div className="min-h-screen w-screen bg-linear-to-br from-orange-900 via-pink-900 to-orange-900 p-4 pt-14 sm:p-6 sm:pt-16 md:p-8 md:pt-20 lg:p-12">
          <div className="mb-6 text-center sm:mb-8 md:mb-12">
            <h1 className="mb-2 text-3xl font-bold text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              Get In Touch
            </h1>
            <p className="text-sm text-orange-200 sm:text-base md:text-lg">
              Let&apos;s connect and work together!
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
            {/* Email */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="glass rounded-full bg-white/20 p-3">
                  <MailIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Email
                </h3>
              </div>
              <div className="glass flex items-center justify-between rounded-lg bg-white/5 p-4">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-white hover:text-orange-200 sm:text-base"
                >
                  {contactInfo.email}
                </a>
                <button
                  onClick={() => copyToClipboard(contactInfo.email)}
                  className="btn btn-ghost btn-sm glass"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
              {copiedEmail && (
                <p className="mt-2 text-center text-sm text-green-300">
                  ✓ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="mb-6 text-xl font-bold text-white sm:text-2xl">
                🌐 Connect on Social Media
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass flex flex-col items-center gap-3 rounded-xl bg-blue-600/20 p-4 text-white shadow-lg transition hover:scale-105 hover:bg-blue-700/30 hover:shadow-xl"
                >
                  <svg
                    className="h-12 w-12 fill-current"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-semibold">LinkedIn</span>
                </a>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass flex flex-col items-center gap-3 rounded-xl bg-gray-800/20 p-4 text-white shadow-lg transition hover:scale-105 hover:bg-gray-900/30 hover:shadow-xl"
                >
                  <svg
                    className="h-12 w-12 fill-current"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span className="font-semibold">GitHub</span>
                </a>
                <a
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass flex flex-col items-center gap-3 rounded-xl bg-sky-500/20 p-4 text-white shadow-lg transition hover:scale-105 hover:bg-sky-600/30 hover:shadow-xl"
                >
                  <svg
                    className="h-12 w-12 fill-current"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                  <span className="font-semibold">Twitter / X</span>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="group glass flex flex-col items-center gap-3 rounded-xl bg-red-600/20 p-4 text-white shadow-lg transition hover:scale-105 hover:bg-red-700/30 hover:shadow-xl"
                >
                  <svg
                    className="h-12 w-12 fill-current"
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Gmail</title>
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                  <span className="font-semibold">Email</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-2xl p-6 text-center sm:p-8">
              <div className="mb-3 inline-block rounded-full bg-green-500 px-4 py-2">
                <span className="text-sm font-semibold text-white">
                  🟢 Available for opportunities
                </span>
              </div>
              <p className="text-sm text-orange-100 sm:text-base">
                I&apos;m currently open to new projects, collaborations, and
                full-time opportunities. Feel free to reach out!
              </p>
            </div>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
