export default function PricingHero() {
  const highlights = [
    {
      value: "50+",
      label: "AI Tools",
    },
    {
      value: "∞",
      label: "Generate",
    },
    {
      value: "24/7",
      label: "AI Support",
    },
    {
      value: "ALL",
      label: "In One Workspace",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#090909]">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-500/[0.08] blur-[140px] sm:h-[700px] sm:w-[700px] sm:blur-[180px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40">

        {/* BADGE */}
        <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-yellow-400 sm:px-4 sm:text-xs">
          🚀 Pilih Paket Rife Digital AI
        </span>

        {/* HEADING */}
        <h1 className="mx-auto mt-6 max-w-4xl text-[36px] font-black leading-[1.04] tracking-[-0.04em] text-white sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl">
          Bangun Bisnis Digital
          <br />

          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            dengan AI.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-gray-500 sm:mt-7 sm:text-base sm:leading-8">
          Pilih paket yang sesuai dengan kebutuhanmu. Mulai dari akses dasar
          hingga workspace AI lengkap untuk membangun, mempromosikan, dan
          mengembangkan bisnis digital.
        </p>

        {/* HIGHLIGHTS */}
        <div className="mx-auto mt-9 grid max-w-4xl grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] sm:mt-12 sm:grid-cols-4">
          {highlights.map((item, index) => (
            <div
              key={item.label}
              className={`
                flex min-h-[96px] flex-col items-center justify-center
                px-3 py-5
                ${
                  index % 2 !== 1
                    ? "border-r border-white/[0.08]"
                    : ""
                }
                ${
                  index < 2
                    ? "border-b border-white/[0.08] sm:border-b-0"
                    : ""
                }
                sm:border-r sm:border-white/[0.08]
                ${
                  index === highlights.length - 1
                    ? "sm:border-r-0"
                    : ""
                }
              `}
            >
              <p
                className={`font-black tracking-tight text-yellow-400 ${
                  item.value === "ALL"
                    ? "text-base sm:text-lg"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {item.value}
              </p>

              <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-600 sm:text-[10px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* POSITIONING MESSAGE */}
        <div className="mx-auto mt-8 max-w-2xl sm:mt-10">
          <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.04] px-5 py-5 sm:rounded-3xl sm:px-8 sm:py-6">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-lg">
                ✨
              </div>

              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-white sm:text-sm">
                  Mulai dari kebutuhanmu. Upgrade saat kamu siap.
                </p>

                <p className="mt-1 text-[10px] leading-5 text-gray-600 sm:text-xs">
                  Semua paket dirancang untuk membantu kamu bekerja lebih cepat
                  dengan AI dalam satu workspace.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SMALL TRUST LINE */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-700 sm:mt-9 sm:text-[10px]">
          <span>✓ Akses AI</span>
          <span>✓ Workspace Terintegrasi</span>
          <span>✓ Upgrade Kapan Saja</span>
        </div>
      </div>
    </section>
  );
}