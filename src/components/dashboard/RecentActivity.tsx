import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Lightbulb,
  Megaphone,
  Sparkles,
} from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      title: "Caption Instagram berhasil dibuat",
      time: "2 menit lalu",
      icon: FileText,
      type: "Content",
    },
    {
      title: "Landing Page AI selesai",
      time: "12 menit lalu",
      icon: Sparkles,
      type: "AI Generated",
    },
    {
      title: "Ide Produk Digital dibuat",
      time: "35 menit lalu",
      icon: Lightbulb,
      type: "Product",
    },
    {
      title: "Copywriting Facebook Ads selesai",
      time: "1 jam lalu",
      icon: Megaphone,
      type: "Marketing",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-600">
            Activity
          </p>

          <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
            Aktivitas Terbaru
          </h3>
        </div>

        <button
          type="button"
          className="group flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition hover:text-yellow-400 sm:text-sm"
        >
          Lihat semua
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* ACTIVITY LIST */}
      <div className="p-4 sm:p-5">
        <div className="space-y-2">
          {activities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex items-center gap-4 rounded-2xl border border-transparent px-3 py-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] sm:px-4"
              >
                {/* ICON */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-400/10 bg-yellow-400/[0.06] text-yellow-400 transition-all duration-300 group-hover:border-yellow-400/20 group-hover:bg-yellow-400/10">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    <p className="truncate text-sm font-bold text-white">
                      {item.title}
                    </p>

                    <span className="hidden h-1 w-1 shrink-0 rounded-full bg-gray-700 sm:block" />

                    <span className="shrink-0 text-[11px] font-medium text-gray-600">
                      {item.type}
                    </span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Clock3
                      size={12}
                      strokeWidth={1.8}
                      className="text-gray-600"
                    />

                    <p className="text-xs text-gray-500">
                      {item.time}
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                <div className="hidden shrink-0 sm:block">
                  <CheckCircle2
                    size={17}
                    strokeWidth={2}
                    className="text-yellow-400/70"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER INFO */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10">
            <Sparkles
              size={13}
              className="text-yellow-400"
              strokeWidth={2}
            />
          </div>

          <p className="text-[11px] leading-5 text-gray-500">
            Semua hasil yang kamu buat dengan AI akan tersimpan di riwayat.
          </p>
        </div>
      </div>
    </div>
  );
}