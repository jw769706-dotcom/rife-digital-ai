import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      const navbarOffset = 100;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(elementPosition - navbarOffset, 0),
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-300 sm:px-5 ${
        scrolled ? "py-2" : "py-3 sm:py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/10 bg-[#0b0b0b]/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
            : "border-white/[0.06] bg-[#0b0b0b]/70 backdrop-blur-md"
        }`}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 py-2.5 sm:gap-3 sm:py-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-base font-black text-black shadow-lg shadow-yellow-400/20 sm:h-10 sm:w-10 sm:text-lg">
            R
          </div>

          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-black text-white sm:text-lg">
              Rife <span className="text-yellow-400">Digital AI</span>
            </p>

            <p className="hidden text-[10px] font-medium text-gray-500 sm:block sm:text-[11px]">
              Build Faster with AI
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-7 md:flex">
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-gray-400 transition hover:text-yellow-400"
          >
            Features
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium text-gray-400 transition hover:text-yellow-400"
          >
            Pricing
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("faq")}
            className="text-sm font-medium text-gray-400 transition hover:text-yellow-400"
          >
            FAQ
          </button>
        </nav>

        {/* ACTION */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-bold text-white transition hover:border-yellow-400/40 hover:bg-white/[0.06] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Masuk
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-yellow-400 px-4 py-2 text-xs font-black text-black shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 hover:shadow-yellow-400/30 sm:px-6 sm:py-2.5 sm:text-sm"
          >
            Mulai Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}