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
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { newChat } from "../../lib/storage";

const welcomeMessage = {
  role: "assistant",
  content: `Halo Rifqi 👋

Selamat datang di Rife Digital AI.

Saya siap membantu membuat:

• Caption Instagram
• Copywriting
• Landing Page
• Artikel SEO
• Script Reels
• Ide Produk Digital

Silakan pilih salah satu tools di atas.`,
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
    icon: Crown,
    name: "Upgrade",
    path: "/pricing",
  },
  {
    icon: Settings,
    name: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleNewProject() {
    newChat(welcomeMessage);
    window.location.reload();
  }

  return (
    <aside className="flex h-screen w-[300px] flex-col border-r border-white/10 bg-[#090909]">
      {/* LOGO */}
      <div className="border-b border-white/10 px-7 py-8">
        <h1 className="text-[38px] font-black leading-none text-white">
          Rife
          <span className="text-yellow-400">Digital</span>
          <br />
          <span className="text-yellow-400">AI</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Build Your Digital Business with AI
        </p>
      </div>

      {/* NEW PROJECT */}
      <div className="p-5">
        <button
          onClick={handleNewProject}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300"
        >
          <Sparkles size={18} />
          New Project
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto px-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `mb-2 flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition ${
                  isActive
                    ? "bg-yellow-400 font-bold text-black"
                    : "text-gray-400 hover:bg-[#171717] hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {menu.name}
            </NavLink>
          );
        })}
      </div>

      {/* GROWTH PLAN */}
      <div className="border-t border-white/10 p-5">
        <div className="rounded-3xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 via-[#171717] to-[#0d0d0d] p-5">
          {/* PLAN LABEL */}
          <div className="flex items-center gap-2">
            <Crown size={15} className="text-yellow-400" />

            <p className="text-xs font-black uppercase tracking-wider text-yellow-400">
              Growth Plan
            </p>
          </div>

          {/* PRICE */}
          <div className="mt-3 flex items-end gap-1">
            <h2 className="text-3xl font-black leading-none text-white">
              Rp49K
            </h2>

            <span className="mb-0.5 text-xs text-gray-400">
              /bulan
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-gray-400">
            Semua yang kamu butuhkan untuk mulai membangun bisnis digital
            dengan AI.
          </p>

          {/* BENEFITS */}
          <div className="mt-4 space-y-2">
            {[
              "Unlimited Generate",
              "50+ AI Tools",
              "AI Product Generator",
              "Writer & Copywriting AI",
              "Marketing & Content AI",
              "Tutorial lengkap untuk pemula",
              "Tanya AI kapan saja",
              "History semua hasil generate",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-2 text-xs text-gray-300"
              >
                <Check
                  size={14}
                  className="mt-0.5 shrink-0 text-yellow-400"
                />

                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/pricing")}
            className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 text-sm font-black text-black transition hover:bg-yellow-300"
          >
            Upgrade ke Growth
          </button>

          <p className="mt-2 text-center text-[10px] text-gray-500">
            Cocok untuk pemula yang baru mulai.
          </p>
        </div>
      </div>
    </aside>
  );
}