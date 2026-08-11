import { useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";

interface TopbarProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export default function Topbar({
  title,
  subtitle,
  onMenuClick,
}: TopbarProps) {
  const location = useLocation();

  const pageInfo: Record<
    string,
    {
      title: string;
      subtitle: string;
    }
  > = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Selamat datang kembali 👋",
    },

    "/writer": {
      title: "Writer Studio",
      subtitle: "Buat konten dan copywriting dengan bantuan AI.",
    },

    "/product": {
      title: "Product Studio",
      subtitle: "Bangun produk digital dengan bantuan AI.",
    },

    "/marketing": {
      title: "Marketing Studio",
      subtitle: "Buat strategi marketing dengan bantuan AI.",
    },

    "/content": {
      title: "Content Studio",
      subtitle: "Buat konten menarik dengan bantuan AI.",
    },

    "/pricing": {
      title: "Upgrade",
      subtitle: "Pilih paket yang sesuai dengan kebutuhanmu.",
    },

    "/settings": {
      title: "Settings",
      subtitle: "Kelola akun dan pengaturan Rife Digital AI.",
    },

    "/history": {
      title: "History",
      subtitle: "Lihat semua hasil AI yang pernah dibuat.",
    },
  };

  const currentPage = pageInfo[location.pathname] ?? {
    title: title ?? "Rife Digital AI",
    subtitle: subtitle ?? "Build your digital business with AI.",
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8 xl:px-10">

        {/* =====================================================
            LEFT
        ====================================================== */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">

          {/* MOBILE MENU */}
          <button
            type="button"
            aria-label="Buka menu"
            onClick={onMenuClick}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gray-300 transition-all duration-200 hover:border-yellow-400/20 hover:bg-yellow-400/[0.05] hover:text-yellow-400 active:scale-95 lg:hidden"
          >
            <Menu size={18} strokeWidth={2} />
          </button>


          {/* PAGE INFO */}
          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h1 className="truncate text-lg font-black tracking-tight text-white sm:text-xl lg:text-2xl">
                {currentPage.title}
              </h1>

              {/* SMALL GOLD DOT */}
              <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)] sm:block" />

            </div>

            <p className="mt-0.5 max-w-[230px] truncate text-[10px] leading-5 text-gray-600 sm:max-w-md sm:text-xs">
              {currentPage.subtitle}
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT
        ====================================================== */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* AI STATUS */}
          <div className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 sm:flex">

            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />

            <span className="text-[10px] font-semibold text-gray-500">
              AI Online
            </span>

          </div>


          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label="Notifikasi"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-gray-400 transition-all duration-200 hover:border-yellow-400/20 hover:bg-yellow-400/[0.05] hover:text-yellow-400 active:scale-95 sm:h-10 sm:w-10"
          >
            <Bell size={17} strokeWidth={1.9} />

            {/* NOTIFICATION DOT */}
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_7px_rgba(250,204,21,0.8)]" />
          </button>


          {/* DIVIDER */}
          <div className="hidden h-7 w-px bg-white/[0.07] sm:block" />


          {/* USER */}
          <button
            type="button"
            aria-label="Akun pengguna"
            className="group flex items-center gap-2"
          >

            {/* AVATAR */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400/20 bg-gradient-to-br from-yellow-300 to-yellow-500 text-xs font-black text-black shadow-[0_0_20px_rgba(250,204,21,0.08)] transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10">
              R
            </div>


            {/* USER INFO */}
            <div className="hidden text-left lg:block">

              <p className="max-w-[110px] truncate text-xs font-bold text-white">
                Rifqi
              </p>

              <p className="mt-0.5 text-[9px] text-gray-600">
                Free Account
              </p>

            </div>

          </button>

        </div>

      </div>
    </header>
  );
}