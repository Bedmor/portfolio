"use client";
import { useState } from "react";
import {
  UserStar,
  FileDown,
  Download,
  Code,
  Palette,
  Server,
  Wrench,
  Globe,
  Briefcase,
  Zap,
} from "lucide-react";
import Image from "next/image";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../../../components/motion-primitives/morphing-popover";

const skills = [
  {
    category: "Languages",
    icon: Code,
    items: [
      {
        name: "TypeScript",
        level: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        level: 95,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Python",
        level: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ],
  },
  {
    category: "Frontend",
    icon: Palette,
    items: [
      {
        name: "React",
        level: 92,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        level: 88,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Tailwind CSS",
        level: 90,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    items: [
      {
        name: "Node.js",
        level: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "PostgreSQL",
        level: 80,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Prisma",
        level: 82,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
      },
    ],
  },
  {
    category: "Tools & Others",
    icon: Wrench,
    items: [
      {
        name: "Git",
        level: 88,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },

      {
        name: "Vercel",
        level: 85,
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
      },
    ],
  },
];

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
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
          <div className="liquid-glass flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl border border-purple-400/40 shadow-2xl transition hover:scale-110 sm:h-24 sm:w-24">
            <UserStar className="h-10 w-10 text-white drop-shadow-lg sm:h-14 sm:w-14" />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-xs font-semibold text-white drop-shadow-md sm:text-sm">
          About Me
        </h1>
      </div>

      <MorphingPopoverContent className="z-50 h-screen w-screen overflow-y-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="glass-matte-button absolute top-12 left-4 z-50 h-10 w-10 text-xl sm:top-6 sm:left-6 md:h-12 md:w-12"
          aria-label="Close"
        >
          &larr;
        </button>
        <div className="mx-auto min-h-screen w-screen bg-slate-950/85 backdrop-blur-2xl p-4 pt-20 text-white sm:p-6 sm:pt-24 md:p-8 md:pt-28 lg:p-12">
          <div className="mb-6 text-center sm:mb-8 md:mb-10">
            <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl tracking-tight">
              About Me
            </h1>
          </div>

          <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8 md:space-y-10">
            {/* Introduction */}
            <div className="glass-matte-card p-6 sm:p-8 md:p-10">
              <div className="mb-4 flex items-center gap-3 sm:gap-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Hey, I&apos;m
                </h2>
                <h2 className="text-2xl font-bold text-purple-400 sm:text-3xl md:text-4xl">
                  Besim!
                </h2>
              </div>
              <p className="text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                I&apos;m a passionate full-stack developer dedicated to building sleek, responsive, and high-performance digital experiences.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="glass-matte-card p-6 sm:p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <Zap className="h-7 w-7 text-amber-400 sm:h-9 sm:w-9" />
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Technical Skills
                </h2>
              </div>

              <div className="space-y-8">
                {skills.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <h3 className="flex items-center gap-2.5 text-base font-semibold text-white/90">
                      <category.icon className="h-5 w-5 text-purple-400" />
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-3.5">
                      {category.items.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="group glass-matte-card flex grow basis-[140px] flex-col items-center justify-center p-4"
                        >
                          <div className="relative mb-3 h-9 w-9 transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11">
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-center text-sm font-medium text-white/85">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What I Do */}
            <div className="glass-matte-card p-6 sm:p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <Briefcase className="h-7 w-7 text-purple-400 sm:h-9 sm:w-9" />
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  What I Do
                </h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group glass-matte-card p-6">
                  <div className="mb-4 transition-transform group-hover:scale-105">
                    <Globe className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Web Applications
                  </h3>
                  <p className="text-sm leading-relaxed text-white/75">
                    Building responsive, performant web apps with modern
                    frameworks like Next.js and React.
                  </p>
                </div>
                <div className="group glass-matte-card p-6">
                  <div className="mb-4 transition-transform group-hover:scale-105">
                    <Palette className="h-8 w-8 text-pink-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    UI/UX Design
                  </h3>
                  <p className="text-sm leading-relaxed text-white/75">
                    Creating intuitive, accessible interfaces with attention to
                    detail and user experience.
                  </p>
                </div>
                <div className="group glass-matte-card p-6">
                  <div className="mb-4 transition-transform group-hover:scale-105">
                    <Server className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    API Development
                  </h3>
                  <p className="text-sm leading-relaxed text-white/75">
                    Designing scalable RESTful APIs and backend systems using
                    Node.js and PostgreSQL.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <div className="glass-matte-card p-6 sm:p-8 md:p-10">
              <div className="mb-4 flex items-center gap-3">
                <FileDown className="h-7 w-7 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Resume / CV
                </h2>
              </div>
              <p className="mb-6 text-white/80 text-sm sm:text-base">
                Download my professional resume to learn more about my
                experience, education, and skills.
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="glass-matte-button px-6 py-2.5 text-sm sm:w-auto"
              >
                {downloading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume (PDF)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}

