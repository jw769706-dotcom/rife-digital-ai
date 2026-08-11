import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  PenSquare,
  Package,
  Megaphone,
  Image,
  Crown,
  Settings,
  Sparkles,
  Check,
  History,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { newChat } from "../../lib/storage";
import { supabase } from "../../lib/supabase";
import { getPlan, type Plan } from "../../lib/subscriptions";

type UserInfo = {
  name: string;
  email: string;
  initial: string;
};

const menus = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: PenSquare,
    name: "Writer Studio",
    path: "/writer",
  },
  {
    icon: Package,
    name: "Product Studio",
    path: "/product",
  },
  {
    icon: Megaphone,
    name: "Marketing Studio",
    path: "/marketing",
  },
  {
    icon: Image,
    name: "Content Studio",
    path: "/content",
  },
  {
    icon: History,
    name: "History",
    path: "/history",
  },
];

function getDisplayName(
  metadata: Record<string, unknown> | undefined,
  email: string
) {
  const metadataName =
    typeof metadata?.full_name === "string"
      ? metadata.full_name.trim()
      : typeof metadata?.name === "string"
        ? metadata.name.trim()
        : "";

  if (metadataName) {
    return metadataName;
  }

  const emailName = email.split("@")[0]?.trim();

  if (!emailName) {
    return "Pengguna";
  }

  return emailName;
}

function getInitial(name: string, email: string) {
  const source = name.trim() || email.trim();

  return source.charAt(0).toUpperCase() || "R";
}

function getPlanLabel(plan: Plan) {
  if (plan === "PRO") return "Pro Account";
  if (plan === "BASIC") return "Basic Account";
  return "Free Account";
}

export default function Sidebar() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInfo>({
    name: "Pengguna",
    email: "",
    initial: "P",
  });

  const [plan, setPlan] = useState<Plan>("FREE");
  const [loadingUser, setLoadingUser] = useState(true);

  async function loadAccount() {
    try {
      setLoadingUser(true);

      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (!currentUser) {
        setUser({
          name: "Pengguna",
          email: "",
          initial: "P",
        });
        setPlan("FREE");
        return;
      }

      const email = currentUser.email ?? "";

      const name = getDisplayName(
        currentUser.user_metadata as Record<string, unknown> | undefined,
        email
      );

      setUser({
        name,
        email,
        initial: getInitial(name, email),
      });

      try {
        const currentPlan = await getPlan();
        setPlan(currentPlan);
      } catch (planError) {
        console.error("Gagal mengambil paket akun:", planError);
        setPlan("FREE");
      }
    } catch (error) {
      console.error("Gagal mengambil data akun:", error);

      setUser({
        name: "Pengguna",
        email: "",
        initial: "P",
      });

      setPlan("FREE");
    } finally {
      setLoadingUser(false);
    }
  }

  useEffect(() => {
    void loadAccount();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => {
        void loadAccount();
      }, 0);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const welcomeMessage = useMemo(
    () => ({
      role: "assistant",
      content: `Halo ${user.name} 👋

Selamat datang di Rife Digital AI.

Saya siap membantu membuat:

• Caption Instagram
• Copywriting
• Landing Page
• Artikel SEO
• Script Reels
• Ide Produk Digital

Silakan pilih salah satu tools di atas.`,
    }),
    [user.name]
  );

  function handleNewProject() {
    newChat(welcomeMessage);
    window.location.reload();
  }

  function getUpgradeContent() {
    if (plan === "PRO") {
      return {
        label: "PAKET AKTIF",
        title: "Rife PRO",
        price: "Rp99K",
        description:
          "Kamu sudah mendapatkan akses untuk membangun bisnis digital dengan fitur AI yang lebih lengkap.",
        benefits: [
          "Semua fitur Basic tersedia.",
          "Prioritas generate lebih nyaman.",
          "Template premium lebih lengkap.",
          "Akses fitur AI terbaru.",
        ],
        button: "Kelola Paket",
      };
    }

    if (plan === "BASIC") {
      return {
        label: "PAKET AKTIF",
        title: "Rife BASIC",
        price: "Rp49K",
        description:
          "Semua kebutuhan dasar untuk mulai membuat produk, konten, dan strategi bisnis dengan bantuan AI.",
        benefits: [
          "Generate AI tanpa batas.",
          "Akses semua AI Tools.",
          "Buat produk digital lebih mudah.",
          "History hasil AI tersimpan.",
        ],
        button: "Lihat Paket",
      };
    }

    return {
      label: "UNTUK PEMULA",
      title: "Rife BASIC",
      price: "Rp49K",
      description:
        "Mulai bikin bisnis digital tanpa harus jago AI. Rife bantu kamu dari ide sampai siap dipraktikkan.",
      benefits: [
        "Bingung mulai dari mana? AI bantu.",
        "Temukan ide produk yang bisa dijual.",
        "Bikin produk & konten lebih mudah.",
        "Tanya AI kapan pun kamu mentok.",
      ],
      button: "Mulai Bangun Bisnis",
    };
  }

  const upgradeContent = getUpgradeContent();

  return (
    <aside className="flex h-screen w-full flex-col border-r border-white/[0.07] bg-[#080808]">
      {/* BRAND */}
      <div className="shrink-0 px-5 pb-5 pt-6 sm:px-6 sm:pt-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-lg font-black text-black shadow-[0_0_30px_rgba(250,204,21,0.12)]">
            R
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-[17px] font-black tracking-tight text-white">
              Rife <span className="text-yellow-400">Digital AI</span>
            </h1>

            <p className="mt-0.5 truncate text-[10px] font-medium tracking-wide text-gray-600">
              Build your digital business
            </p>
          </div>
        </div>
      </div>

      {/* NEW PROJECT */}
      <div className="shrink-0 px-4 pb-5">
        <button
          type="button"
          onClick={handleNewProject}
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-yellow-400 py-3.5 text-sm font-black text-black shadow-[0_8px_30px_rgba(250,204,21,0.08)] transition-all duration-200 hover:bg-yellow-300 hover:shadow-[0_10px_35px_rgba(250,204,21,0.15)] active:scale-[0.98]"
        >
          <Sparkles
            size={16}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:rotate-12"
          />
          New Project
        </button>
      </div>

      {/* NAVIGATION */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        <div className="mb-2 px-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700">
            Main Menu
          </p>
        </div>

        <nav className="space-y-1">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.name}
                to={menu.path}
                className={({ isActive }) =>
                  `group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-[0_8px_25px_rgba(250,204,21,0.08)]"
                      : "text-gray-500 hover:bg-white/[0.035] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      className="shrink-0"
                    />

                    <span className="truncate">{menu.name}</span>

                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-black" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ACCOUNT */}
        <div className="mb-2 mt-7 px-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700">
            Account
          </p>
        </div>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
              isActive
                ? "bg-yellow-400 text-black"
                : "text-gray-500 hover:bg-white/[0.035] hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings
                size={17}
                strokeWidth={isActive ? 2.5 : 1.8}
              />

              <span>Settings</span>

              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-black" />
              )}
            </>
          )}
        </NavLink>
      </div>

      {/* PLAN CARD */}
      <div className="shrink-0 border-t border-white/[0.06] p-4">
        <div className="relative overflow-hidden rounded-2xl border border-yellow-400/15 bg-gradient-to-br from-yellow-400/[0.07] via-[#111111] to-[#0c0c0c] p-4">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-400/[0.08] blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400/10">
                <Crown
                  size={14}
                  className="text-yellow-400"
                  strokeWidth={2}
                />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-yellow-400">
                  {upgradeContent.label}
                </p>

                <p className="mt-0.5 text-xs font-bold text-white">
                  {upgradeContent.title}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-yellow-400/15 bg-yellow-400/10 px-2 py-1 text-[9px] font-bold text-yellow-400">
              {upgradeContent.price}
            </span>
          </div>

          <p className="relative mt-3 text-[10px] leading-5 text-gray-400">
            {upgradeContent.description}
          </p>

          <div className="relative mt-4 space-y-2">
            {upgradeContent.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-2 text-[10px] leading-4 text-gray-400"
              >
                <Check
                  size={12}
                  className="mt-0.5 shrink-0 text-yellow-400"
                  strokeWidth={2.5}
                />

                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-2.5 text-[11px] font-black text-black transition-all duration-200 hover:bg-yellow-300 active:scale-[0.98]"
          >
            {plan === "FREE" ? "🚀 " : ""}
            {upgradeContent.button}
            <span>→</span>
          </button>
        </div>
      </div>

      {/* USER */}
      <div className="shrink-0 border-t border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">
            {loadingUser ? "…" : user.initial}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">
              {loadingUser ? "Memuat akun..." : user.name}
            </p>

            <p className="truncate text-[10px] text-gray-600">
              {loadingUser
                ? "Memuat paket..."
                : user.email || getPlanLabel(plan)}
            </p>

            {!loadingUser && user.email && (
              <p className="truncate text-[9px] text-yellow-400/70">
                {getPlanLabel(plan)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="shrink-0 text-gray-600 transition hover:text-white"
            aria-label="Pengaturan akun"
          >
            <Settings size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}