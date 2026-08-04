export default function ChatSidebar() {
  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#0B0B0B]">

      {/* Logo */}

      <div className="border-b border-white/10 px-6 py-7">

        <h1 className="text-[42px] font-black leading-none text-white">
          Rife<span className="text-yellow-400">Digital</span>
          <br />
          <span className="text-yellow-400">AI</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Premium AI Workspace
        </p>

      </div>

      {/* New Chat */}

      <div className="p-5">

        <button className="w-full rounded-2xl bg-yellow-400 py-4 text-base font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-yellow-300">
          ＋ New Chat
        </button>

      </div>

      {/* Search */}

      <div className="px-5">

        <input
          placeholder="Cari percakapan..."
          className="w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
        />

      </div>

      {/* History */}

      <div className="mt-8 flex-1 overflow-y-auto px-5">

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Hari Ini
        </p>

        {[
          "Caption Instagram Affiliate",
          "Landing Page Digital Planner",
          "Ide Produk Digital Guru SD",
        ].map((item) => (
          <button
            key={item}
            className="mb-3 w-full rounded-2xl border border-transparent bg-[#171717] p-4 text-left transition-all duration-300 hover:border-yellow-400/30 hover:bg-[#1F1F1F]"
          >
            <p className="truncate text-[15px] font-semibold text-white">
              {item}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Hari ini
            </p>

          </button>
        ))}

        <p className="mb-4 mt-8 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Minggu Ini
        </p>

        {[
          "Copywriting Facebook Ads",
          "Script Reels Viral",
          "Email Marketing",
          "SEO Artikel",
        ].map((item) => (
          <button
            key={item}
            className="mb-3 w-full rounded-2xl border border-transparent bg-[#171717] p-4 text-left transition-all duration-300 hover:border-yellow-400/30 hover:bg-[#1F1F1F]"
          >
            <p className="truncate text-[15px] font-semibold text-white">
              {item}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Minggu ini
            </p>

          </button>
        ))}

      </div>

      {/* Upgrade */}

      <div className="border-t border-white/10 p-5">

        <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-transparent p-5">

          <p className="text-sm font-semibold text-yellow-400">
            ⭐ Growth Plan
          </p>

          <h2 className="mt-2 text-4xl font-black text-white">
            Rp49K
            <span className="text-lg font-semibold text-gray-400">
              /bulan
            </span>
          </h2>

          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-green-400">✓</span>
              Unlimited AI Writer
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-green-400">✓</span>
              Unlimited AI Tools
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-green-400">✓</span>
              Semua Template Premium
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-green-400">✓</span>
              Priority Support
            </div>

          </div>

          <button className="mt-6 w-full rounded-2xl bg-yellow-400 py-3 text-base font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-yellow-300">
            Upgrade Sekarang
          </button>

        </div>

      </div>

    </aside>
  );
}