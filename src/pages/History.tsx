import DashboardLayout from "../components/layout/DashboardLayout";
import {
  clearHistory,
  deleteHistory,
  getHistory,
} from "../lib/history";

export default function History() {
  const history = getHistory();

  function handleDeleteAll() {
    const confirmed = window.confirm(
      "Yakin ingin menghapus semua riwayat generate?"
    );

    if (!confirmed) {
      return;
    }

    clearHistory();
    window.location.reload();
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus riwayat ini?"
    );

    if (!confirmed) {
      return;
    }

    deleteHistory(id);
    window.location.reload();
  }

  return (
    <DashboardLayout
      title="History"
      subtitle="Semua hasil AI yang pernah kamu generate."
    >
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111111] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">
              Riwayat Generate
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {history.length} hasil AI tersimpan
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="rounded-2xl bg-red-500/10 px-5 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {history.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 text-3xl">
              ✨
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              Belum ada history
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Setiap kali kamu menggunakan AI Tool dan berhasil
              melakukan generate, hasilnya akan otomatis muncul di
              halaman ini.
            </p>
          </div>
        )}

        {/* HISTORY LIST */}
        {history.length > 0 && (
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]"
              >
                {/* CARD HEADER */}
                <div className="flex flex-col gap-3 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-lg">
                      ✨
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        {item.tool}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString(
                          "id-ID",
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="self-start rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 md:self-auto"
                  >
                    Hapus
                  </button>
                </div>

                {/* PROMPT */}
                <div className="border-b border-white/10 p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-yellow-400">
                    Prompt
                  </p>

                  <div className="rounded-2xl bg-[#181818] p-5">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                      {item.prompt || "Tidak ada prompt tersimpan."}
                    </p>
                  </div>
                </div>

                {/* RESULT */}
                <div className="p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-green-400">
                    Hasil AI
                  </p>

                  <div className="rounded-2xl bg-[#181818] p-5">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">
                      {item.result}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}