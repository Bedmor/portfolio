import Projects from "./components/projects";
import About from "./components/about";
import Clock from "./components/clock";
import Blog from "./components/blog";
import Image from "next/image";
import ActivityFeed from "./components/activity";
import Contact from "./components/contact";
import ViewCounter from "./components/view-counter";
export default function HomePage() {
  return (
    <main className="relative flex max-h-screen w-screen flex-col">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        className="fixed -z-10 object-cover"
        priority
      />
      <div className="header flex w-full flex-row items-center justify-between border-b border-white/20 bg-black/10 px-4 py-3 shadow-lg backdrop-blur-xl">
        <Clock />
        <ViewCounter />
      </div>

      <div className="mx-auto flex h-screen w-full max-w-6xl flex-col gap-8 overflow-y-auto px-4 py-8 sm:px-6 sm:py-12">

        {/* Apps Section */}
        <div className="space-y-4">
          
          <div className="app-grid flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
            <Projects />
            <About />
            <Blog />
            <Contact />
          </div>
        </div>

        {/* Activity Section */}
        <div className="space-y-4">
          
          <div className="mx-auto w-full max-w-9/12">
            <ActivityFeed />
          </div>
        </div>
      </div>
      <div className="footer relative flex w-full items-center justify-center border-t border-white/20 bg-black/10 py-6 shadow-lg backdrop-blur-xl">
        <p className="text-center text-sm text-gray-300 sm:text-base">
          Made with <span className="text-red-400">❤️</span> by{" "}
          <span className="font-semibold text-white">Bedmor</span>
        </p>
      </div>
    </main>
  );
}
