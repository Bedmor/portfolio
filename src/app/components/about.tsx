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
          <div className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-purple-400/30 bg-purple-500/20 shadow-xl transition hover:scale-110 hover:border-purple-400/50 hover:bg-purple-500/30 hover:shadow-2xl sm:h-24 sm:w-24">
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
          className="absolute top-12 left-4 z-50 mt-3 h-10 w-10 rounded-full p-2 text-3xl text-black transition-transform hover:scale-110 hover:text-gray-900 sm:top-4 sm:left-4 sm:text-2xl md:h-16 md:w-16"
          aria-label="Close"
        >
          &larr;
        </button>
        <div className="mx-auto min-h-screen w-screen bg-gray-200 p-4 pt-14 sm:p-6 sm:pt-16 md:p-8 md:pt-20 lg:p-12">
          <div className="mb-4 text-center sm:mb-6 md:mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
              About Me
            </h1>
          </div>

          <div className="mx-auto max-w-5xl space-y-4 sm:space-y-6 md:space-y-8">
            {/* Introduction */}
            <div className="glass rounded-xl bg-purple-500/10 p-4 shadow-lg sm:p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                  Hey, I&apos;m
                </h2>
                <h2 className="text-xl font-bold text-purple-600 sm:text-2xl md:text-3xl">
                  Besim!
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
                I&apos;m a passionate{" "}
                <span className="animate-pulse font-semibold text-purple-600">
                  Full-Stack Web Developer
                </span>{" "}
                who loves crafting elegant solutions to complex problems. I
                specialize in building modern, scalable web applications that
                deliver exceptional user experiences.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="glass rounded-xl p-4 shadow-lg sm:p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
                <Zap className="h-8 w-8 text-yellow-500 sm:h-10 sm:w-10" />
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                  Technical Skills
                </h2>
              </div>

              <div className="space-y-8">
                {skills.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <category.icon className="h-6 w-6 text-purple-600" />
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {category.items.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="group glass flex grow basis-[140px] flex-col items-center justify-center rounded-xl bg-gray-50/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                          <div className="relative mb-3 h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              fill
                              className="object-contain drop-shadow-sm"
                            />
                          </div>
                          <span className="text-center text-sm font-medium text-gray-700 group-hover:text-gray-900 sm:text-base">
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
            <div className="glass rounded-xl bg-linear-to-br from-purple-50/10 to-pink-50/10 p-6 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-purple-600 sm:h-10 sm:w-10" />
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  What I Do
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="group glass rounded-xl p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 transition-transform group-hover:scale-110">
                    <Globe className="h-10 w-10 text-blue-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Web Applications
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Building responsive, performant web apps with modern
                    frameworks like Next.js and React.
                  </p>
                </div>
                <div className="group glass rounded-xl p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 transition-transform group-hover:scale-110">
                    <Palette className="h-10 w-10 text-pink-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    UI/UX Design
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Creating intuitive, accessible interfaces with attention to
                    detail and user experience.
                  </p>
                </div>
                <div className="group glass rounded-xl p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 transition-transform group-hover:scale-110">
                    <Server className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    API Development
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Designing scalable RESTful APIs and backend systems using
                    Node.js and PostgreSQL.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <div className="glass rounded-xl bg-linear-to-br from-green-50/10 to-teal-50/10 p-6 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileDown className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Resume / CV
                </h2>
              </div>
              <p className="mb-6 text-gray-700">
                Download my professional resume to learn more about my
                experience, education, and skills.
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="btn btn-success btn-block rounded-xl sm:w-auto"
              >
                {downloading ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
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
