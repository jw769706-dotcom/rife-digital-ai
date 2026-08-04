import DashboardLayout from "../components/layout/DashboardLayout";

export default function AIMarketing() {
  return (
    <DashboardLayout
      title="Marketing Studio"
      subtitle="Bangun strategi marketing dengan bantuan AI."
    >
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-12">

        <h1 className="text-4xl font-black text-white">
          Marketing Studio
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Pilih tools yang ingin digunakan.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              📣 Facebook Ads
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              📸 Instagram Ads
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              🎵 TikTok Ads
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              🎯 CTA Generator
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              📧 Email Campaign
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              📊 Marketing Strategy
            </h2>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}