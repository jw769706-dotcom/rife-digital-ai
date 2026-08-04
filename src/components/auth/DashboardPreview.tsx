export default function DashboardPreview() {
  return (
    <div className="relative mt-10">

      {/* Glow */}
      <div className="absolute inset-0 rounded-[32px] bg-yellow-500/20 blur-3xl" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#101010]/90 shadow-2xl backdrop-blur-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
            Dashboard Preview
          </span>

        </div>

        <div className="grid lg:grid-cols-[180px_1fr]">

          {/* Sidebar */}
          <aside className="border-r border-white/10 bg-[#0d0d0d] p-5">

            {[
              "Dashboard",
              "AI Writer",
              "AI Product",
              "AI Marketing",
              "History",
            ].map((menu, index) => (
              <div
                key={menu}
                className={`mb-2 rounded-xl px-4 py-3 text-sm ${
                  index === 0
                    ? "bg-yellow-500 text-black font-bold"
                    : "text-gray-400"
                }`}
              >
                {menu}
              </div>
            ))}

          </aside>

          {/* Content */}
          <main className="space-y-5 p-6">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-sm text-yellow-400">
                AI Assistant
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                Selamat Datang 👋
              </h2>

              <p className="mt-3 text-gray-400">
                Semua tools AI tersedia dalam satu dashboard.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-sm text-gray-400">
                  Total AI Tools
                </p>

                <h3 className="mt-2 text-3xl font-black text-yellow-400">
                  50+
                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                <p className="text-sm text-gray-400">
                  Productivity
                </p>

                <h3 className="mt-2 text-3xl font-black text-green-400">
                  10x
                </h3>

              </div>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <p className="text-sm text-gray-400">
                AI Suggestion
              </p>

              <div className="mt-4 rounded-xl bg-[#090909] p-4 text-white">
                Buatkan landing page SaaS premium dengan tema hitam dan emas.
              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}