import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090909]">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              🚀 AI Platform untuk Bisnis Digital Indonesia
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
              Bangun Produk Digital
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Lebih Cepat
              </span>
              <br />
              dengan AI
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-400">
              Buat produk digital, copywriting, caption, ide konten,
              landing page, dan strategi marketing dalam satu dashboard AI.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/login"
                className="rounded-2xl bg-yellow-500 px-8 py-5 text-center font-bold text-black transition hover:scale-105"
              >
                Mulai Trial Gratis 3 Hari
              </Link>

              <Link
                to="/pricing"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-center font-semibold text-white"
              >
                ▶ Lihat Demo
              </Link>

            </div>

            <div className="mt-12 grid grid-cols-3 gap-5">
              {[
                ["50+", "AI Tools"],
                ["10x", "Lebih Cepat"],
                ["24/7", "AI Assistant"],
              ].map(([v, t]) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-3xl font-black text-yellow-400">{v}</h3>
                  <p className="mt-2 text-sm text-gray-400">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bagian kanan biarkan sama seperti punyamu */}
          <div className="relative">
            {/* TIDAK PERLU DIUBAH */}
          </div>
        </div>
      </div>
    </section>
  );
}