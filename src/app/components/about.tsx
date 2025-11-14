"use client";
import { useState } from "react";
import { UserStar } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger,
} from "../../../components/motion-primitives/morphing-popover";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MorphingPopover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex flex-col items-center justify-center">
        <MorphingPopoverTrigger>
          <div className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white transition hover:scale-110 sm:h-24 sm:w-24">
            <UserStar size={64} />
          </div>
        </MorphingPopoverTrigger>
        <h1 className="mt-3 text-xs font-semibold text-gray-200 sm:text-sm">
          About Me
        </h1>
      </div>

      <MorphingPopoverContent className="z-50 h-screen w-screen overflow-y-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="fixed top-4 left-4 z-50 rounded-full bg-white p-2 text-2xl text-gray-600 shadow-lg transition-transform hover:scale-110 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close"
        >
          &larr;
        </button>
        <div className="mx-auto min-h-screen w-screen bg-gray-200 p-4 pt-16 sm:p-6 md:p-8 lg:p-12">
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              About Me
            </h1>
          </div>

          <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
            {/* Introduction */}
            <div className="rounded-xl bg-purple-100 p-6 shadow-lg sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">👋</span>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Hey, I&apos;m Besim!
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
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
            <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Technical Skills
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Frontend */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <span className="text-xl">🎨</span>
                    Frontend
                  </h3>
                  <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
                      <div className="relative flex items-center justify-between rounded-[10px] bg-white px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900">
                            React & Next.js
                          </p>
                        </div>
                        <div className="flex items-center gap-2 opacity-80 transition-opacity group-hover:opacity-100">
                          <svg
                            className="h-10 w-10 fill-[#61DAFB]"
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>React</title>
                            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                          </svg>
                          <svg
                            className="h-10 w-10 fill-black"
                            role="img"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Next.js</title>
                            <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                      <div className="relative flex items-center justify-between rounded-[10px] bg-white px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900">
                            TypeScript
                          </p>
                        </div>
                        <svg
                          className="h-10 w-10 fill-[#3178C6] opacity-80 transition-opacity group-hover:opacity-100"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>TypeScript</title>
                          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                        </svg>
                      </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-teal-500 via-green-400 to-teal-500 p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50">
                      <div className="relative flex items-center justify-between rounded-[10px] bg-white px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900">
                            Tailwind CSS
                          </p>
                        </div>
                        <svg
                          className="h-10 w-10 fill-[#06B6D4] opacity-80 transition-opacity group-hover:opacity-100"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Tailwind CSS</title>
                          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backend */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <span className="text-xl">⚙️</span>
                    Backend
                  </h3>
                  <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-green-500 via-emerald-400 to-green-500 p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50">
                      <div className="relative flex items-center justify-between rounded-[10px] bg-white px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900">
                            Node.js & Express
                          </p>
                        </div>
                        <svg
                          className="h-10 w-10 fill-[#339933] opacity-80 transition-opacity group-hover:opacity-100"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Node.js</title>
                          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
                        </svg>
                      </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-indigo-500 via-blue-400 to-indigo-500 p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50">
                      <div className="relative flex items-center justify-between rounded-[10px] bg-white px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900">
                            Prisma & SQL
                          </p>
                        </div>
                        <svg
                          className="h-10 w-10 fill-[#2D3748] opacity-80 transition-opacity group-hover:opacity-100"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Prisma</title>
                          <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" />
                        </svg>
                      </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-xl bg-linear-to-r from-orange-500 via-red-400 to-orange-500 p-0.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
                      <div className="relative flex items-center justify-between rounded-[10px] bg-white px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900">
                            REST APIs
                          </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-orange-400 to-red-500 text-xs font-bold text-white opacity-80 transition-opacity group-hover:opacity-100">
                          API
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Technologies */}
              <div className="mt-8 border-t-2 border-gray-200 pt-6">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
                  <span className="text-2xl">🛠️</span>
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Git", color: "from-orange-400 to-red-500" },
                    { name: "GitHub", color: "from-gray-700 to-gray-900" },
                    { name: "VS Code", color: "from-blue-500 to-blue-600" },
                    { name: "NextAuth", color: "from-purple-500 to-pink-500" },
                    { name: "Vercel", color: "from-black to-gray-800" },
                    {
                      name: "PostgreSQL",
                      color: "from-blue-600 to-indigo-600",
                    },
                    { name: "SQLite", color: "from-teal-500 to-cyan-500" },
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className={`group relative overflow-hidden rounded-full bg-linear-to-r ${tech.color} px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What I Do */}
            <div className="rounded-xl bg-linear-to-br from-purple-50 to-pink-50 p-6 shadow-lg sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">💼</span>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  What I Do
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-2 text-2xl">🌐</div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Web Applications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Building responsive, performant web apps with modern
                    frameworks
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-2 text-2xl">🎨</div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    UI/UX Design
                  </h3>
                  <p className="text-sm text-gray-600">
                    Creating intuitive interfaces with attention to detail
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-md">
                  <div className="mb-2 text-2xl">🔧</div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    API Development
                  </h3>
                  <p className="text-sm text-gray-600">
                    Designing scalable RESTful APIs and backend systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
