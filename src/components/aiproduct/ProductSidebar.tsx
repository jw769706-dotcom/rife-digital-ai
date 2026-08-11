import { useEffect, useState } from "react";
import { FolderOpen, Plus, Search, Sparkles, Clock3, ArrowRight } from "lucide-react";

import { supabase } from "../../lib/supabase";

type Project = {
  id: string;
  title: string;
  created_at: string;
};

type ProductSidebarProps = {
  onSelectProject: (projectId: string) => void;
};

export default function ProductSidebar({
  onSelectProject,
}: ProductSidebarProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProjects([]);
        return;
      }

      const { data, error } = await supabase
        .from("ai_projects")
        .select("id, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Gagal mengambil project:", error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("PROJECT SIDEBAR ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date: string) {
    const projectDate = new Date(date);
    const now = new Date();

    const sameDay =
      projectDate.getDate() === now.getDate() &&
      projectDate.getMonth() === now.getMonth() &&
      projectDate.getFullYear() === now.getFullYear();

    if (sameDay) {
      return "Hari ini";
    }

    return projectDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const todayProjects = filteredProjects.filter((project) => {
    const date = new Date(project.created_at);
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const olderProjects = filteredProjects.filter((project) => {
    const date = new Date(project.created_at);
    const now = new Date();

    return !(
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="w-full min-w-0">
      {/* BRAND / INTRO */}
      <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-lg shadow-yellow-400/10">
            <Sparkles size={19} strokeWidth={2.5} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">
              Product Workspace
            </p>
            <p className="mt-0.5 truncate text-[11px] text-gray-500">
              Tempat menyimpan ide produkmu
            </p>
          </div>
        </div>
      </div>

      {/* NEW PRODUCT */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-4 py-3.5 text-sm font-black text-black shadow-lg shadow-yellow-400/10 transition hover:-translate-y-0.5 hover:bg-yellow-300"
      >
        <Plus size={18} strokeWidth={2.8} />
        Buat Produk Baru
      </button>

      {/* SEARCH */}
      <div className="relative mt-4">
        <Search
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk..."
          className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#111111] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/40 focus:ring-2 focus:ring-yellow-400/10"
        />
      </div>

      {/* PROJECTS */}
      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <FolderOpen size={15} className="shrink-0 text-yellow-400" />
            <p className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Produk Saya
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-[10px] font-bold text-gray-500">
            {filteredProjects.length}
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-xl bg-white/5" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-2.5 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="h-2 w-1/2 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0d0d0d] px-4 py-7 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-xl">
              📦
            </div>

            <p className="mt-3 text-sm font-bold text-white">
              {search ? "Produk tidak ditemukan" : "Belum ada produk"}
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              {search
                ? "Coba gunakan kata kunci lain."
                : "Produk yang kamu buat akan tersimpan di sini."}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* TODAY */}
            {todayProjects.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2 px-1">
                  <Clock3 size={12} className="text-yellow-400" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                    Hari ini
                  </p>
                </div>

                <div className="space-y-2">
                  {todayProjects.map((project) => (
                    <button
                      type="button"
                      key={project.id}
                      onClick={() => onSelectProject(project.id)}
                      className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.05] p-3.5 text-left transition hover:border-yellow-400/35 hover:bg-yellow-400/[0.08]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-sm text-black">
                        📦
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">
                          {project.title}
                        </p>
                        <p className="mt-1 text-[10px] text-yellow-400/70">
                          {formatDate(project.created_at)}
                        </p>
                      </div>

                      <ArrowRight
                        size={15}
                        className="shrink-0 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-yellow-400"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OLDER */}
            {olderProjects.length > 0 && (
              <div>
                <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  Sebelumnya
                </p>

                <div className="space-y-2">
                  {olderProjects.map((project) => (
                    <button
                      type="button"
                      key={project.id}
                      onClick={() => onSelectProject(project.id)}
                      className="group flex w-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#111111] p-3.5 text-left transition hover:border-yellow-400/25 hover:bg-[#171717]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm">
                        📄
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-200 group-hover:text-white">
                          {project.title}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-600">
                          {formatDate(project.created_at)}
                        </p>
                      </div>

                      <ArrowRight
                        size={14}
                        className="shrink-0 text-gray-700 transition group-hover:text-yellow-400"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MINI HELP */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#111111] p-4">
        <div className="flex items-start gap-3">
          <span className="text-base">💡</span>

          <div className="min-w-0">
            <p className="text-xs font-bold text-white">
              Tips untuk pemula
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-600">
              Tidak perlu membuat produk sempurna langsung. Mulai dari satu
              ide sederhana dan kembangkan sedikit demi sedikit.
            </p>
          </div>
        </div>
      </div>

      {/* PLAN */}
      <div className="mt-6 overflow-hidden rounded-[24px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.10] via-[#151515] to-[#0d0d0d] p-5">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-yellow-400" />

          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-yellow-400">
            BASIC PLAN
          </p>
        </div>

        <div className="mt-3 flex items-end gap-1">
          <h2 className="text-3xl font-black leading-none text-white">
            Rp49K
          </h2>

          <span className="mb-0.5 text-xs text-gray-500">/bulan</span>
        </div>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          Semua yang kamu butuhkan untuk mulai membuat dan mengembangkan
          produk digital.
        </p>

        <div className="mt-4 space-y-2">
          {[
            "Generate AI tanpa batas",
            "Semua AI Tools terbuka",
            "Buat produk digital",
            "Tutorial untuk pemula",
            "History hasil generate",
          ].map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-2 text-[11px] text-gray-300"
            >
              <span className="mt-0.5 text-yellow-400">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}