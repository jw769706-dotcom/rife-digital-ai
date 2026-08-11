import { useMemo, useState, type KeyboardEvent } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { generateText } from "../services/ai";
import {
  getHistory,
  saveHistory,
  type HistoryItem,
} from "../lib/history";

type MarketingTool = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type ChatMessage = {
  role: "user" | "ai";
  message: string;
};

const tools: MarketingTool[] = [
  {
    id: "facebook-ads",
    title: "Facebook Ads",
    description:
      "Buat konsep iklan Facebook yang menarik dan siap digunakan.",
    icon: "📣",
  },
  {
    id: "instagram-ads",
    title: "Instagram Ads",
    description:
      "Buat copy, hook, CTA, dan konsep iklan Instagram.",
    icon: "📸",
  },
  {
    id: "tiktok-ads",
    title: "TikTok Ads",
    description:
      "Buat konsep video TikTok Ads yang menarik perhatian.",
    icon: "🎵",
  },
  {
    id: "cta",
    title: "CTA Generator",
    description:
      "Buat berbagai CTA yang mendorong calon pembeli bertindak.",
    icon: "🎯",
  },
  {
    id: "email",
    title: "Email Campaign",
    description:
      "Buat email marketing untuk promosi produk digital.",
    icon: "📧",
  },
  {
    id: "strategy",
    title: "Marketing Strategy",
    description:
      "Buat strategi marketing lengkap untuk produk digital.",
    icon: "📊",
  },
];

const toolPrompts: Record<string, string> = {
  "facebook-ads": `
Buatkan konsep Facebook Ads untuk produk digital.

Berikan:
1. Hook
2. Primary Text
3. Headline
4. Description
5. CTA
6. Ide visual iklan
7. Target audiens
8. Tips agar iklan lebih menarik
`,

  "instagram-ads": `
Buatkan konsep Instagram Ads untuk produk digital.

Berikan:
1. Hook
2. Caption
3. Headline
4. CTA
5. Ide visual
6. Target audiens
7. Hashtag yang relevan
8. Tips optimasi
`,

  "tiktok-ads": `
Buatkan konsep TikTok Ads untuk produk digital.

Berikan:
1. Hook 3 detik pertama
2. Script video
3. Text overlay
4. CTA
5. Ide visual
6. Target audiens
7. Caption
8. Tips agar video menarik
`,

  cta: `
Buatkan 15 CTA untuk menjual produk digital.

Bagi menjadi:
1. CTA soft selling
2. CTA hard selling
3. CTA urgency
4. CTA curiosity
5. CTA untuk pemula

Setiap CTA harus singkat dan siap digunakan.
`,

  email: `
Buatkan email campaign untuk menjual produk digital.

Berikan:
1. Subject email
2. Opening
3. Masalah calon pembeli
4. Solusi
5. Penjelasan produk
6. Benefit
7. CTA
8. Closing

Buat dengan bahasa yang persuasif tetapi tidak berlebihan.
`,

  strategy: `
Buatkan strategi marketing lengkap untuk produk digital.

Berikan:
1. Target market
2. Positioning
3. Unique selling proposition
4. Content strategy
5. Organic marketing strategy
6. Social media strategy
7. Funnel sederhana
8. CTA
9. Action plan 7 hari
10. Kesalahan yang harus dihindari
`,
};

const quickQuestions = [
  "Buat hasil ini lebih menarik",
  "Buat versi yang lebih singkat",
  "Buat versi yang lebih persuasif",
  "Bagaimana cara menggunakannya?",
];

const tutorials: Record<string, string[]> = {
  "facebook-ads": [
    "Tentukan produk dan target pasar yang paling spesifik.",
    "Gunakan Hook sebagai kalimat pertama yang langsung menarik perhatian.",
    "Masukkan Primary Text ke bagian utama copy iklan Facebook.",
    "Gunakan Headline dan CTA yang sesuai dengan tujuan iklan.",
    "Buat visual yang sederhana dan fokus pada satu masalah utama.",
    "Uji beberapa versi Hook, copy, visual, dan CTA untuk melihat mana yang paling menarik.",
  ],

  "instagram-ads": [
    "Tentukan tujuan iklan Instagram terlebih dahulu, misalnya awareness, traffic, atau penjualan.",
    "Gunakan Hook yang kuat pada bagian awal konten.",
    "Gunakan Caption untuk menjelaskan masalah, solusi, dan manfaat produk.",
    "Pilih visual yang mudah dipahami dalam beberapa detik.",
    "Gunakan CTA yang jelas agar audiens tahu tindakan berikutnya.",
    "Uji beberapa variasi visual, Hook, Caption, dan CTA.",
  ],

  "tiktok-ads": [
    "Buka video dengan Hook kuat pada 1–3 detik pertama.",
    "Gunakan Script yang singkat dan langsung masuk ke masalah audiens.",
    "Tambahkan Text Overlay agar pesan tetap bisa dipahami tanpa suara.",
    "Tampilkan produk atau solusi secara natural.",
    "Tutup video dengan CTA yang jelas.",
    "Buat beberapa versi video dan evaluasi performanya.",
  ],

  cta: [
    "Pilih CTA berdasarkan tujuan konten.",
    "Gunakan Soft Selling untuk audiens yang masih tahap mengenal produk.",
    "Gunakan Hard Selling ketika audiens sudah memahami manfaat produk.",
    "Gunakan Urgency untuk mendorong tindakan lebih cepat tanpa membuat klaim palsu.",
    "Gunakan Curiosity untuk membuat audiens ingin mengetahui lebih lanjut.",
    "Tes beberapa CTA dan gunakan yang paling sesuai dengan karakter audiens.",
  ],

  email: [
    "Tentukan tujuan email terlebih dahulu.",
    "Buat Subject yang jelas dan menarik agar email ingin dibuka.",
    "Mulai dengan masalah yang memang dialami target pasar.",
    "Jelaskan solusi dan manfaat produk dengan bahasa sederhana.",
    "Gunakan CTA yang jelas dan mudah dilakukan.",
    "Tutup email dengan kalimat yang membangun kepercayaan.",
  ],

  strategy: [
    "Tentukan target market yang paling spesifik.",
    "Buat positioning agar produk memiliki pembeda yang jelas.",
    "Tentukan Unique Selling Proposition atau alasan mengapa orang memilih produk kamu.",
    "Gunakan Content Strategy untuk menarik dan mengedukasi audiens.",
    "Gabungkan strategi organik melalui Instagram, TikTok, atau platform lain yang relevan.",
    "Buat funnel sederhana dari konten → landing page → penawaran → pembelian.",
    "Jalankan Action Plan 7 Hari secara bertahap.",
    "Evaluasi hasil dan perbaiki strategi berdasarkan data.",
  ],
};

export default function AIMarketing() {
  const [selectedTool, setSelectedTool] =
    useState<MarketingTool | null>(null);

  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>(() =>
    getHistory()
  );

  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return history;
    }

    return history.filter((item) => {
      return (
        item.tool.toLowerCase().includes(keyword) ||
        item.prompt.toLowerCase().includes(keyword) ||
        item.result.toLowerCase().includes(keyword)
      );
    });
  }, [history, search]);

  /*
   * 3 HISTORY TERBARU
   * masuk ke bagian HARI INI.
   *
   * Sisanya masuk PROJECT SEBELUMNYA.
   */
  const todayHistory = useMemo(() => {
    return filteredHistory.slice(0, 3);
  }, [filteredHistory]);

  const previousHistory = useMemo(() => {
    return filteredHistory.slice(3);
  }, [filteredHistory]);

  function getToolByTitle(title: string) {
    return (
      tools.find(
        (tool) =>
          tool.title.toLowerCase() === title.toLowerCase()
      ) ?? null
    );
  }

  function handleSelectTool(tool: MarketingTool) {
    setSelectedTool(tool);

    setResult("");
    setError("");

    setChatInput("");
    setChatMessages([]);

    setProduct("");
    setTarget("");
    setAdditionalInfo("");
  }

  function handleCloseTool() {
    setSelectedTool(null);

    setResult("");
    setError("");

    setProduct("");
    setTarget("");
    setAdditionalInfo("");

    setChatInput("");
    setChatMessages([]);
  }

  function handleNewProject() {
    setSelectedTool(null);

    setResult("");
    setError("");

    setProduct("");
    setTarget("");
    setAdditionalInfo("");

    setChatInput("");
    setChatMessages([]);

    setSearch("");
  }

  function handleOpenHistory(item: HistoryItem) {
    const tool = getToolByTitle(item.tool);

    if (!tool) {
      return;
    }

    setSelectedTool(tool);

    setResult(item.result);

    setError("");

    setChatInput("");
    setChatMessages([]);

    setProduct("");
    setTarget("");
    setAdditionalInfo("");
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return "Hari ini";
    }

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async function handleGenerate() {
    if (!selectedTool) {
      return;
    }

    if (!product.trim()) {
      setError(
        "Masukkan nama atau deskripsi produk terlebih dahulu."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult("");

      setChatInput("");
      setChatMessages([]);

      const systemPrompt = `
Kamu adalah Rife AI Marketing Studio.

Kamu adalah ahli marketing digital yang membantu pengguna
memasarkan produk digital.

Gunakan bahasa Indonesia yang:
- sederhana
- jelas
- praktis
- persuasif
- cocok untuk pemula

Jangan memberikan janji keuntungan pasti.

Berikan hasil yang benar-benar bisa langsung digunakan pengguna.

Tool yang digunakan:
${selectedTool.title}

${toolPrompts[selectedTool.id]}

PENTING:
Jangan menjawab terlalu umum.

Sesuaikan semua hasil dengan produk dan target pasar yang
diberikan.

Gunakan format teks yang rapi.

Gunakan heading sederhana dan bullet point.

Jangan menggunakan JSON.

Jangan menambahkan kalimat seperti:
"Sebagai AI..."

Hasil harus siap digunakan oleh pengguna.
`;

      const userPrompt = `
Nama / Deskripsi Produk:
${product}

Target Pasar:
${
  target ||
  "Belum ditentukan. Tentukan target yang paling masuk akal."
}

Informasi tambahan:
${additionalInfo || "Tidak ada."}

Buat hasil untuk tool:
${selectedTool.title}
`;

      const response = await generateText({
        systemPrompt,
        userPrompt,
      });

      const generatedResult = response.trim();

      setResult(generatedResult);

      const historyItem: HistoryItem = {
        id: crypto.randomUUID(),
        tool: selectedTool.title,
        prompt: userPrompt,
        result: generatedResult,
        createdAt: new Date().toISOString(),
      };

      saveHistory(historyItem);

      setHistory(getHistory());
    } catch (err) {
      console.error("MARKETING AI ERROR:", err);

      setError(
        "Gagal menghasilkan hasil AI. Periksa koneksi AI lalu coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAskAI() {
    const question = chatInput.trim();

    if (
      !question ||
      !selectedTool ||
      !result ||
      chatLoading
    ) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      message: question,
    };

    setChatMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setChatInput("");
    setChatLoading(true);

    try {
      const systemPrompt = `
Kamu adalah Tanya AI di Rife Digital AI Marketing Studio.

Pengguna sedang menggunakan tool:
${selectedTool.title}

Produk yang sedang dipasarkan:
${product || "Tidak diketahui dari history."}

Target pasar:
${target || "Belum ditentukan"}

Informasi tambahan:
${additionalInfo || "Tidak ada"}

HASIL AI YANG SUDAH DIBUAT:
--------------------------------
${result}
--------------------------------

Tugas kamu adalah membantu pengguna memahami,
memperbaiki, mengembangkan, atau menggunakan hasil
AI tersebut.

ATURAN:
- Jawab dalam bahasa Indonesia.
- Jawab berdasarkan hasil AI di atas.
- Jangan mengarang informasi yang bertentangan dengan hasil.
- Berikan jawaban praktis.
- Gunakan bahasa yang mudah dipahami pemula.
- Jika pengguna meminta revisi, berikan versi revisinya.
- Jika pengguna meminta contoh, berikan contoh yang siap digunakan.
- Jika pengguna meminta beberapa pilihan, berikan beberapa pilihan.
- Jangan memberikan janji keuntungan pasti.
- Jangan terlalu panjang kecuali pengguna meminta detail.
- Jangan mengatakan "sebagai AI".
`;

      const response = await generateText({
        systemPrompt,
        userPrompt: question,
      });

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: response.trim(),
        },
      ]);
    } catch (err) {
      console.error("MARKETING CHAT ERROR:", err);

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message:
            "Maaf, Tanya AI sedang mengalami masalah. Silakan coba lagi.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleChatKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleAskAI();
    }
  }

  return (
    <DashboardLayout
      title="Marketing Studio"
      subtitle="Bangun strategi marketing dengan bantuan AI."
    >
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">

        {/* =====================================================
            HISTORY SIDEBAR
        ===================================================== */}

        <aside className="h-fit rounded-3xl border border-white/10 bg-[#111111] p-5 lg:sticky lg:top-6">

          <div>
            <h2 className="text-2xl font-black leading-none text-white">
              Rife<span className="text-yellow-400">Digital</span>
              <br />
              <span className="text-yellow-400">AI</span>
            </h2>

            <p className="mt-3 text-xs text-gray-500">
              Premium AI Marketing Workspace
            </p>
          </div>

          <button
            type="button"
            onClick={handleNewProject}
            className="mt-6 w-full rounded-2xl bg-yellow-500 px-4 py-3 font-bold text-black transition hover:bg-yellow-400"
          >
            + Produk Baru
          </button>

          <div className="mt-4">
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari project..."
              className="w-full rounded-2xl border border-white/10 bg-[#181818] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/50"
            />
          </div>

          {/* =================================================
              HARI INI
          ================================================= */}

          <div className="mt-7">

            <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">
              Hari Ini
            </p>

            <div className="space-y-2">

              {todayHistory.length === 0 && (
                <p className="px-1 text-xs text-gray-600">
                  Belum ada generate.
                </p>
              )}

              {todayHistory.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleOpenHistory(item)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#181818] p-4 text-left transition hover:border-yellow-500/40 hover:bg-[#1d1d1d]"
                >

                  <div className="flex items-start gap-2">

                    <span className="text-xs">
                      {getToolByTitle(item.tool)?.icon ??
                        "✨"}
                    </span>

                    <div className="min-w-0">

                      <p className="truncate text-xs font-bold text-white">
                        {item.tool}
                      </p>

                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">
                        {item.prompt
                          .replace(/\s+/g, " ")
                          .trim()}
                      </p>

                      <p className="mt-2 text-[10px] text-gray-600">
                        {formatDate(item.createdAt)}
                      </p>

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* =================================================
              PROJECT SEBELUMNYA
          ================================================= */}

          <div className="mt-7">

            <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500">
              Project Sebelumnya
            </p>

            <div className="space-y-2">

              {previousHistory.length === 0 && (
                <p className="px-1 text-xs text-gray-600">
                  Belum ada project sebelumnya.
                </p>
              )}

              {previousHistory.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleOpenHistory(item)
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#181818] p-4 text-left transition hover:border-yellow-500/40 hover:bg-[#1d1d1d]"
                >

                  <div className="flex items-start gap-2">

                    <span className="text-xs">
                      {getToolByTitle(item.tool)?.icon ??
                        "✨"}
                    </span>

                    <div className="min-w-0">

                      <p className="truncate text-xs font-bold text-white">
                        {item.tool}
                      </p>

                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">
                        {item.prompt
                          .replace(/\s+/g, " ")
                          .trim()}
                      </p>

                      <p className="mt-2 text-[10px] text-gray-600">
                        {formatDate(item.createdAt)}
                      </p>

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

        </aside>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="min-w-0">

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 lg:p-8">

            {/* HEADER */}

            <div className="mb-8">

              <h1 className="text-3xl font-black text-white lg:text-4xl">
                Marketing Studio
              </h1>

              <p className="mt-3 text-gray-400">
                Pilih tools marketing yang ingin digunakan.
              </p>

            </div>

            {/* =================================================
                TOOL SELECTION
            ================================================= */}

            {!selectedTool && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() =>
                      handleSelectTool(tool)
                    }
                    className="group rounded-2xl border border-white/10 bg-[#171717] p-6 text-left transition hover:-translate-y-1 hover:border-yellow-500/50 hover:bg-[#1b1b1b]"
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl transition group-hover:bg-yellow-500">
                        {tool.icon}
                      </div>

                      <div>

                        <h2 className="text-lg font-bold text-white">
                          {tool.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          AI Tool
                        </p>

                      </div>

                    </div>

                    <p className="mt-5 text-sm leading-6 text-gray-400">
                      {tool.description}
                    </p>

                    <div className="mt-5 text-sm font-bold text-yellow-400">
                      Gunakan Tool →
                    </div>

                  </button>
                ))}

              </div>
            )}

            {/* =================================================
                TOOL WORKSPACE
            ================================================= */}

            {selectedTool && (
              <div className="space-y-6">

                {/* TOOL HEADER */}

                <div className="flex flex-col gap-4 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-2xl">
                      {selectedTool.icon}
                    </div>

                    <div>

                      <h2 className="text-2xl font-black text-white">
                        {selectedTool.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        {selectedTool.description}
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={handleCloseTool}
                    disabled={loading}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/30 hover:text-white"
                  >
                    ← Kembali
                  </button>

                </div>

                {/* =================================================
                    FORM + RESULT
                ================================================= */}

                <div className="grid gap-6 lg:grid-cols-2">

                  {/* FORM */}

                  <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">

                    <h3 className="text-xl font-bold text-white">
                      Input Marketing
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Masukkan informasi produk agar hasil AI
                      lebih relevan.
                    </p>

                    <div className="mt-6 space-y-5">

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-300">
                          Produk
                        </label>

                        <textarea
                          value={product}
                          onChange={(e) =>
                            setProduct(e.target.value)
                          }
                          disabled={loading}
                          rows={4}
                          placeholder="Contoh: Ebook panduan membuat produk digital untuk pemula"
                          className="w-full resize-none rounded-2xl border border-white/10 bg-[#171717] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/50 disabled:opacity-50"
                        />

                      </div>

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-300">
                          Target Pasar
                        </label>

                        <input
                          value={target}
                          onChange={(e) =>
                            setTarget(e.target.value)
                          }
                          disabled={loading}
                          placeholder="Contoh: Pemula usia 18-35 tahun"
                          className="w-full rounded-2xl border border-white/10 bg-[#171717] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/50 disabled:opacity-50"
                        />

                      </div>

                      <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-300">
                          Informasi Tambahan
                        </label>

                        <textarea
                          value={additionalInfo}
                          onChange={(e) =>
                            setAdditionalInfo(
                              e.target.value
                            )
                          }
                          disabled={loading}
                          rows={4}
                          placeholder="Contoh: Harga produk Rp49.000, dijual melalui Lynk..."
                          className="w-full resize-none rounded-2xl border border-white/10 bg-[#171717] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/50 disabled:opacity-50"
                        />

                      </div>

                      {error && (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                          {error}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full rounded-2xl bg-yellow-500 px-6 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-50"
                      >
                        {loading
                          ? "⏳ AI Sedang Membuat..."
                          : "⚡ Generate Marketing AI"}
                      </button>

                    </div>

                  </div>

                  {/* =================================================
                      RESULT
                  ================================================= */}

                  <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="text-xl font-black text-white">
                          AI Response
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Hasil marketing yang dibuat AI.
                        </p>

                      </div>

                      {result && (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                          ✓ Generated
                        </span>
                      )}

                    </div>

                    {!result && !loading && (
                      <div className="mt-6 flex min-h-[400px] items-center justify-center rounded-2xl bg-[#181818] p-8 text-center">

                        <div>

                          <div className="text-5xl">
                            🤖
                          </div>

                          <h4 className="mt-5 font-bold text-white">
                            Belum ada hasil
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-gray-500">
                            Masukkan informasi produk kemudian
                            klik Generate Marketing AI.
                          </p>

                        </div>

                      </div>
                    )}

                    {loading && (
                      <div className="mt-6 flex min-h-[400px] items-center justify-center rounded-2xl bg-[#181818]">

                        <div className="text-center">

                          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

                          <p className="mt-5 text-sm text-gray-400">
                            Rife AI sedang menyusun strategi...
                          </p>

                        </div>

                      </div>
                    )}

                    {result && !loading && (
                      <div className="mt-6 space-y-5">

                        {/* HASIL AI */}

                        <div className="max-h-[600px] overflow-y-auto rounded-2xl bg-[#181818] p-6">

                          <div className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                            {result}
                          </div>

                        </div>

                        {/* =================================================
                            TUTORIAL LENGKAP
                        ================================================= */}

                        <div className="rounded-3xl border border-yellow-500/20 bg-[#151515] p-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                              📚
                            </div>

                            <div>

                              <h3 className="text-xl font-black text-white">
                                Tutorial Lengkap
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Ikuti langkah berikut untuk
                                menggunakan hasil AI ini.
                              </p>

                            </div>

                          </div>

                          <div className="mt-6 space-y-3">

                            {tutorials[selectedTool.id].map(
                              (step, index) => (
                                <div
                                  key={index}
                                  className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-4"
                                >

                                  <div className="flex gap-4">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-sm font-black text-black">
                                      {index + 1}
                                    </div>

                                    <div>

                                      <p className="text-sm font-bold text-white">
                                        Langkah {index + 1}
                                      </p>

                                      <p className="mt-1 text-sm leading-6 text-gray-400">
                                        {step}
                                      </p>

                                    </div>

                                  </div>

                                </div>
                              )
                            )}

                          </div>

                        </div>

                        {/* =================================================
                            TANYA AI
                        ================================================= */}

                        <div className="rounded-3xl border border-yellow-500/20 bg-[#151515] p-6">

                          <div className="mb-5 flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                              💬
                            </div>

                            <div>

                              <h3 className="text-xl font-black text-white">
                                Tanya AI
                              </h3>

                              <p className="mt-1 text-sm text-gray-500">
                                Bingung dengan hasil di atas?
                                Tanya AI untuk membantu
                                mengembangkan hasil marketing kamu.
                              </p>

                            </div>

                          </div>

                          {/* QUICK QUESTIONS */}

                          <div className="mb-5 flex flex-wrap gap-2">

                            {quickQuestions.map(
                              (question) => (
                                <button
                                  key={question}
                                  type="button"
                                  disabled={chatLoading}
                                  onClick={() =>
                                    setChatInput(
                                      question
                                    )
                                  }
                                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 transition hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-50"
                                >
                                  {question}
                                </button>
                              )
                            )}

                          </div>

                          {/* CHAT MESSAGES */}

                          {chatMessages.length > 0 && (
                            <div className="mb-5 max-h-[400px] space-y-4 overflow-y-auto pr-2">

                              {chatMessages.map(
                                (message, index) => (
                                  <div
                                    key={index}
                                    className={`flex ${
                                      message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                                  >

                                    <div
                                      className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                                        message.role === "user"
                                          ? "bg-yellow-500 text-black"
                                          : "bg-[#202020] text-gray-300"
                                      }`}
                                    >

                                      <p className="whitespace-pre-wrap text-sm leading-6">
                                        {message.message}
                                      </p>

                                    </div>

                                  </div>
                                )
                              )}

                              {chatLoading && (
                                <div className="flex justify-start">

                                  <div className="rounded-2xl bg-[#202020] px-5 py-4">

                                    <div className="flex gap-1">

                                      <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400" />

                                      <span
                                        className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"
                                        style={{
                                          animationDelay:
                                            "150ms",
                                        }}
                                      />

                                      <span
                                        className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"
                                        style={{
                                          animationDelay:
                                            "300ms",
                                        }}
                                      />

                                    </div>

                                  </div>

                                </div>
                              )}

                            </div>
                          )}

                          {/* CHAT INPUT */}

                          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-3">

                            <textarea
                              value={chatInput}
                              onChange={(e) =>
                                setChatInput(
                                  e.target.value
                                )
                              }
                              onKeyDown={
                                handleChatKeyDown
                              }
                              disabled={chatLoading}
                              rows={3}
                              placeholder="Contoh: Buatkan versi iklan ini yang lebih menarik..."
                              className="w-full resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
                            />

                            <div className="mt-2 flex items-center justify-between">

                              <p className="px-2 text-xs text-gray-600">
                                Enter untuk mengirim •
                                Shift + Enter untuk
                                baris baru
                              </p>

                              <button
                                type="button"
                                onClick={handleAskAI}
                                disabled={
                                  chatLoading ||
                                  !chatInput.trim()
                                }
                                className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                {chatLoading
                                  ? "Berpikir..."
                                  : "Tanya AI →"}
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

          </div>

        </main>

      </div>
    </DashboardLayout>
  );
}