import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Kalau sedang bukan di landing page,
    // kembali ke landing page lalu menuju section.
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      const navbarOffset = 90;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-6 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-black/75 shadow-2xl backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex h-16 items-center gap-3 font-black text-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 text-lg font-black text-black shadow-lg shadow-yellow-500/30">
            R
          </div>

          <div className="leading-tight">
            <p className="text-lg">
              Rife <span className="text-yellow-400">Digital AI</span>
            </p>

            <p className="text-[11px] font-medium text-gray-400">
              Build Faster with AI
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            Features
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("pricing")}
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            Pricing
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("faq")}
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            FAQ
          </button>
        </nav>

        {/* ACTION */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-xl border border-white/10 px-5 py-2.5 font-medium text-white transition hover:border-yellow-400 hover:bg-white/5 md:block"
          >
            Masuk
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-yellow-500 px-6 py-2.5 font-bold text-black shadow-lg shadow-yellow-500/30 transition hover:scale-105 hover:bg-yellow-400"
          >
            Mulai Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}