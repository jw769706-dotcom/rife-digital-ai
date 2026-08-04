import {
  LayoutDashboard,
  PenSquare,
  Package,
  Megaphone,
  Image,
  Crown,
  Settings,
  Sparkles,
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

      <div className="p-5">
        <button
          onClick={handleNewProject}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-4 font-bold text-black"
        >
          <Sparkles size={18} />
          New Project
        </button>
      </div>

      <div className="flex-1 px-4">
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

      <div className="border-t border-white/10 p-5">
        <div className="rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 to-transparent p-6">
          <p className="text-sm font-bold text-yellow-400">
            BASIC
          </p>

          <h2 className="mt-2 text-4xl font-black text-white">
            Rp49K
          </h2>

          <p className="mt-2 text-xs text-gray-400">
            Mulai dari Rp49.000 / bulan
          </p>

          <button
            onClick={() => navigate("/pricing")}
            className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300"
          >
            Upgrade Sekarang
          </button>
        </div>
      </div>
    </aside>
  );
}