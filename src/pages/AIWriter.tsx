import { useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
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
    <DashboardLayout
      title="Writer Studio"
      subtitle="Buat caption, landing page, email marketing, artikel SEO, copywriting, dan script reels menggunakan AI."
    >
      <div className="space-y-8">

        <UserMenu />

        <WriterTools
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />

        <GeneratorForm
          title={tool.title}
          fields={tool.fields}
          buttonText={tool.buttonText}
          prompt={tool.prompt}
          systemPrompt={tool.systemPrompt}
        />

      </div>
    </DashboardLayout>
  );
}