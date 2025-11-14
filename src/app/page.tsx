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
import CurrentlyWorkingOn from "./components/currently-working-on";
export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-transparent">
      <Image
        src="/bg.jpg"
        alt="Background"
        fill
        className="absolute -z-10 object-cover"
      />
      <div className="header flex w-screen flex-row border-b-2 backdrop-blur-lg">
        <Clock />
        <div className="lgw-9/12 w-5/12"> </div>
      </div>
      <div className="app-grid mx-auto grid max-w-7xl grid-cols-3 gap-12 py-8 sm:grid-cols-3 sm:gap-8 sm:py-20 md:grid-cols-4 md:gap-12 md:py-16 lg:grid-cols-5 lg:gap-16 xl:gap-24">
        <Projects />
        <About />
        <Blog />
        <GitHub />
        <LinkedIn />
        <Twitter />
        <Mail />
        <ActivityFeed />
      </div>
      <div className="footer mt-auto flex h-24 w-screen items-center justify-center border-t-2 backdrop-blur-lg">
        <p className="p-4 text-center text-gray-200">Made with ❤️ by Bedmor</p>
      </div>
    </main>
  );
}
