const features = [
  {
    icon: "🚀",
    title: "Bangun Produk Digital dari Nol",
    desc: "Rife membimbingmu mulai dari mencari ide, menentukan target pasar, membuat produk, menyiapkan konten promosi, sampai menyusun strategi penjualan.",
  },
  {
    icon: "✍️",
    title: "Bikin Konten Tanpa Bingung",
    desc: "Buat caption, hook, copywriting, script video, dan berbagai konten promosi hanya dengan menjelaskan produkmu.",
  },
  {
    icon: "📣",
    title: "Belajar Promosi dari Nol",
    desc: "Dapatkan panduan langkah demi langkah untuk memperkenalkan produk melalui konten organik.",
  },
  {
    icon: "💡",
    title: "Selalu Punya Ide untuk Jualan",
    desc: "Temukan ide produk, ide konten, topik promosi, dan strategi sesuai dengan target pembelimu.",
  },
  {
    icon: "🤖",
    title: "Tanya AI Kapan Saja",
    desc: "Tanyakan apa pun dengan bahasa sehari-hari dan dapatkan penjelasan yang mudah dipahami.",
  },
  {
    icon: "💰",
    title: "Fokus Sampai Mendapatkan Penjualan",
    desc: "Dari produk → promosi → calon pembeli → sampai strategi mendapatkan penjualan.",
  },
];

const steps = [
  {
    number: "01",
    title: "Cari Ide",
    desc: "Temukan produk yang cocok untuk dijual.",
  },
  {
    number: "02",
    title: "Buat Produk",
    desc: "Dibantu AI sampai produk siap digunakan.",
  },
  {
    number: "03",
    title: "Promosikan",
    desc: "Buat konten dan strategi promosi.",
  },
  {
    number: "04",
    title: "Dapatkan Penjualan",
    desc: "Belajar mengubah calon pembeli menjadi pembeli.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#080808] py-16 sm:py-24 lg:py-32"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-400/[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400 sm:px-4 sm:text-xs">
            🚀 Cocok untuk Pemula
          </span>

          <h2 className="mt-5 text-[30px] font-black leading-[1.05] tracking-[-0.03em] text-white sm:mt-6 sm:text-4xl md:text-5xl">
  <span className="block">
    Dari Nggak Tahu
  </span>

  <span className="block">
    Apa-Apa,
  </span>

  <span className="mt-1 block text-yellow-400">
    Sampai Bisa Mulai
  </span>

  <span className="block text-yellow-400">
    Jualan.
  </span>
</h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-gray-500 sm:text-base sm:leading-8">
            Nggak perlu jago teknologi, marketing, atau bisnis digital.
            Rife membimbing kamu langkah demi langkah — mulai dari mencari
            ide, membuat produk, mempromosikannya, sampai belajar mendapatkan
            penjualan.
          </p>
        </div>

        {/* ========================================= */}
        {/* HOW IT WORKS */}
        {/* ========================================= */}

        <div className="mx-auto mt-10 max-w-5xl sm:mt-14">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-600 sm:text-[10px]">
              Cara Kerja Rife
            </p>

            <span className="text-[9px] font-medium text-gray-700 sm:text-[10px]">
              4 langkah sederhana
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-white/[0.08] bg-[#101010] p-4 transition duration-300 hover:border-yellow-400/25 hover:bg-[#131313] sm:p-5"
              >
                {/* CONNECTOR DESKTOP */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[-18px] top-[30px] hidden h-px w-4 bg-white/10 sm:block" />
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black tracking-[0.15em] text-yellow-400 sm:text-[10px]">
                    STEP
                  </span>

                  <span className="text-[10px] font-black text-gray-700 sm:text-xs">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-4 text-[13px] font-black leading-tight text-white sm:text-base">
                  {step.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-gray-600 sm:text-xs sm:leading-6">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mx-auto my-12 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:my-20" />

        {/* ========================================= */}
        {/* FEATURE HEADER */}
        {/* ========================================= */}

        <div className="mb-7 sm:mb-9">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-yellow-400 sm:text-[10px]">
            Semua yang kamu butuhkan
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="max-w-xl text-[24px] font-black leading-[1.1] tracking-tight text-white sm:text-3xl">
              Satu workspace.
              <br />
              Banyak hal bisa kamu kerjakan.
            </h3>

            <p className="max-w-md text-[12px] leading-6 text-gray-600 sm:text-sm">
              Rife dirancang untuk membantu kamu membangun dan mempromosikan
              bisnis digital tanpa harus menguasai banyak tools.
            </p>
          </div>
        </div>

        {/* ========================================= */}
        {/* FEATURE CARDS */}
        {/* ========================================= */}

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:rounded-3xl sm:p-7 ${
                index === 0
                  ? "border-yellow-400/30 bg-gradient-to-br from-yellow-400/[0.09] via-[#111111] to-[#0d0d0d]"
                  : "border-white/[0.08] bg-[#111111] hover:border-yellow-400/20 hover:bg-[#131313]"
              }`}
            >
              {/* SUBTLE NUMBER */}
              <div className="absolute right-5 top-5 text-[10px] font-black tracking-[0.15em] text-white/[0.05]">
                0{index + 1}
              </div>

              {/* HIGHLIGHT */}
              {index === 0 && (
                <div className="absolute right-4 top-4 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-yellow-400 sm:text-[9px]">
                  Paling Penting
                </div>
              )}

              {/* ICON */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl sm:h-14 sm:w-14 sm:text-2xl ${
                  index === 0
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                    : "bg-white/[0.05]"
                }`}
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-5 max-w-[88%] text-[17px] font-black leading-snug tracking-tight text-white sm:text-xl">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-3 text-[12px] leading-6 text-gray-600 sm:text-sm sm:leading-7">
                {item.desc}
              </p>

              {/* FOOTER */}
              <div className="mt-5 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-yellow-400" />

                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500 sm:text-[10px]">
                  Cocok untuk pemula
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ========================================= */}

        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-yellow-400/15 bg-gradient-to-br from-yellow-400/[0.07] via-[#111111] to-[#0d0d0d] p-6 sm:mt-16 sm:rounded-3xl sm:p-10">
          {/* GLOW */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[70px]" />

          <div className="relative text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-400/15 bg-yellow-400/10 text-xl">
              💡
            </div>

            <h3 className="mt-4 text-xl font-black tracking-tight text-white sm:text-2xl">
              Bahkan Kalau Kamu Masih Gaptek
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-[12px] leading-6 text-gray-600 sm:text-base sm:leading-7">
              Kamu cukup ceritakan apa yang ingin kamu jual dengan bahasa
              sehari-hari. Rife akan membantu menjelaskan apa yang harus
              dilakukan dan memberikan langkah berikutnya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}