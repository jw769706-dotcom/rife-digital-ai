import DashboardLayout from "../components/layout/DashboardLayout";

export default function AIContent() {
  return (
    <DashboardLayout
      title="Content Studio"
      subtitle="Buat berbagai jenis konten berkualitas menggunakan AI."
    >
      <div className="rounded-3xl border border-white/10 bg-[#111111] p-12">

        <h1 className="text-4xl font-black text-white">
          Content Studio
        </h1>

        <p className="mt-4 text-lg text-gray-400">
          Pilih tools yang ingin digunakan.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              📅 Content Calendar
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              💡 Ide Konten
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              📸 Instagram Carousel
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              🎬 Video Content
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              🎯 Hook Generator
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#171717] p-6">
            <h2 className="text-xl font-bold text-white">
              🔥 Viral Content
            </h2>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}