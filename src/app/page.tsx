import Projects from "./components/projects";
import About from "./components/about";
import GitHub from "./components/github";
import LinkedIn from "./components/linkedin";
import Twitter from "./components/twitter";
import Mail from "./components/mail";
import Clock from "./components/clock";
import Blog from "./components/blog";
import Image from "next/image";
import ActivityFeed from "./components/activity";
export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-transparent">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        className="absolute -z-10 object-cover"
        priority
      />
      <div className="header flex w-full flex-row border-b-2 backdrop-blur-lg">
        <Clock />
        <div className="w-5/12 lg:w-9/12"> </div>
      </div>
      <div className="app-grid mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-12 md:grid-cols-3 md:gap-8 md:py-16 lg:grid-cols-4 lg:gap-12 xl:grid-cols-5 xl:gap-16">
        <Projects />
        <About />
        <Blog />
        <GitHub />
        <LinkedIn />
        <Twitter />
        <Mail />
        <ActivityFeed />
      </div>
      <div className="footer mt-auto flex h-20 w-full items-center justify-center border-t-2 backdrop-blur-lg sm:h-24">
        <p className="p-4 text-center text-sm text-gray-200 sm:text-base">
          Made with ❤️ by Bedmor
        </p>
      </div>
    </main>
  );
}
