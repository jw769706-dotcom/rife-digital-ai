export default function RecentActivity() {
  const activities = [
    {
      title: "Caption Instagram berhasil dibuat",
      time: "2 menit lalu",
    },
    {
      title: "Landing Page AI selesai",
      time: "12 menit lalu",
    },
    {
      title: "Ide Produk Digital dibuat",
      time: "35 menit lalu",
    },
    {
      title: "Copywriting Facebook Ads selesai",
      time: "1 jam lalu",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">
      <h3 className="text-2xl font-bold text-white">
        Aktivitas Terbaru
      </h3>

      <div className="mt-6 space-y-4">
        {activities.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-[#181818] p-4"
          >
            <p className="font-semibold text-white">
              {item.title}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}