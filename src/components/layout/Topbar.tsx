import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0F0F0F] px-10">
      <div>
        <h1 className="text-3xl font-black text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Selamat datang kembali 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10">
          🔔
        </button>

        <button className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white transition hover:bg-white/10">
          ⚙️
        </button>

        <button
          onClick={() => navigate("/pricing")}
          className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300"
        >
          Upgrade
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-black text-black">
            R
          </div>

          <div>
            <h3 className="font-bold text-white">
              Rifqi Putra
            </h3>

            <p className="text-sm text-gray-400">
              Premium User
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}