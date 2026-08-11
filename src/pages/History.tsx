import { useEffect, useState } from "react";
import {
  Clock3,
  Copy,
  History as HistoryIcon,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import {
  clearHistory,
  deleteHistory,
  getHistory,
  type HistoryItem,
} from "../lib/history";

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadHistory() {
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
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadHistory();

    function handleHistoryUpdated() {
      void loadHistory();
    }

    window.addEventListener("rife-history-updated", handleHistoryUpdated);

    return () => {
      mounted = false;
      window.removeEventListener("rife-history-updated", handleHistoryUpdated);
    };
  }, []);

  const filteredHistory = history.filter((item) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      item.tool.toLowerCase().includes(query) ||
      item.prompt.toLowerCase().includes(query) ||
      item.result.toLowerCase().includes(query)
    );
  });

  function handleDeleteAll() {
    const confirmed = window.confirm(
      "Yakin ingin menghapus semua riwayat generate?"
    );

    if (!confirmed) return;

    void clearHistory();
    setHistory([]);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus riwayat ini?"
    );

    if (!confirmed) return;

    void deleteHistory(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleCopy(result: string) {
    try {
      await navigator.clipboard.writeText(result);
      alert("Hasil AI berhasil disalin.");
    } catch (error) {
      console.error("COPY HISTORY ERROR:", error);
      alert("Gagal menyalin hasil AI.");
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-6xl min-w-0 space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.11] via-[#111111] to-[#090909] p-6 sm:p-8 lg:p-10">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="relative flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                <HistoryIcon size={13} />
                Workspace History
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Semua Hasilmu, Tersimpan.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Tidak perlu membuat ulang dari awal. Temukan kembali hasil AI
                yang pernah kamu buat dan gunakan kapan saja.
              </p>
            </div>

            <div className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-black">
                <Sparkles size={17} />
              </div>

              <div>
                <p className="text-xl font-black text-white">
                  {history.length}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Hasil tersimpan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH + ACTION */}
        <section className="rounded-[26px] border border-white/10 bg-[#111111] p-4 sm:p-5">
          <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari hasil, tools, atau prompt..."
                className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#181818] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/40 focus:ring-2 focus:ring-yellow-400/10"
              />
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteAll}
                className="flex shrink-0 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-5 py-3.5 text-sm font-bold text-red-400 transition hover:bg-red-500/15"
              >
                <Trash2 size={16} />
                Hapus Semua
              </button>
            )}
          </div>

          {search && (
            <p className="mt-3 px-1 text-xs text-gray-600">
              Menampilkan {filteredHistory.length} dari {history.length} hasil.
            </p>
          )}
        </section>

        {/* LOADING STATE */}
        {loading && (
          <section className="rounded-[28px] border border-white/10 bg-[#111111] p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />
            <p className="mt-4 text-sm text-gray-500">
              Memuat history kamu...
            </p>
          </section>
        )}

        {/* EMPTY STATE */}
        {!loading && history.length === 0 && (
          <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[#111111] p-8 sm:p-12">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                <HistoryIcon size={34} />
              </div>

              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400">
                Workspace Masih Kosong
              </p>

              <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                Belum ada hasil AI.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
                Saat kamu berhasil membuat sesuatu menggunakan AI, hasilnya
                akan otomatis muncul di sini supaya mudah ditemukan kembali.
              </p>
            </div>
          </section>
        )}

        {/* NO SEARCH RESULT */}
        {!loading && history.length > 0 && filteredHistory.length === 0 && (
          <section className="rounded-[28px] border border-white/10 bg-[#111111] p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-xl">
              🔎
            </div>

            <h2 className="mt-4 text-lg font-black text-white">
              Hasil tidak ditemukan
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Coba gunakan kata kunci lain untuk mencari history kamu.
            </p>
          </section>
        )}

        {/* HISTORY LIST */}
        {!loading && filteredHistory.length > 0 && (
          <div className="space-y-5">
            {filteredHistory.map((item, index) => (
              <HistoryCard
                key={item.id}
                item={item}
                index={index}
                onDelete={handleDelete}
                onCopy={handleCopy}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function HistoryCard({
  item,
  index,
  onDelete,
  onCopy,
  formatDate,
}: {
  item: {
    id: string;
    tool: string;
    prompt: string;
    result: string;
    createdAt: string;
  };
  index: number;
  onDelete: (id: string) => void;
  onCopy: (result: string) => void;
  formatDate: (date: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);

  const resultPreview =
    item.result.length > 420
      ? `${item.result.slice(0, 420)}...`
      : item.result;

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] transition hover:border-yellow-400/20">
      {/* CARD HEADER */}
      <div className="flex min-w-0 flex-col gap-4 border-b border-white/10 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
            <Sparkles size={18} />
          </div>

          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="truncate text-base font-black text-white sm:text-lg">
                {item.tool}
              </h2>

              {index === 0 && (
                <span className="shrink-0 rounded-full border border-green-400/20 bg-green-400/10 px-2 py-1 text-[9px] font-black uppercase text-green-400">
                  Terbaru
                </span>
              )}
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-600">
              <Clock3 size={12} />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onCopy(item.result)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-bold text-gray-300 transition hover:border-yellow-400/30 hover:text-yellow-400 sm:flex-none"
          >
            <Copy size={14} />
            Salin
          </button>

          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-bold text-gray-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 sm:flex-none"
          >
            <Trash2 size={14} />
            Hapus
          </button>
        </div>
      </div>

      <div className="min-w-0 p-5 sm:p-6">
        {/* PROMPT */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
              Yang Kamu Minta
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#181818] p-4 sm:p-5">
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-400">
              {item.prompt || "Prompt tidak tersimpan untuk hasil ini."}
            </p>
          </div>
        </div>

        {/* RESULT */}
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
              Hasil AI
            </p>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 sm:p-5">
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-gray-300">
              {expanded ? item.result : resultPreview}
            </pre>

            {item.result.length > 420 && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-5 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-2.5 text-xs font-bold text-yellow-400 transition hover:bg-yellow-400/10"
              >
                {expanded ? "Tutup hasil" : "Lihat hasil lengkap"}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}