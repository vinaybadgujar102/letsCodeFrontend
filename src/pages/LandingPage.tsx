import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";
import { Link } from "react-router-dom";

import LandingEditorPreview from "../components/LandingEditorPreview";
import { useAuth } from "../context/AuthContext";

const THEME_KEY = "letscode-landing-theme";
const GITHUB_URL = "https://github.com/vinaybadgujar102/LetsCodeBackend";

export default function LandingPage() {
  const { user } = useAuth();
  const startPath = user ? "/problems" : "/login";
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "dark") {
      setIsDark(true);
      return;
    }
    if (stored === "light") {
      setIsDark(false);
      return;
    }
    setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div
      className={`landing font-body-md text-on-surface min-h-screen ${isDark ? "dark" : ""}`}
    >
      <header className="bg-surface w-full sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex justify-between items-center h-16 px-gutter max-w-[1280px] mx-auto">
          <Link
            to="/"
            className="font-display-lg text-headline-sm font-bold text-primary"
          >
            LetsCode
          </Link>
          <div className="flex items-center space-x-md">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              className="p-sm text-on-surface-variant hover:text-primary transition-colors duration-100 active:scale-95"
            >
              {isDark ? (
                <HiSun className="w-5 h-5" aria-hidden />
              ) : (
                <HiMoon className="w-5 h-5" aria-hidden />
              )}
            </button>
            <Link
              to={startPath}
              className="bg-primary text-on-primary px-lg py-sm font-ui-label text-ui-label transition-all duration-100 active:scale-95 hover:opacity-90"
            >
              {user ? "See Problems" : "Get Started"}
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-xxl pb-xxl overflow-hidden border-b border-outline-variant">
          <div className="max-w-[1280px] mx-auto px-gutter relative z-10">
            <div className="flex flex-col items-center text-center space-y-lg">
              <h1 className="font-display-lg text-display-lg md:text-[80px] leading-[1] max-w-3xl pt-xl animate-fade-up">
                Master your coding skills.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto animate-fade-up-delay">
                Curated problems, an in-browser editor, and real-time tests —
                built for interview prep and daily practice.
              </p>
            </div>
          </div>

          <div className="mt-xxl max-w-[1100px] mx-auto px-gutter md:px-0 animate-fade-up-delay-2">
            <div className="border border-outline-variant p-sm bg-surface-container-low">
              <LandingEditorPreview />
            </div>
          </div>
        </section>

        {/* Technical Metadata: Languages & Difficulty */}
        <section className="border-b border-outline-variant bg-surface-container-lowest py-lg">
          <div className="max-w-[1280px] mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-md">
            <div className="flex items-center gap-md">
              <span className="font-ui-label text-ui-label text-on-surface-variant uppercase tracking-widest text-[10px]">
                Languages Supported
              </span>
              <div className="flex gap-xs">
                <span className="px-sm py-[2px] border border-outline text-[12px] font-code-block text-on-surface">
                  PY
                </span>
                <span className="px-sm py-[2px] border border-outline text-[12px] font-code-block text-on-surface">
                  JAVA
                </span>
                <span className="px-sm py-[2px] border border-outline text-[12px] font-code-block text-on-surface">
                  C++
                </span>
              </div>
            </div>
            <div className="hidden md:block h-8 w-[1px] bg-outline-variant" />
            <div className="flex items-center gap-md">
              <span className="font-ui-label text-ui-label text-on-surface-variant uppercase tracking-widest text-[10px]">
                Challenge Tiering
              </span>
              <div className="flex gap-sm">
                <span className="px-md py-1 border border-[#10b981] text-[#059669] font-code-block text-[12px] uppercase">
                  Easy
                </span>
                <span className="px-md py-1 border border-[#f59e0b] text-[#d97706] font-code-block text-[12px] uppercase">
                  Medium
                </span>
                <span className="px-md py-1 border border-[#f43f5e] text-[#e11d48] font-code-block text-[12px] uppercase">
                  Hard
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-xxl">
          <div className="max-w-[1280px] mx-auto px-gutter">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
              <div className="space-y-md border-l border-outline-variant pl-lg">
                <span className="font-code-block text-primary opacity-30 text-headline-sm">
                  01
                </span>
                <h3 className="font-headline-sm text-headline-sm">
                  Pick a problem
                </h3>
                <p className="font-body-md text-on-surface-variant">
                  Choose from a curated collection of data structures and
                  algorithms refined for technical interviews.
                </p>
              </div>
              <div className="space-y-md border-l border-outline-variant pl-lg">
                <span className="font-code-block text-primary opacity-30 text-headline-sm">
                  02
                </span>
                <h3 className="font-headline-sm text-headline-sm">Write code</h3>
                <p className="font-body-md text-on-surface-variant">
                  Build your solution in our high-performance browser editor
                  with native monospaced typography.
                </p>
              </div>
              <div className="space-y-md border-l border-outline-variant pl-lg">
                <span className="font-code-block text-primary opacity-30 text-headline-sm">
                  03
                </span>
                <h3 className="font-headline-sm text-headline-sm">
                  Get feedback
                </h3>
                <p className="font-body-md text-on-surface-variant">
                  Run exhaustive test cases and receive immediate performance
                  analysis on space and time complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary text-on-primary py-xxl">
          <div className="max-w-[1280px] mx-auto px-gutter text-center space-y-xl">
            <h2 className="font-display-lg text-headline-md md:text-display-lg text-on-primary">
              Start practicing today.
            </h2>
            <Link
              to={startPath}
              className="inline-block bg-on-primary text-primary px-xxl py-md font-ui-label text-ui-label transition-all duration-100 active:scale-95 hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface w-full border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center py-xl px-gutter max-w-[1280px] mx-auto space-y-md md:space-y-0">
          <div className="font-display-lg text-headline-sm font-bold text-primary">
            LetsCode
          </div>
          <div className="flex items-center space-x-md font-ui-label text-ui-label">
            <Link
              to="/privacy"
              className="text-on-surface-variant hover:text-primary transition-all duration-200"
            >
              Privacy
            </Link>
            <span className="text-outline-variant">/</span>
            <Link
              to="/terms"
              className="text-on-surface-variant hover:text-primary transition-all duration-200"
            >
              Terms
            </Link>
            <span className="text-outline-variant">/</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-all duration-200"
            >
              Github
            </a>
            <span className="text-outline-variant">/</span>
            <a
              href="mailto:hello@letscode.dev"
              className="text-on-surface-variant hover:text-primary transition-all duration-200"
            >
              Contact
            </a>
          </div>
          <div className="font-ui-label text-ui-label text-on-surface-variant">
            © 2026 LetsCode. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
