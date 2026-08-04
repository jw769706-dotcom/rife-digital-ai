import { saveHistory } from "../../lib/history";

type Props = {
  result: string;
};

export default function GeneratorResult({
  result,
}: Props) {
  if (!result) return null;

  function handleCopy() {
    navigator.clipboard.writeText(result);

    saveHistory({
      id: crypto.randomUUID(),
      tool: "AI Writer",
      prompt: "",
      result,
      createdAt: new Date().toISOString(),
    });

    alert("Berhasil disalin & disimpan ke History.");
  }

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-[#171717] p-8">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-black text-white">
          Hasil AI
        </h2>

        <button
          onClick={handleCopy}
          className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black"
        >
          Copy
        </button>

      </div>

      <pre className="whitespace-pre-wrap font-sans leading-8 text-gray-300">
        {result}
      </pre>

    </div>
  );
}