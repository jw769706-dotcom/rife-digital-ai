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
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {writerTools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setSelectedTool(tool.id)}
          className={`rounded-3xl border p-6 text-left transition ${
            selectedTool === tool.id
              ? "border-yellow-400 bg-[#1A1A1A]"
              : "border-white/10 bg-[#111111] hover:border-yellow-400"
          }`}
        >
          <div className="text-4xl">
            {tool.icon}
          </div>

          <h3 className="mt-4 text-xl font-bold text-white">
            {tool.title}
          </h3>

          <p className="mt-2 text-gray-400">
            {tool.description}
          </p>
        </button>
      ))}
    </div>
  );
}