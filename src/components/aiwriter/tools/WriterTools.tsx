import {
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import { writerTools } from "../../../config/writerTools";

type Props = {
  selectedTool: string;
  setSelectedTool: React.Dispatch<React.SetStateAction<string>>;
};

export default function WriterTools({
  selectedTool,
  setSelectedTool,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {writerTools.map((tool, index) => {
        const isSelected = selectedTool === tool.id;

        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => setSelectedTool(tool.id)}
            className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:rounded-3xl sm:p-6 ${
              isSelected
                ? "border-yellow-400/50 bg-gradient-to-br from-yellow-400/[0.10] via-[#151515] to-[#101010] shadow-[0_12px_40px_rgba(234,179,8,.08)]"
                : "border-white/10 bg-[#111111] hover:border-white/20 hover:bg-[#141414]"
            }`}
          >
            {/* ACTIVE GLOW */}
            {isSelected && (
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl" />
            )}

            {/* TOP ROW */}
            <div className="relative flex items-start justify-between gap-3">
              {/* ICON */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-all duration-300 sm:h-12 sm:w-12 ${
                  isSelected
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                    : "bg-white/[0.05] text-white group-hover:bg-white/[0.08]"
                }`}
              >
                {tool.icon}
              </div>

              {/* ACTIVE BADGE */}
              {isSelected ? (
                <div className="flex items-center gap-1 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-yellow-400">
                  <Check size={10} strokeWidth={3} />
                  Dipilih
                </div>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 transition group-hover:text-yellow-400">
                  <ArrowUpRight size={16} />
                </div>
              )}
            </div>

            {/* TOOL NUMBER */}
            <div className="relative mt-5 flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Tool {String(index + 1).padStart(2, "0")}
              </span>

              {index === 0 && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-700" />

                  <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-yellow-400">
                    <Sparkles size={10} />
                    Populer
                  </span>
                </>
              )}
            </div>

            {/* TITLE */}
            <h3
              className={`relative mt-2 text-lg font-black leading-snug tracking-tight transition sm:text-xl ${
                isSelected
                  ? "text-white"
                  : "text-white group-hover:text-yellow-50"
              }`}
            >
              {tool.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="relative mt-2 text-xs leading-6 text-gray-500 sm:text-sm sm:leading-6">
              {tool.description}
            </p>

            {/* BOTTOM ACTION */}
            <div className="relative mt-5 flex items-center justify-between border-t border-white/5 pt-4">
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.14em] transition ${
                  isSelected
                    ? "text-yellow-400"
                    : "text-gray-600 group-hover:text-gray-400"
                }`}
              >
                {isSelected ? "Siap digunakan" : "Pilih tool"}
              </span>

              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                  isSelected
                    ? "bg-yellow-400 text-black"
                    : "bg-white/[0.04] text-gray-600 group-hover:bg-yellow-400/10 group-hover:text-yellow-400"
                }`}
              >
                <ArrowUpRight size={14} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}