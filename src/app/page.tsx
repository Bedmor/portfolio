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
    <main className="relative flex min-h-screen w-screen flex-col">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        className="fixed -z-10 object-cover"
        priority
      />
      <div className="header flex w-full flex-row border-b-2 backdrop-blur-lg">
        <Clock />
        <div className="w-5/12 lg:w-9/12"> </div>
      </div>
      <div className="app-grid mx-auto max-h-screen grid w-full max-w-11/12 grid-cols-3 p-2 gap-4 py-8 sm:grid-cols-3 sm:gap-6 sm:px-6 sm:py-12 md:grid-cols-5 md:gap-8 md:py-12 lg:grid-cols-6 lg:gap-12 xl:grid-cols-7 xl:gap-16">
        <Projects />
        <About />
        <Blog />
        <GitHub />
        <LinkedIn />
        <Twitter />
        <Mail />
        <ActivityFeed />
      </div>
      <div className="footer relative mt-auto flex h-20 w-full items-center justify-center border-t-2 backdrop-blur-lg sm:h-24">
        <p className="p-4 text-center text-sm text-gray-200 sm:text-base">
          Made with ❤️ by Bedmor
        </p>
      </div>
    </main>
  );
}
