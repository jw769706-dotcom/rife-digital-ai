import { useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import WriterTools from "../components/aiwriter/tools/WriterTools";
import GeneratorForm from "../components/generator/GeneratorForm";

import { writerTools } from "../config/writerTools";

export default function AIWriter() {
  const [selectedTool, setSelectedTool] = useState("caption");

  const tool = useMemo(() => {
    return (
      writerTools.find((item) => item.id === selectedTool) ??
      writerTools[0]
    );
  }, [selectedTool]);

  return (
    <DashboardLayout
      title="Writer Studio"
      subtitle="Buat konten, copywriting, dan kebutuhan bisnis dengan bantuan AI."
    >
      <div className="w-full min-w-0 overflow-x-hidden">

        {/* HEADER */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-400/[0.08] via-[#111111] to-[#0b0b0b] p-6 sm:p-8">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/[0.08] blur-[90px]" />

          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/10">
                <span className="text-sm">✍️</span>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-400">
                Rife Digital AI
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Tulis Apa Pun.
              <br />

              <span className="text-yellow-400">
                AI yang Bantu.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Nggak perlu bingung mulai dari mana. Pilih apa yang ingin kamu
              buat, isi beberapa informasi sederhana, lalu biarkan Rife
              membantu menyusunnya untukmu.
            </p>

            {/* Mini benefit */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold text-gray-400">
                ✨ Tanpa Prompt Rumit
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold text-gray-400">
                ⚡ Generate Cepat
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold text-gray-400">
                🎯 Cocok untuk Pemula
              </div>
            </div>
          </div>
        </section>

        {/* TOOL SELECTOR */}
        <section className="w-full min-w-0">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-600">
              Pilih Kebutuhanmu
            </p>

            <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
              Mau bikin apa hari ini?
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              Pilih salah satu tools di bawah. Kamu tidak perlu tahu cara
              membuat prompt.
            </p>
          </div>

          <WriterTools
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />
        </section>

        {/* GENERATOR */}
        <section className="mt-8 w-full min-w-0 sm:mt-10">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-600">
              AI Generator
            </p>

            <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
              Siap dibuat dengan AI
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              Isi informasi yang kamu punya. Rife akan membantu mengerjakan
              sisanya.
            </p>
          </div>

          <GeneratorForm
            title={tool.title}
            fields={tool.fields}
            buttonText={tool.buttonText}
            prompt={tool.prompt}
            systemPrompt={tool.systemPrompt}
          />
        </section>

        {/* BOTTOM TIP */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.04] p-4 sm:mt-10">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10">
            💡
          </div>

          <div>
            <p className="text-xs font-bold text-yellow-400">
              Tips untuk pemula
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Jangan terlalu memikirkan kata-kata yang sempurna. Tulis saja
              informasi yang kamu tahu dengan bahasa sehari-hari. Rife akan
              membantu menyusunnya menjadi hasil yang lebih siap digunakan.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}