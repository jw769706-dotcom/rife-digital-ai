import {
  PenSquare,
  FileText,
  Megaphone,
  Mail,
  Sparkles,
  ScrollText,
} from "lucide-react";

const tools = [
  {
    icon: PenSquare,
    name: "Caption Instagram",
  },
  {
    icon: Megaphone,
    name: "Copywriting",
  },
  {
    icon: FileText,
    name: "Landing Page",
  },
  {
    icon: Mail,
    name: "Email Marketing",
  },
  {
    icon: ScrollText,
    name: "Artikel SEO",
  },
  {
    icon: Sparkles,
    name: "Script Reels",
  },
];

export default function ChatHeader() {
  return (
    <header className="border-b border-white/10 bg-[#0D0D0D]">

      <div className="px-8 py-8">

        <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
          AI WRITER
        </p>

        <h1 className="mt-3 text-5xl font-black text-white leading-tight">
          Buat Konten yang Menjual
          <br />
          dalam Hitungan Detik.
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
          Gunakan AI untuk membuat caption Instagram, landing page,
          copywriting, email marketing, artikel SEO,
          script reels, dan berbagai konten promosi
          tanpa harus memikirkan prompt yang rumit.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.name}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-sm font-semibold text-white transition hover:border-yellow-400 hover:bg-[#1D1D1D]"
              >
                <Icon size={18} />

                {tool.name}
              </button>
            );
          })}

        </div>

      </div>

    </header>
  );
}