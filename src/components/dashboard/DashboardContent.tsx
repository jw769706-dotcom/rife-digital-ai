import AIWorkspace from "./AIWorkspace";
import RecentActivity from "./RecentActivity";

export default function DashboardContent() {
  const stats = [
    {
      title: "⚡ Total AI Tools",
      value: "50+",
      sub: "Semua tools AI siap digunakan",
      color: "text-yellow-400",
    },
    {
      title: "📦 Produk AI Generated",
      value: "12.845+",
      sub: "Produk digital berhasil dibuat",
      color: "text-white",
    },
    {
      title: "✍️ Konten AI Generated",
      value: "248.931+",
      sub: "Caption, copywriting & script",
      color: "text-white",
    },
    {
      title: "🚀 Success Rate",
      value: "98.4%",
      sub: "Tingkat kepuasan pengguna",
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Statistik */}

      <div className="grid gap-6 lg:grid-cols-4">

        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-[#111] p-7 transition duration-300 hover:-translate-y-1 hover:border-yellow-500/30"
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className={`mt-4 text-5xl font-black ${item.color}`}>
              {item.value}
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              {item.sub}
            </p>

          </div>
        ))}

      </div>

      {/* AI Workspace */}

      <AIWorkspace />

      {/* Bottom */}

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentActivity />

        <div className="rounded-3xl border border-white/10 bg-[#111] p-6">

          <h3 className="text-2xl font-bold text-white">
            Project Terbaru
          </h3>

          <div className="mt-6 space-y-4">

            <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">

              <p className="font-semibold text-white">
                Digital Planner Guru SD
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Selesai • 100%
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">

              <p className="font-semibold text-white">
                Caption Instagram Affiliate
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Draft
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">

              <p className="font-semibold text-white">
                Landing Page Produk Digital
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Published
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#181818] p-5">

              <p className="font-semibold text-white">
                Script Reels Produk AI
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Baru dibuat
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}