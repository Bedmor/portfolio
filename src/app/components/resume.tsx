"use client";
import { useState } from "react";
import { FileDown } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../../../components/motion-primitives/morphing-popover";

export default function Resume() {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // You can replace this with your actual resume file path
      const response = await fetch("/resume.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Besim_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download resume. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex flex-col items-center justify-center">
        <MorphingPopoverTrigger>
          <div className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 transition hover:scale-110 sm:h-24 sm:w-24">
            <FileDown className="h-10 w-10 text-white sm:h-14 sm:w-14" />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-xs font-semibold text-white sm:text-sm">
          Resume
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
        <div className="min-h-screen w-screen bg-gradient-to-br from-green-900 via-teal-900 to-green-900 p-4 pt-14 sm:p-6 sm:pt-16 md:p-8 md:pt-20 lg:p-12">
          <div className="mb-6 text-center sm:mb-8 md:mb-12">
            <h1 className="mb-2 text-3xl font-bold text-white sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              Resume / CV
            </h1>
            <p className="text-sm text-green-200 sm:text-base md:text-lg">
              Download my professional resume
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
            {/* Download Card */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg sm:p-8 md:p-10">
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-full bg-white/20 p-8">
                  <FileDown className="h-16 w-16 text-white sm:h-20 sm:w-20" />
                </div>
              </div>

              <h2 className="mb-4 text-center text-2xl font-bold text-white sm:text-3xl">
                Professional Resume
              </h2>
              <p className="mb-6 text-center text-sm text-green-100 sm:text-base">
                Download my latest resume in PDF format. It includes my work
                experience, education, skills, and projects.
              </p>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="mx-auto flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-lg font-semibold text-green-900 transition hover:bg-green-50 disabled:opacity-50 sm:w-auto sm:px-8"
              >
                {downloading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-900 border-t-transparent"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <FileDown className="h-5 w-5" />
                    Download Resume (PDF)
                  </>
                )}
              </button>
            </div>

            {/* Quick Summary */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-lg sm:p-8">
              <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                📄 What&apos;s Inside?
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 font-semibold text-white">
                    💼 Experience
                  </h4>
                  <p className="text-sm text-green-100">
                    Detailed work history and achievements
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 font-semibold text-white">
                    🎓 Education
                  </h4>
                  <p className="text-sm text-green-100">
                    Academic background and certifications
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 font-semibold text-white">🛠️ Skills</h4>
                  <p className="text-sm text-green-100">
                    Technical skills and proficiencies
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="mb-2 font-semibold text-white">🚀 Projects</h4>
                  <p className="text-sm text-green-100">
                    Notable projects and contributions
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-lg sm:p-6">
              <p className="text-center text-xs text-green-200 sm:text-sm">
                💡 Resume last updated: November 2025
              </p>
            </div>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
