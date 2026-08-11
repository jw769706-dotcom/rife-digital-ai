import { useEffect, useState } from "react";
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
    <div>
      {/* Logo */}
      <div>
        <h1 className="text-4xl font-black leading-none">
          <span className="text-white">Rife</span>
          <span className="text-yellow-400">Digital</span>

          <br />

          <span className="text-yellow-400">AI</span>
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Premium AI Workspace
        </p>
      </div>

      {/* New Product */}
      <button
        type="button"
        className="mt-10 w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black transition hover:bg-yellow-300"
      >
        + Produk Baru
      </button>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari project..."
        className="mt-6 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
      />

      {/* Hari Ini */}
      <div className="mt-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Hari Ini
        </p>

        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-gray-500">
              Memuat project...
            </p>
          ) : todayProjects.length === 0 ? (
            <p className="text-sm text-gray-600">
              Belum ada project hari ini.
            </p>
          ) : (
            todayProjects.map((project) => (
              <button
                type="button"
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="block w-full rounded-2xl border border-white/10 bg-[#171717] p-4 text-left transition hover:border-yellow-400 hover:bg-[#1d1d1d]"
              >
                <h3 className="font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(project.created_at)}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Project Sebelumnya */}
      <div className="mt-10">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
          Project Sebelumnya
        </p>

        <div className="space-y-3">
          {!loading && olderProjects.length === 0 ? (
            <p className="text-sm text-gray-600">
              Belum ada project sebelumnya.
            </p>
          ) : (
            olderProjects.map((project) => (
              <button
                type="button"
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="block w-full rounded-2xl border border-white/10 bg-[#171717] p-4 text-left transition hover:border-yellow-400 hover:bg-[#1d1d1d]"
              >
                <h3 className="font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(project.created_at)}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Upgrade */}
      <div className="mt-10 rounded-3xl border border-yellow-400/20 bg-[#171717] p-5">
        <p className="text-sm font-bold text-yellow-400">
          ⭐ Growth Plan
        </p>

        <h2 className="mt-2 text-4xl font-black text-white">
          Rp49K
          <span className="text-lg font-medium text-gray-400">
            /bulan
          </span>
        </h2>

        <p className="mt-2 text-xs text-gray-400">
          Mulai dari Rp49.000 per bulan
        </p>

        <ul className="mt-5 space-y-2 text-sm text-gray-300">
          <li>✓ Unlimited Generate</li>
          <li>✓ Semua AI Tools</li>
          <li>✓ Template Premium</li>
          <li>✓ Priority Support</li>
        </ul>

        <button
          type="button"
          className="mt-6 w-full rounded-2xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-300"
        >
          Upgrade Sekarang
        </button>
      </div>
    </div>
  );
}