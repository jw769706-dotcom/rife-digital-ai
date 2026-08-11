import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Sparkles,
} from "lucide-react";

import { saveHistory } from "../../lib/history";


type Props = {
  result: string;
};


export default function GeneratorResult({
  result,
}: Props) {
  const [copied, setCopied] = useState(false);


  if (!result) return null;


  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result);

      saveHistory({
        id: crypto.randomUUID(),
        tool: "AI Writer",
        prompt: "",
        result,
        createdAt: new Date().toISOString(),
      });

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("COPY ERROR:", error);
    }
  }


  function handleDownload() {
    const blob = new Blob([result], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "hasil-rife-ai.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }


  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-[0_20px_70px_rgba(0,0,0,.25)]">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="border-b border-white/10 bg-[#111111] px-5 py-5 sm:px-6 sm:py-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* TITLE */}

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-lg shadow-yellow-400/10">
              <Sparkles
                size={19}
                strokeWidth={2.5}
              />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">
                  Hasil AI
                </h2>

                <span className="flex items-center gap-1 rounded-full border border-green-400/10 bg-green-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-green-400">

                  <CheckCircle2 size={11} />

                  Selesai

                </span>

              </div>

              <p className="mt-1 text-xs text-gray-500">
                Hasil sudah siap digunakan dan bisa kamu edit sesuai kebutuhan.
              </p>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="flex shrink-0 items-center gap-2">

            {/* DOWNLOAD */}

            <button
              type="button"
              onClick={handleDownload}
              title="Download hasil"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-gray-400
                transition
                hover:border-yellow-400/30
                hover:bg-yellow-400/[0.05]
                hover:text-yellow-400
              "
            >
              <Download size={16} />
            </button>


            {/* COPY */}

            <button
              type="button"
              onClick={handleCopy}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-yellow-400
                px-4
                py-2.5
                text-xs
                font-black
                text-black
                shadow-lg
                shadow-yellow-400/10
                transition
                hover:bg-yellow-300
                active:scale-[0.98]
                sm:px-5
              "
            >

              {copied ? (
                <>
                  <Check size={15} />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}

            </button>

          </div>

        </div>

      </div>


      {/* ==============================
          RESULT BODY
      ============================== */}

      <div className="p-4 sm:p-6">

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">

          {/* RESULT LABEL */}

          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 sm:px-5">

            <div className="flex items-center gap-2">

              <FileText
                size={14}
                className="text-yellow-400"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                AI Generated Content
              </span>

            </div>

            <span className="text-[10px] text-gray-600">
              Rife Digital AI
            </span>

          </div>


          {/* CONTENT */}

          <div className="max-h-[700px] overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">

            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-8 text-gray-300 sm:text-[15px] sm:leading-8">
              {result}
            </pre>

          </div>

        </div>


        {/* ==============================
            HELPER
        ============================== */}

        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.04] px-4 py-3.5">

          <Sparkles
            size={15}
            className="mt-0.5 shrink-0 text-yellow-400"
          />

          <p className="text-[11px] leading-5 text-gray-500 sm:text-xs">

            <span className="font-semibold text-gray-300">
              Tips:
            </span>{" "}
            Periksa dan sesuaikan hasil AI sebelum digunakan.
            Kamu bisa langsung menyalinnya atau mengunduhnya sebagai file.

          </p>

        </div>

      </div>


      {/* ==============================
          FOOTER
      ============================== */}

      <div className="border-t border-white/5 px-5 py-3 sm:px-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />

            <span className="text-[10px] text-gray-600">
              Hasil berhasil dibuat
            </span>

          </div>

          <span className="text-[10px] font-medium text-gray-600">
            AI Writer
          </span>

        </div>

      </div>

    </div>
  );
}