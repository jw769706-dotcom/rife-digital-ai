import { Mail, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";

function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const offset = 90;

    const position =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-white/[0.07] bg-[#070707]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* ================================= */}
        {/* TOP */}
        {/* ================================= */}

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">

          {/* BRAND */}

          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg font-black text-black shadow-lg shadow-yellow-400/10">
                R
              </div>

              <div>
                <h2 className="text-lg font-black tracking-tight text-white">
                  Rife <span className="text-yellow-400">Digital AI</span>
                </h2>

                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-gray-700">
                  Build Faster with AI
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7">
              Bangun produk digital, buat konten promosi, dan kembangkan
              bisnismu lebih cepat dengan bantuan Artificial Intelligence.
            </p>

            <div className="mt-5 inline-flex items-center rounded-full border border-yellow-400/10 bg-yellow-400/[0.03] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span className="ml-2 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-600">
                AI Workspace untuk Bisnis Digital
              </span>
            </div>
          </div>

          {/* PRODUCT */}

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Product
            </h3>

            <ul className="mt-5 space-y-3.5">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("features")}
                  className="group flex items-center gap-1.5 text-xs text-gray-600 transition hover:text-white sm:text-sm"
                >
                  Features

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("pricing")}
                  className="group flex items-center gap-1.5 text-xs text-gray-600 transition hover:text-white sm:text-sm"
                >
                  Pricing

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("faq")}
                  className="group flex items-center gap-1.5 text-xs text-gray-600 transition hover:text-white sm:text-sm"
                >
                  FAQ

                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </button>
              </li>
            </ul>
          </div>

          {/* COMPANY */}

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Company
            </h3>

            <ul className="mt-5 space-y-3.5">
              <li>
                <span className="text-xs text-gray-600 sm:text-sm">
                  Rife Digital AI
                </span>
              </li>

              <li>
                <span className="text-xs text-gray-600 sm:text-sm">
                  Indonesia
                </span>
              </li>

              <li>
                <span className="text-xs text-gray-600 sm:text-sm">
                  Digital Business Platform
                </span>
              </li>
            </ul>
          </div>

          {/* CONTACT */}

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Contact
            </h3>

            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href="mailto:ttputrasatu@gmail.com"
                  className="flex items-center gap-2.5 text-xs text-gray-600 transition hover:text-white sm:text-sm"
                >
                  <Mail
                    size={14}
                    className="shrink-0 text-yellow-400"
                  />

                  <span className="break-all">
                    ttputrasatu@gmail.com
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/6282335952469"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-xs text-gray-600 transition hover:text-white sm:text-sm"
                >
                  <MessageCircle
                    size={14}
                    className="shrink-0 text-yellow-400"
                  />

                  <span>WhatsApp</span>
                </a>
              </li>

              <li>
                <div className="flex items-center gap-2.5 text-xs text-gray-600 sm:text-sm">
                  <MapPin
                    size={14}
                    className="shrink-0 text-yellow-400"
                  />

                  <span>Indonesia</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}

        <div className="my-10 h-px bg-white/[0.06] sm:my-12" />

        {/* BOTTOM */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] leading-5 text-gray-700 sm:text-xs">
            © {new Date().getFullYear()} Rife Digital AI. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-700 sm:text-[10px]">
            <span className="h-1 w-1 rounded-full bg-yellow-400" />
            Built with AI
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;