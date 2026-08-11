import { useEffect, useState } from "react";
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
import { getPlan, type Plan } from "../lib/subscriptions";
import { supabase } from "../lib/supabase";

export default function Settings() {
  const navigate = useNavigate();

  const [plan, setPlan] = useState<Plan>("FREE");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const [notifications, setNotifications] = useState({
    ai: true,
    tips: true,
    updates: false,
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        setProfileLoading(true);

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Gagal mengambil akun:", error);
          return;
        }

        if (user) {
          setEmail(user.email ?? "");

          const metadataName =
            typeof user.user_metadata?.name === "string"
              ? user.user_metadata.name.trim()
              : "";

          setName(metadataName);
        }

        const currentPlan = await getPlan();
        console.log("CURRENT PLAN:", currentPlan);
        setPlan(currentPlan);
      } catch (error) {
        console.error("Gagal memuat Settings:", error);
        setPlan("FREE");
      } finally {
        setProfileLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function handleSaveProfile() {
    try {
      setSavingProfile(true);

      const cleanName = name.trim();

      const { error } = await supabase.auth.updateUser({
        data: {
          name: cleanName,
        },
      });

      if (error) {
        console.error("Gagal menyimpan profil:", error);
        alert("Gagal menyimpan perubahan profil.");
        return;
      }

      alert("Perubahan profil berhasil disimpan.");
    } catch (error) {
      console.error("SAVE PROFILE ERROR:", error);
      alert("Terjadi kesalahan saat menyimpan profil.");
    } finally {
      setSavingProfile(false);
    }
  }

  function handleChangePassword() {
    alert("Fitur ubah password akan segera tersedia.");
  }

  function handleLogout() {
    localStorage.removeItem("rife-auth");
    localStorage.removeItem("rife-user");

    navigate("/login");
  }

  function getPlanName() {
    if (plan === "PRO") return "Pro";
    if (plan === "BASIC") return "Basic";
    return "Free";
  }

  function getPlanPrice() {
    if (plan === "PRO") return "Rp99.000";
    if (plan === "BASIC") return "Rp49.000";
    return "Rp0";
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl min-w-0 space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.12] via-[#111111] to-[#090909] p-6 sm:p-8 lg:p-10">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="relative flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                <User size={13} />
                Account Center
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Pengaturan Akun
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Atur profil, notifikasi, keamanan, dan paket Rife Digital AI
                kamu dari satu tempat.
              </p>
            </div>

            <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                Paket Saat Ini
              </p>

              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-2xl font-black text-white">
                    {getPlanName()}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {getPlanPrice()} / bulan
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/pricing")}
                  className="rounded-xl bg-yellow-400 px-4 py-2.5 text-xs font-black text-black transition hover:bg-yellow-300"
                >
                  Kelola
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE */}
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 p-6 sm:p-7">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                <User size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                  Profil
                </p>
                <h2 className="mt-1 text-xl font-black text-white">
                  Informasi Akun
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Nama dan email yang digunakan untuk akun Rife kamu.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <div className="grid min-w-0 gap-5 md:grid-cols-2">
              <div className="min-w-0">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Nama
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={profileLoading || savingProfile}
                  placeholder="Masukkan nama kamu"
                  className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#181818] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50 disabled:cursor-not-allowed disabled:opacity-60"
                />

                {!profileLoading && !name.trim() && (
                  <p className="mt-2 text-xs text-gray-600">
                    Nama belum diatur. Kamu bisa mengisinya kapan saja.
                  </p>
                )}
              </div>

              <div className="min-w-0">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Email Akun
                </label>

                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#181818] px-4 py-3.5">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-green-400" />

                  <p className="min-w-0 truncate text-sm text-gray-300">
                    {profileLoading ? "Memuat akun..." : email || "Email tidak tersedia"}
                  </p>
                </div>

                <p className="mt-2 text-xs text-gray-600">
                  Email diambil langsung dari akun yang sedang login.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={profileLoading || savingProfile}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3.5 text-sm font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Save size={16} />
              {savingProfile ? "Menyimpan..." : "Simpan Nama"}
            </button>
          </div>
        </section>

        {/* NOTIFICATIONS + SECURITY */}
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <section className="min-w-0 rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-7">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                <Bell size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                  Preferensi
                </p>
                <h2 className="mt-1 text-xl font-black text-white">
                  Notifikasi
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Pilih informasi yang ingin kamu terima.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <NotificationItem
                title="Hasil AI selesai"
                description="Beritahu ketika proses generate selesai."
                checked={notifications.ai}
                onChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, ai: checked }))
                }
              />

              <NotificationItem
                title="Tips untuk pemula"
                description="Dapatkan panduan untuk mengembangkan bisnis digital."
                checked={notifications.tips}
                onChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, tips: checked }))
                }
              />

              <NotificationItem
                title="Update Rife"
                description="Informasi fitur dan pembaruan terbaru."
                checked={notifications.updates}
                onChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, updates: checked }))
                }
              />
            </div>
          </section>

          <section className="min-w-0 rounded-[28px] border border-white/10 bg-[#111111] p-6 sm:p-7">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                <Shield size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                  Keamanan
                </p>
                <h2 className="mt-1 text-xl font-black text-white">
                  Lindungi Akunmu
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Kelola keamanan akun Rife Digital AI.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-green-400/15 bg-green-400/[0.05] p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-green-400">✓</span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Akun terlindungi
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Gunakan password yang kuat dan jangan bagikan informasi
                    login kepada orang lain.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleChangePassword}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#181818] px-5 py-3.5 text-sm font-bold text-white transition hover:border-yellow-400/40 hover:bg-[#202020]"
            >
              <Lock size={16} />
              Ubah Password
            </button>
          </section>
        </div>

        {/* SUBSCRIPTION */}
        <section className="overflow-hidden rounded-[30px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.10] via-[#111111] to-[#090909] p-6 sm:p-8">
          <div className="flex min-w-0 flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <CreditCard size={22} />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                  Membership
                </p>
                <h2 className="mt-1 text-2xl font-black text-white">
                  Paket Rife Digital AI
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Pilih akses yang sesuai dengan kebutuhanmu.
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-2xl border border-yellow-400/20 bg-black/20 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-yellow-400">
                Paket Saat Ini
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {getPlanName()}
              </p>
              <p className="text-xs text-gray-500">
                {getPlanPrice()} / bulan
              </p>
            </div>
          </div>

          <div className="mt-7 grid min-w-0 gap-4 md:grid-cols-2">
            <PlanCard
              name="BASIC"
              price="Rp49.000"
              active={plan === "BASIC"}
              features={[
                "Generate AI tanpa batas",
                "Semua AI Tools terbuka",
                "Buat produk digital",
                "Content & Marketing AI",
                "History hasil generate",
                "Cocok untuk pemula",
              ]}
            />

            <PlanCard
              name="PRO"
              price="Rp99.000"
              active={plan === "PRO"}
              features={[
                "Semua fitur BASIC",
                "Generate lebih cepat",
                "Prioritas bantuan",
                "Template premium",
                "Akses fitur AI terbaru",
                "Konsultasi private 1:1",
              ]}
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="mt-5 w-full rounded-2xl bg-yellow-400 px-5 py-4 text-sm font-black text-black transition hover:bg-yellow-300"
          >
            Lihat Detail & Upgrade Paket
          </button>
        </section>

        {/* LOGOUT */}
        <section className="rounded-[28px] border border-red-500/10 bg-[#111111] p-6 sm:p-7">
          <div className="flex min-w-0 flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">
                Sesi Akun
              </p>

              <h2 className="mt-2 text-lg font-black text-white">
                Keluar dari Akun
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Gunakan tombol ini jika ingin keluar dari akun Rife Digital AI
                di perangkat ini.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3.5 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function PlanCard({
  name,
  price,
  active,
  features,
}: {
  name: string;
  price: string;
  active: boolean;
  features: string[];
}) {
  return (
    <div
      className={`min-w-0 rounded-3xl border p-5 sm:p-6 ${
        active
          ? "border-yellow-400/40 bg-yellow-400/[0.07]"
          : "border-white/10 bg-[#171717]"
      }`}
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-black uppercase tracking-wider ${
              active ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            {name}
          </p>

          <p className="mt-2 text-2xl font-black text-white">{price}</p>
          <p className="mt-1 text-xs text-gray-600">per bulan</p>
        </div>

        {active && (
          <span className="shrink-0 rounded-full bg-yellow-400 px-3 py-1 text-[9px] font-black text-black">
            PAKET SAAT INI
          </span>
        )}
      </div>

      <div className="mt-5 space-y-2.5">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex min-w-0 items-start gap-2 text-xs leading-5 text-gray-300"
          >
            <span className="mt-0.5 shrink-0 text-yellow-400">✓</span>
            <span className="min-w-0 break-words">{feature}</span>
          </div>
        ))}
      </div>
    </div>
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