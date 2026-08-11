import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Save,
  Lock,
  LogOut,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

export default function Settings() {
  const navigate = useNavigate();

  const [name, setName] = useState("Rifqi Putra");
  const [email, setEmail] = useState("rifqiparfume@gmail.com");

  const [notifications, setNotifications] = useState({
    ai: true,
    tips: true,
    updates: false,
  });

  function handleSaveProfile() {
    alert("Perubahan profil berhasil disimpan.");
  }

  function handleChangePassword() {
    alert("Fitur ubah password akan segera tersedia.");
  }

  function handleLogout() {
    localStorage.removeItem("rife-auth");
    localStorage.removeItem("rife-user");

    navigate("/login");
  }

  return (
    <DashboardLayout
      title="Settings"
      subtitle="Atur akun, notifikasi, keamanan, dan langganan Rife Digital AI."
    >
      <div className="mx-auto max-w-6xl space-y-5">

        {/* ========================================= */}
        {/* AKUN */}
        {/* ========================================= */}

        <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
              <User size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Akun Saya
              </h2>

              <p className="text-sm text-gray-500">
                Kelola informasi akun Rife Digital AI kamu.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">
                Nama
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email kamu"
                className="w-full rounded-xl border border-white/10 bg-[#181818] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            className="mt-5 flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
          >
            <Save size={16} />
            Simpan Perubahan
          </button>

        </section>


        {/* ========================================= */}
        {/* NOTIFIKASI */}
        {/* ========================================= */}

        <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
              <Bell size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Notifikasi
              </h2>

              <p className="text-sm text-gray-500">
                Atur notifikasi yang ingin kamu terima.
              </p>
            </div>
          </div>


          <div className="mt-6 space-y-3">

            <NotificationItem
              title="Notifikasi hasil AI"
              description="Beritahu saya ketika proses generate selesai."
              checked={notifications.ai}
              onChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  ai: checked,
                }))
              }
            />

            <NotificationItem
              title="Tips & panduan"
              description="Dapatkan tips untuk membantu mengembangkan bisnis digital."
              checked={notifications.tips}
              onChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  tips: checked,
                }))
              }
            />

            <NotificationItem
              title="Update Rife Digital AI"
              description="Dapatkan informasi mengenai fitur dan pembaruan terbaru."
              checked={notifications.updates}
              onChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  updates: checked,
                }))
              }
            />

          </div>

        </section>


        {/* ========================================= */}
        {/* KEAMANAN */}
        {/* ========================================= */}

        <section className="rounded-3xl border border-white/10 bg-[#111111] p-6">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
              <Shield size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Keamanan
              </h2>

              <p className="text-sm text-gray-500">
                Lindungi akun dan data kamu.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleChangePassword}
            className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-[#181818] px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-400/40 hover:bg-[#202020]"
          >
            <Lock size={16} />
            Ubah Password
          </button>

        </section>


        {/* ========================================= */}
        {/* LANGGANAN */}
        {/* ========================================= */}

        <section className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/[0.08] to-transparent p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
              <CreditCard size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-white">
                Langganan
              </h2>

              <p className="text-sm text-gray-500">
                Kelola paket Rife Digital AI kamu.
              </p>
            </div>

          </div>


          {/* CURRENT PLAN */}

          <div className="mt-6 flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[#111111] p-5 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-bold text-yellow-400">
                PAKET SAAT INI
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                Basic
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                Rp49.000 / bulan
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
            >
              Lihat Paket
            </button>

          </div>


          {/* PLAN SUMMARY */}

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            {/* BASIC */}

            <div className="rounded-2xl border border-yellow-400/30 bg-[#17140a] p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold text-yellow-400">
                    BASIC
                  </p>

                  <h3 className="mt-1 text-xl font-black text-white">
                    Rp49.000
                  </h3>

                  <p className="text-xs text-gray-500">
                    / bulan
                  </p>
                </div>

                <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-black text-black">
                  POPULER
                </span>

              </div>

              <div className="mt-5 space-y-2 text-xs text-gray-300">

                <p>✓ Generate AI tanpa batas</p>
                <p>✓ Semua AI Tools</p>
                <p>✓ Buat produk digital</p>
                <p>✓ Content & Marketing AI</p>
                <p>✓ Template premium</p>
                <p>✓ History otomatis</p>
                <p>✓ Cocok untuk pemula</p>

              </div>

            </div>


            {/* PRO */}

            <div className="rounded-2xl border border-white/10 bg-[#171717] p-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold text-gray-400">
                    PRO
                  </p>

                  <h3 className="mt-1 text-xl font-black text-white">
                    Rp99.000
                  </h3>

                  <p className="text-xs text-gray-500">
                    / bulan
                  </p>
                </div>

                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-gray-300">
                  PREMIUM
                </span>

              </div>

              <div className="mt-5 space-y-2 text-xs text-gray-300">

                <p>✓ Semua fitur Basic</p>
                <p>✓ Prioritas Generate</p>
                <p>✓ Template premium lebih lengkap</p>
                <p>✓ Akses fitur AI terbaru</p>
                <p>✓ Prioritas bantuan</p>
                <p>✓ Fitur bisnis lebih lengkap</p>

              </div>

            </div>

          </div>


          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="mt-5 w-full rounded-xl bg-yellow-400 px-5 py-3 font-black text-black transition hover:bg-yellow-300"
          >
            Lihat Semua Paket
          </button>

        </section>


        {/* ========================================= */}
        {/* LOGOUT */}
        {/* ========================================= */}

        <section className="rounded-3xl border border-red-500/10 bg-[#111111] p-6">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>

              <h2 className="text-lg font-black text-white">
                Keluar dari Akun
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keluar dari akun Rife Digital AI di perangkat ini.
              </p>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
}


/* ================================================= */
/* NOTIFICATION ITEM */
/* ================================================= */

function NotificationItem({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-[#181818] p-4 transition hover:border-white/20">

      <div className="pr-5">

        <p className="text-sm font-bold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>

      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-yellow-400"
      />

    </label>
  );
}