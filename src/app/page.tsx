import Projects from "./components/projects";
import About from "./components/about";
import Clock from "./components/clock";
import Blog from "./components/blog";
import ActivityFeed from "./components/activity";
import Contact from "./components/contact";
import ViewCounter from "./components/view-counter";
import LiquidBackground from "./components/liquid-background";
import LiquidGlassFilter from "./components/liquid-glass-filter";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen w-screen flex-col overflow-x-hidden font-sans text-white antialiased">
      {/* SVG Optical Edge Refraction Filter */}
      <LiquidGlassFilter />

      {/* Dynamic Background with Ambient Mesh & Contrast Vignette */}
      <LiquidBackground />

      {/* Header Bar */}
      <header className="header liquid-glass sticky top-0 z-40 flex w-full flex-row items-center justify-between border-b border-white/30 px-6 py-3.5 shadow-2xl backdrop-blur-xl">
        <Clock />
        <ViewCounter />
      </header>

      {/* Main Content Area */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 sm:py-12">
        {/* Apps / Launcher Grid */}
        <section className="space-y-4">
          <div className="app-grid flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14">
            <Projects />
            <About />
            <Blog />
            <Contact />
          </div>
        </section>

        {/* Activity Section */}
        <section className="space-y-4">
          <div className="mx-auto w-full max-w-4xl">
            <ActivityFeed />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer liquid-glass relative z-40 flex w-full items-center justify-center border-t border-white/30 py-6 shadow-2xl backdrop-blur-xl">
        <p className="text-center text-sm font-medium text-white/95 sm:text-base drop-shadow">
          Made with <span className="text-red-400">❤️</span> by{" "}
          <span className="font-bold text-white tracking-wide">Bedmor</span>
        </p>
      </footer>
    </main>
  );
}

