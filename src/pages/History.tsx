import DashboardLayout from "../components/layout/DashboardLayout";
import { clearHistory, getHistory } from "../lib/history";

export default function History() {
  const history = getHistory();

  return (
    <DashboardLayout
      title="History"
      subtitle="Semua hasil AI yang pernah kamu generate."
    >
      <div className="space-y-6">

        <div className="flex justify-end">

          <button
            onClick={() => {
              clearHistory();
              window.location.reload();
            }}
            className="rounded-2xl bg-red-500 px-5 py-3 font-bold text-white"
          >
            Hapus Semua
          </button>

        </div>

        {history.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#171717] p-10 text-center text-gray-400">
            Belum ada history.
          </div>
        )}

        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-white/10 bg-[#171717] p-8"
          >
            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-white">
                {item.tool}
              </h2>

              <span className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </span>

            </div>

            <pre className="mt-6 whitespace-pre-wrap font-sans leading-8 text-gray-300">
              {item.result}
            </pre>

          </div>
        ))}

      </div>
    </DashboardLayout>
  );
}