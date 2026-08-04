export default function ProductSidebar() {
  return (
    <aside className="h-screen w-80 border-r border-white/10 bg-[#0D0D0D] p-6">

      {/* Logo */}

      <div>

        <h1 className="text-4xl font-black leading-none">

          <span className="text-white">
            Rife
          </span>

          <span className="text-yellow-400">
            Digital
          </span>

          <br />

          <span className="text-yellow-400">
            AI
          </span>

        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Premium AI Workspace
        </p>

      </div>

      {/* Button */}

      <button className="mt-10 w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300">
        + Produk Baru
      </button>

      {/* Search */}

      <input
        placeholder="Cari project..."
        className="mt-6 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none placeholder:text-gray-500"
      />

      {/* Today */}

      <div className="mt-10">

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Hari Ini
        </p>

        <div className="space-y-3">

          {[
            "Digital Planner Guru SD",
            "Template Canva UMKM",
            "Prompt AI Marketing",
          ].map((item) => (
            <div
              key={item}
              className="cursor-pointer rounded-2xl border border-white/10 bg-[#171717] p-4 transition hover:border-yellow-400"
            >
              <h3 className="font-semibold text-white">
                {item}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Hari ini
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Minggu Ini */}

      <div className="mt-10">

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Minggu Ini
        </p>

        <div className="space-y-3">

          {[
            "Ebook Affiliate",
            "Notion Finance",
            "Template Excel",
            "Prompt ChatGPT",
          ].map((item) => (
            <div
              key={item}
              className="cursor-pointer rounded-2xl border border-white/10 bg-[#171717] p-4 transition hover:border-yellow-400"
            >
              <h3 className="font-semibold text-white">
                {item}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Minggu ini
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Upgrade */}

      <div className="mt-10 rounded-3xl border border-yellow-400/20 bg-[#171717] p-5">

        <p className="text-sm font-bold text-yellow-400">
          ⭐ Growth Plan
        </p>

        <h2 className="mt-2 text-4xl font-black text-white">
          Rp49K
          <span className="text-lg font-medium text-gray-400">
            /bulan
          </span>
        </h2>

        <p className="mt-2 text-xs text-gray-400">
          Mulai dari Rp49.000 per bulan
        </p>

        <ul className="mt-5 space-y-2 text-sm text-gray-300">

          <li>✓ Unlimited Generate</li>

          <li>✓ Semua AI Tools</li>

          <li>✓ Template Premium</li>

          <li>✓ Priority Support</li>

        </ul>

        <button className="mt-6 w-full rounded-2xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-300">
          Upgrade Sekarang
        </button>

      </div>

    </aside>
  );
}