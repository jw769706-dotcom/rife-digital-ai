import { Link } from "react-router-dom";

export default function AIDemo() {
  const steps = [
    ["01", "Ceritakan", "Ceritakan keinginanmu"],
    ["02", "AI Membantu", "Rife menyusun strategi"],
    ["03", "Siap Dipakai", "Produk & konten siap"],
    ["04", "Mulai Jualan", "Ikuti langkah berikutnya"],
  ];

  const results = [
    {
      icon: "💡",
      label: "Ide Produk",
      title: "Digital Planner Guru SD",
      desc: "Template perencanaan pembelajaran yang praktis dan mudah digunakan.",
    },
    {
      icon: "🎯",
      label: "Target Pembeli",
      title: "Guru SD & Orang Tua",
      desc: "Orang yang membutuhkan solusi mengatur kegiatan belajar dengan lebih praktis.",
    },
    {
      icon: "📣",
      label: "Strategi Promosi",
      title: "Konten Organik",
      desc: "Rife membantu membuat hook, caption, script video, dan CTA untuk promosi.",
    },
    {
      icon: "💰",
      label: "Rekomendasi Harga",
      title: "Rp49.000 – Rp79.000",
      desc: "Sesuaikan dengan isi dan nilai produk yang kamu buat.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#090909] py-16 sm:py-24 lg:py-32"
    >
      {/* ========================================= */}
      {/* BACKGROUND */}
      {/* ========================================= */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-yellow-400/[0.05] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400 sm:px-4 sm:text-xs">
            🤖 Lihat Rife Membantu dari Nol
          </span>

          <h2 className="mt-5 text-[30px] font-black leading-[1.08] tracking-[-0.03em] text-white sm:mt-6 sm:text-4xl md:text-5xl">
            Bingung Mulai Bisnis
            <br />
            Digital dari Mana?
          </h2>

          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-yellow-400" />

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-gray-500 sm:text-base sm:leading-8">
            Cukup ceritakan apa yang ingin kamu jual. Rife membantu menyusun
            ide, membuat produk, menyiapkan promosi, dan memberikan langkah
            berikutnya dengan bahasa yang mudah dipahami.
          </p>
        </div>

        {/* ========================================= */}
        {/* STEP INDICATOR */}
        {/* ========================================= */}

        <div className="mx-auto mt-10 max-w-4xl sm:mt-14">
          <p className="mb-5 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600 sm:text-[10px]">
            Cara Rife Membantu
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
            {steps.map(([number, title, desc]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/[0.08] bg-[#101010] p-4 text-center transition duration-300 hover:border-yellow-400/20 hover:bg-[#131313] sm:p-5"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-black text-black shadow-lg shadow-yellow-400/10 sm:h-10 sm:w-10 sm:text-xs">
                  {number}
                </div>

                <h3 className="mt-3 text-[12px] font-black text-white sm:text-base">
                  {title}
                </h3>

                <p className="mt-1.5 text-[10px] leading-5 text-gray-600 sm:text-xs sm:leading-6">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* AI WORKSPACE */}
        {/* ========================================= */}

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101010] shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:mt-14 sm:rounded-3xl">

          {/* BROWSER HEADER */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 sm:px-6 sm:py-4">

            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-red-500/70 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-full bg-yellow-500/70 sm:h-2.5 sm:w-2.5" />
              <div className="h-2 w-2 rounded-full bg-green-500/70 sm:h-2.5 sm:w-2.5" />
            </div>

            <span className="rounded-full border border-yellow-400/15 bg-yellow-400/[0.06] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-yellow-400 sm:px-3 sm:text-xs">
              Rife Digital AI
            </span>
          </div>

          <div className="space-y-6 p-4 sm:space-y-8 sm:p-8">

            {/* ========================================= */}
            {/* USER PROMPT */}
            {/* ========================================= */}

            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm text-black">
                  👤
                </div>

                <div>
                  <p className="text-xs font-bold text-white sm:text-sm">
                    Kamu
                  </p>

                  <p className="text-[10px] text-gray-600 sm:text-xs">
                    Cukup ceritakan dengan bahasa biasa
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-[#0b0b0b] p-4 text-[12px] leading-6 text-gray-400 sm:rounded-2xl sm:p-5 sm:text-sm sm:leading-7">
                Saya ingin jualan produk digital untuk guru SD, tapi saya belum
                tahu harus membuat produk apa, cara membuatnya, dan bagaimana
                cara promosinya.
              </div>
            </div>

            {/* ========================================= */}
            {/* AI PROCESS */}
            {/* ========================================= */}

            <div className="rounded-xl border border-yellow-400/15 bg-yellow-400/[0.04] p-4 sm:rounded-2xl sm:p-6">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    🤖 Rife Sedang Membantu...
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-600 sm:text-xs">
                    Menganalisis kebutuhanmu
                  </p>
                </div>

                <span className="text-xs font-black text-yellow-400 sm:text-sm">
                  98%
                </span>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full w-[98%] rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,.35)]" />
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-3">
                {[
                  "✓ Mencari ide produk",
                  "✓ Menentukan target",
                  "✓ Menyusun strategi",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-white/[0.06] bg-[#111111] px-3 py-2.5 text-[10px] text-gray-500 sm:rounded-xl sm:px-4 sm:py-3 sm:text-xs"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ========================================= */}
            {/* RESULT */}
            {/* ========================================= */}

            <div className="rounded-xl border border-white/[0.08] bg-[#0b0b0b] p-4 sm:rounded-2xl sm:p-6">

              {/* RESULT HEADER */}

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-white sm:text-xl">
                    ✨ Rekomendasi Rife
                  </h3>

                  <p className="mt-1 text-[10px] text-gray-600 sm:text-sm">
                    Langkah yang bisa langsung kamu ikuti
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-green-500/[0.08] px-2.5 py-1 text-[9px] font-bold text-green-400 sm:px-3 sm:text-xs">
                  ✓ Selesai
                </span>
              </div>

              {/* RESULT CARDS */}

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-4">
                {results.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/[0.05] bg-[#151515] p-4 sm:rounded-2xl sm:p-5"
                  >
                    <p className="text-[10px] font-medium text-gray-600 sm:text-xs">
                      {item.icon} {item.label}
                    </p>

                    <p className="mt-2 text-[13px] font-black leading-snug text-white sm:text-base">
                      {item.title}
                    </p>

                    <p className="mt-2 text-[11px] leading-5 text-gray-600 sm:text-sm sm:leading-6">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ========================================= */}
              {/* NEXT STEP */}
              {/* ========================================= */}

              <div className="mt-4 rounded-xl border border-yellow-400/15 bg-yellow-400/[0.04] p-4 sm:mt-6 sm:rounded-2xl sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-yellow-400 sm:text-xs">
                  🚀 Langkah Berikutnya
                </p>

                <p className="mt-2 text-[11px] leading-6 text-gray-500 sm:text-sm sm:leading-7">
                  Buat produk → Upload ke platform jualan → Buat konten
                  promosi → Posting secara konsisten → Arahkan calon pembeli
                  ke produkmu.
                </p>
              </div>

              {/* CTA */}

              <Link
                to="/login"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-yellow-400 px-6 py-3.5 text-xs font-black text-black shadow-lg shadow-yellow-400/10 transition hover:bg-yellow-300 sm:mt-6 sm:w-fit sm:px-8 sm:py-4 sm:text-sm"
              >
                Coba Buat dengan Rife →
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ========================================= */}

        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
          <p className="text-sm font-bold text-white sm:text-lg">
            Tidak perlu jago teknologi.
            <br className="sm:hidden" /> Tidak perlu tahu istilah rumit.
          </p>

          <p className="mt-2 text-[11px] leading-6 text-gray-600 sm:mt-3 sm:text-sm sm:leading-7">
            Kamu cukup ceritakan apa yang ingin kamu lakukan. Rife membantu
            menjelaskan apa yang harus dilakukan selanjutnya.
          </p>
        </div>
      </div>
    </section>
  );
}