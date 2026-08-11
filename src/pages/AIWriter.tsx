import { useMemo, useState } from "react";

import AIWriterLayout from "../components/aiwriter/AIWriterLayout";
import WriterTools from "../components/aiwriter/tools/WriterTools";
import GeneratorForm from "../components/generator/GeneratorForm";
import UserMenu from "../components/UserMenu";

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
    <AIWriterLayout
      tool="writer"
      onNewProject={() => {
        setSelectedTool("caption");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <div className="min-h-screen w-full bg-[#080808] text-white">

        {/* HEADER */}
        <div className="border-b border-white/10 px-6 py-6 lg:px-8">
          <div className="flex items-start justify-between gap-6">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-yellow-400">
                RIFE DIGITAL AI
              </p>

              <h1 className="mt-2 text-3xl font-black text-white lg:text-4xl">
                Writer Studio
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Buat caption, landing page, email marketing, artikel SEO,
                copywriting, dan script reels menggunakan AI.
              </p>
            </div>

            <UserMenu />

          </div>
        </div>

        {/* CONTENT */}
        <div className="px-4 py-6 lg:px-8 lg:py-8">

          <div className="mx-auto w-full max-w-[1250px] space-y-8">

            {/* WRITER TOOLS */}
            <WriterTools
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
            />

            {/* GENERATOR */}
            <GeneratorForm
              title={tool.title}
              fields={tool.fields}
              buttonText={tool.buttonText}
              prompt={tool.prompt}
              systemPrompt={tool.systemPrompt}
            />

          </div>

        </div>

      </div>
    </AIWriterLayout>
  );
}