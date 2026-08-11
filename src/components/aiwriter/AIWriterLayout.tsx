import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  PenSquare,
  Package,
  Megaphone,
  Image,
  Crown,
  Settings,
  Sparkles,
  Search,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { getHistory, type HistoryItem } from "../../lib/history";

type AIWriterLayoutProps = {
  children?: ReactNode;
  tool?: string;
  onSelectHistory?: (item: HistoryItem) => void;
  onNewProject?: () => void;
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
];

export default function AIWriterLayout({
  children,
  tool,
  onSelectHistory,
  onNewProject,
}: AIWriterLayoutProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  /* ================================= */
  /* LOAD HISTORY */
  /* ================================= */

  async function loadHistory() {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error("Gagal membaca history:", error);
      setHistory([]);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function initialLoad() {
      try {
        const data = await getHistory();

        if (mounted) {
          setHistory(data);
        }
      } catch (error) {
        console.error("Gagal membaca history:", error);

        if (mounted) {
          setHistory([]);
        }
      }
    }

    initialLoad();

    function handleHistoryUpdated() {
      void loadHistory();
    }

    window.addEventListener(
      "rife-history-updated",
      handleHistoryUpdated
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "rife-history-updated",
        handleHistoryUpdated
      );
    };
  }, []);

  /* ================================= */
  /* FILTER HISTORY */
  /* ================================= */

  const filteredHistory = useMemo(() => {
    let items = history;

    if (tool) {
      const currentTool = tool.toLowerCase();

      items = items.filter((item) => {
        const itemTool = item.tool.toLowerCase();

        return (
          itemTool.includes(currentTool) ||
          currentTool.includes(itemTool) ||
          [
            "writer",
            "caption",
            "copywriting",
            "landing page",
            "email",
            "reels",
            "seo",
          ].some(
            (keyword) =>
              itemTool.includes(keyword) &&
              currentTool.includes("writer")
          )
        );
      });
    }

    if (!search.trim()) {
      return items;
    }

    const keyword = search.toLowerCase();

    return items.filter(
      (item) =>
        item.tool.toLowerCase().includes(keyword) ||
        item.prompt.toLowerCase().includes(keyword) ||
        item.result.toLowerCase().includes(keyword)
    );
  }, [history, search, tool]);

  const todayHistory = filteredHistory.filter((item) =>
    isToday(item.createdAt)
  );

  const previousHistory = filteredHistory.filter(
    (item) => !isToday(item.createdAt)
  );

  /* ================================= */
  /* NEW PROJECT */
  /* ================================= */

  function handleNewProject() {
    if (onNewProject) {
      onNewProject();
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* ================================= */
  /* RENDER */
  /* ================================= */

  return (
    <div className="min-h-screen w-full bg-[#090909] text-white">
      <div className="flex min-h-screen w-full">

        {/* ================================= */}
        {/* SIDEBAR */}
        {/* ================================= */}

        <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 flex-col border-r border-white/10 bg-[#090909] lg:flex">

          {/* BRAND */}

          <div className="border-b border-white/10 px-7 py-7">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="text-left"
            >
              <h1 className="text-[30px] font-black leading-none tracking-tight text-white">
                Rife
                <span className="text-yellow-400">Digital</span>
                <br />
                <span className="text-yellow-400">AI</span>
              </h1>

              <p className="mt-3 text-xs text-gray-500">
                Build Your Digital Business with AI
              </p>
            </button>
          </div>

          {/* NEW PROJECT */}

          <div className="p-5">
            <button
              type="button"
              onClick={handleNewProject}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-4 text-sm font-bold text-black transition hover:bg-yellow-300 active:scale-[0.98]"
            >
              <Sparkles size={18} />
              New Project
            </button>
          </div>

          {/* MAIN MENU */}

          <div className="px-4">
            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.name}
                  to={menu.path}
                  className={({ isActive }) =>
                    `mb-2 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm transition ${
                      isActive
                        ? "bg-yellow-400 font-bold text-black"
                        : "text-gray-400 hover:bg-[#171717] hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{menu.name}</span>
                </NavLink>
              );
            })}

            {/* UPGRADE */}

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `mb-2 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm transition ${
                  isActive
                    ? "bg-yellow-400 font-bold text-black"
                    : "text-gray-400 hover:bg-[#171717] hover:text-white"
                }`
              }
            >
              <Crown size={20} />
              <span>Upgrade</span>
            </NavLink>

            {/* SETTINGS */}

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `mb-2 flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-sm transition ${
                  isActive
                    ? "bg-yellow-400 font-bold text-black"
                    : "text-gray-400 hover:bg-[#171717] hover:text-white"
                }`
              }
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </div>

          {/* ================================= */}
          {/* HISTORY */}
          {/* ================================= */}

          <div className="mt-4 min-h-0 flex-1 overflow-hidden px-4">

            {/* SEARCH */}

            <div className="mb-5">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari project..."
                  className="w-full rounded-2xl border border-white/10 bg-[#151515] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50"
                />
              </div>
            </div>

            <div className="h-full overflow-y-auto pr-1">

              {/* HARI INI */}

              <div>
                <p className="mb-3 px-1 text-[10px] font-bold tracking-[0.25em] text-gray-500">
                  HARI INI
                </p>

                <div className="space-y-2">
                  {todayHistory.length === 0 ? (
                    <div className="rounded-2xl border border-white/5 bg-[#111111] px-4 py-4 text-center text-xs text-gray-600">
                      Belum ada project hari ini.
                    </div>
                  ) : (
                    todayHistory.map((item) => (
                      <HistoryCard
                        key={item.id}
                        item={item}
                        onClick={() => onSelectHistory?.(item)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* PROJECT SEBELUMNYA */}

              <div className="mt-6">
                <p className="mb-3 px-1 text-[10px] font-bold tracking-[0.25em] text-gray-500">
                  PROJECT SEBELUMNYA
                </p>

                <div className="space-y-2">
                  {previousHistory.length === 0 ? (
                    <div className="px-1 text-xs text-gray-600">
                      Belum ada project sebelumnya.
                    </div>
                  ) : (
                    previousHistory.map((item) => (
                      <HistoryCard
                        key={item.id}
                        item={item}
                        onClick={() => onSelectHistory?.(item)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* UPGRADE CARD */}
          {/* ================================= */}

          <div className="border-t border-white/10 p-5">
            <div className="rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 to-transparent p-5">

              <div className="flex items-center gap-2">
                <Crown
                  size={15}
                  className="text-yellow-400"
                />

                <p className="text-xs font-bold text-yellow-400">
                  PRO PLAN
                </p>
              </div>

              <h2 className="mt-2 text-3xl font-black text-white">
                Rp99K
              </h2>

              <p className="mt-1 text-[11px] text-gray-500">
                / bulan
              </p>

              <div className="mt-4 space-y-2 text-xs text-gray-300">
                <p>✓ Semua AI Tools</p>
                <p>✓ Generate lebih banyak</p>
                <p>✓ Template premium</p>
                <p>✓ Prioritas bantuan</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/pricing")}
                className="mt-5 w-full rounded-2xl bg-yellow-400 py-3 text-xs font-bold text-black transition hover:bg-yellow-300 active:scale-[0.98]"
              >
                Upgrade Sekarang
              </button>

            </div>
          </div>
        </aside>

        {/* ================================= */}
        {/* MAIN CONTENT */}
        {/* ================================= */}

        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ================================= */
/* HISTORY CARD */
/* ================================= */

function HistoryCard({
  item,
  onClick,
}: {
  item: HistoryItem;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl border border-white/10 bg-[#151515] p-3 text-left transition hover:border-yellow-400/40 hover:bg-[#1b1b1b]"
    >
      <p className="line-clamp-2 text-xs font-bold leading-5 text-white">
        {item.tool}
      </p>

      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">
        {getHistoryPreview(item)}
      </p>

      <p className="mt-1 text-[10px] text-gray-600">
        {formatHistoryDate(item.createdAt)}
      </p>
    </button>
  );
}

/* ================================= */
/* HISTORY PREVIEW */
/* ================================= */

function getHistoryPreview(item: HistoryItem) {
  if (!item.prompt) {
    return "Project AI";
  }

  return item.prompt.length > 55
    ? `${item.prompt.slice(0, 55)}...`
    : item.prompt;
}

/* ================================= */
/* CHECK TODAY */
/* ================================= */

function isToday(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/* ================================= */
/* DATE FORMAT */
/* ================================= */

function formatHistoryDate(dateString: string) {
  const date = new Date(dateString);

  if (isToday(dateString)) {
    return "Hari ini";
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Kemarin";
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}