import AIWorkspace from "./AIWorkspace";
import RecentActivity from "./RecentActivity";

export default function DashboardContent() {
  const stats = [
    {
      label: "AI Tools",
      value: "50+",
      description: "Tools siap digunakan",
      accent: true,
    },
    {
      label: "Produk Dibuat",
      value: "12.845+",
      description: "Produk digital",
      accent: false,
    },
    {
      label: "Konten Dibuat",
      value: "248.931+",
      description: "Caption, copywriting & script",
      accent: false,
    },
    {
      label: "Success Rate",
      value: "98.4%",
      description: "Tingkat kepuasan pengguna",
      accent: false,
    },
  ];

  const projects = [
    {
      title: "Digital Planner Guru SD",
      type: "Produk Digital",
      status: "Selesai",
      statusStyle: "bg-green-400/10 text-green-400",
    },
    {
      title: "Caption Instagram Affiliate",
      type: "Konten",
      status: "Draft",
      statusStyle: "bg-yellow-400/10 text-yellow-400",
    },
    {
      title: "Landing Page Produk Digital",
      type: "Landing Page",
      status: "Published",
      statusStyle: "bg-blue-400/10 text-blue-400",
    },
    {
      title: "Script Reels Produk AI",
      type: "Script",
      status: "Baru",
      statusStyle: "bg-white/[0.06] text-gray-400",
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-7 overflow-hidden sm:space-y-9">

      {/* =========================================================
          OVERVIEW HEADER
      ========================================================= */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
            Overview
          </p>

          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Workspace kamu.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Semua yang kamu butuhkan untuk membuat produk, konten, dan
            mengembangkan bisnis digital ada di sini.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />

          <span className="text-xs font-medium text-gray-400">
            Semua sistem berjalan normal
          </span>
        </div>

      </div>


      {/* =========================================================
          STATISTICS
      ========================================================= */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

        {stats.map((item) => (
          <div
            key={item.label}
            className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
              item.accent
                ? "border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.08] via-[#111111] to-[#0d0d0d]"
                : "border-white/[0.07] bg-[#101010] hover:border-white/[0.12]"
            }`}
          >

            {item.accent && (
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-yellow-400/[0.08] blur-2xl" />
            )}

            <div className="relative">

              <div className="flex items-center justify-between gap-2">

                <p className="truncate text-[10px] font-bold uppercase tracking-[0.13em] text-gray-500 sm:text-[11px]">
                  {item.label}
                </p>

                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    item.accent
                      ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.7)]"
                      : "bg-white/20"
                  }`}
                />

              </div>

              <p
                className={`mt-3 text-2xl font-black tracking-tight sm:text-3xl ${
                  item.accent ? "text-yellow-400" : "text-white"
                }`}
              >
                {item.value}
              </p>

              <p className="mt-1 text-[11px] leading-5 text-gray-600 sm:text-xs">
                {item.description}
              </p>

            </div>
          </div>
        ))}

      </div>


      {/* =========================================================
          AI WORKSPACE
      ========================================================= */}
      <div className="relative">

        <div className="mb-4 flex items-center justify-between gap-4 px-1">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-600">
              Main Workspace
            </p>

            <h2 className="mt-1 text-lg font-black text-white sm:text-xl">
              Buat dengan AI
            </h2>
          </div>

          <span className="hidden rounded-full border border-yellow-400/10 bg-yellow-400/[0.04] px-3 py-1.5 text-[10px] font-bold text-yellow-400 sm:inline-flex">
            RIFE AI
          </span>

        </div>

        <div className="w-full min-w-0 overflow-hidden">
          <AIWorkspace />
        </div>

      </div>


      {/* =========================================================
          LOWER SECTION
      ========================================================= */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr]">

        {/* =======================================================
            RECENT ACTIVITY
        ======================================================= */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010]">

          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600">
                Activity
              </p>

              <h3 className="mt-1 text-lg font-black text-white">
                Aktivitas Terbaru
              </h3>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-gray-500 transition hover:text-yellow-400"
            >
              Lihat semua →
            </button>

          </div>

          <div className="p-4 sm:p-5">
            <RecentActivity />
          </div>

        </div>


        {/* =======================================================
            RECENT PROJECTS
        ======================================================= */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010]">

          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600">
                Workspace
              </p>

              <h3 className="mt-1 text-lg font-black text-white">
                Project Terbaru
              </h3>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-gray-500 transition hover:text-yellow-400"
            >
              Semua →
            </button>

          </div>


          <div className="space-y-2.5 p-4 sm:p-5">

            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/[0.05] bg-[#0b0b0b] p-3.5 transition-all duration-200 hover:border-white/[0.10] hover:bg-[#111111] sm:p-4"
              >

                {/* PROJECT ICON */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    index === 0
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "bg-white/[0.04] text-gray-500"
                  }`}
                >
                  {index === 0
                    ? "✦"
                    : index === 1
                    ? "✍"
                    : index === 2
                    ? "⌁"
                    : "◈"}
                </div>


                {/* PROJECT INFO */}
                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-bold text-white">
                    {project.title}
                  </p>

                  <p className="mt-1 truncate text-[11px] text-gray-600">
                    {project.type}
                  </p>

                </div>


                {/* STATUS */}
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] ${project.statusStyle}`}
                >
                  {project.status}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>


      {/* =========================================================
          BOTTOM TIP
      ========================================================= */}
      <div className="relative overflow-hidden rounded-2xl border border-yellow-400/10 bg-gradient-to-r from-yellow-400/[0.05] via-[#101010] to-[#101010] p-5 sm:p-6">

        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-yellow-400/[0.05] blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/[0.08] text-yellow-400">
              💡
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Mulai dari satu hal terlebih dahulu.
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                Ceritakan kebutuhanmu ke Rife AI dan biarkan AI membantu
                menentukan langkah berikutnya.
              </p>
            </div>

          </div>

          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-700">
              Rife Digital AI
            </p>

            <p className="mt-1 text-xs text-yellow-400">
              Build. Create. Sell.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}