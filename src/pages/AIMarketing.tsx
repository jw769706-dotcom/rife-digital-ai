import { useEffect, useMemo, useState, type KeyboardEvent } from "react";

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

/* =========================================================
   MARKETING TOOLS
========================================================= */

const tools: MarketingTool[] = [
  {
    id: "strategy",
    title: "Strategi Promosi",
    description:
      "Bingung harus promosi dari mana? Rife membantu menyusun langkah promosi yang sederhana dan mudah diikuti.",
    icon: "🚀",
  },
  {
    id: "tiktok-ads",
    title: "Strategi TikTok & Reels",
    description:
      "Dapatkan ide video, hook, script, dan CTA untuk mulai mempromosikan produk lewat video pendek.",
    icon: "🎬",
  },
  {
    id: "instagram-ads",
    title: "Konten Instagram",
    description:
      "Buat caption, hook, ide visual, CTA, dan konsep konten Instagram yang sesuai dengan produkmu.",
    icon: "📱",
  },
  {
    id: "cta",
    title: "Hook & CTA",
    description:
      "Buat kalimat pembuka yang menarik perhatian dan ajakan yang membuat orang tahu harus melakukan apa.",
    icon: "🪝",
  },
  {
    id: "facebook-ads",
    title: "Copywriting Jualan",
    description:
      "Buat teks promosi yang menjelaskan masalah, solusi, manfaat, dan alasan membeli dengan bahasa sederhana.",
    icon: "✍️",
  },
  {
    id: "email",
    title: "Email Marketing",
    description:
      "Buat email promosi yang sederhana untuk memperkenalkan produk dan mengajak calon pembeli bertindak.",
    icon: "📧",
  },
];

/* =========================================================
   AI PROMPTS
========================================================= */

const toolPrompts: Record<string, string> = {
  "facebook-ads": `
Buatkan copywriting penjualan untuk produk digital.

Berikan:
1. Hook
2. Masalah target pembeli
3. Solusi
4. Benefit produk
5. Alasan membeli
6. CTA
7. Versi singkat
8. Tips penggunaan

Gunakan bahasa yang sederhana, natural, dan cocok untuk pemula.
`,

  "instagram-ads": `
Buatkan konsep konten Instagram untuk mempromosikan produk digital.

Berikan:
1. Ide konten
2. Hook
3. Caption
4. CTA
5. Ide visual
6. Target audiens
7. Hashtag yang relevan
8. Tips agar konten lebih menarik

Utamakan konten organik yang bisa dibuat tanpa iklan berbayar.
`,

  "tiktok-ads": `
Buatkan strategi video pendek untuk TikTok dan Reels untuk mempromosikan produk digital.

Berikan:
1. Hook 3 detik pertama
2. Ide video
3. Script video
4. Text overlay
5. CTA
6. Ide visual
7. Caption
8. Cara membuat video tanpa harus menunjukkan wajah
9. Tips agar video lebih menarik

Fokus pada strategi konten organik.
`,

  cta: `
Buatkan 15 Hook dan CTA untuk menjual produk digital.

Bagi menjadi:
1. Hook untuk menarik perhatian
2. Hook masalah
3. Hook curiosity
4. CTA soft selling
5. CTA hard selling
6. CTA untuk pemula

Setiap contoh harus singkat dan siap digunakan.
`,

  email: `
Buatkan email marketing sederhana untuk mempromosikan produk digital.

Berikan:
1. Subject email
2. Opening
3. Masalah calon pembeli
4. Solusi
5. Penjelasan produk
6. Benefit
7. CTA
8. Closing

Gunakan bahasa persuasif tetapi tetap natural dan tidak berlebihan.
`,

  strategy: `
Buatkan strategi promosi sederhana untuk produk digital yang cocok untuk pemula.

Berikan:
1. Target market
2. Positioning
3. Unique Selling Proposition
4. Strategi konten
5. Strategi Instagram
6. Strategi TikTok/Reels
7. Strategi promosi organik
8. Funnel sederhana
9. CTA
10. Action Plan 7 hari
11. Kesalahan yang harus dihindari

Buat strategi yang realistis dan mudah dilakukan oleh orang yang baru mulai.
`,

};

/* =========================================================
   QUICK QUESTIONS
========================================================= */

const quickQuestions = [
  "Jelaskan hasil ini dengan bahasa yang lebih mudah",
  "Buat versi yang lebih singkat",
  "Buat versi yang lebih menarik",
  "Bagaimana cara saya menerapkannya?",
];

/* =========================================================
   TUTORIALS
========================================================= */

const tutorials: Record<string, string[]> = {
  "facebook-ads": [
    "Tentukan produk dan siapa yang paling membutuhkan produk tersebut.",
    "Gunakan Hook sebagai kalimat pertama agar orang tertarik membaca.",
    "Jelaskan masalah yang sering dialami calon pembeli.",
    "Tunjukkan bagaimana produkmu membantu menyelesaikan masalah tersebut.",
    "Tutup dengan CTA yang jelas seperti 'Cek produknya sekarang'.",
    "Coba beberapa versi copy dan gunakan yang paling cocok dengan audiensmu.",
  ],

  "instagram-ads": [
    "Tentukan tujuan konten terlebih dahulu.",
    "Gunakan Hook yang langsung membahas masalah atau keinginan target pembeli.",
    "Buat visual yang sederhana dan mudah dipahami.",
    "Gunakan caption untuk menjelaskan masalah, solusi, dan manfaat produk.",
    "Tambahkan CTA agar audiens tahu langkah berikutnya.",
    "Posting secara konsisten dan lihat konten mana yang paling banyak mendapat respons.",
  ],

  "tiktok-ads": [
    "Buka video dengan Hook kuat pada 1–3 detik pertama.",
    "Mulai dari masalah yang sering dialami target pembeli.",
    "Tunjukkan solusi secara sederhana.",
    "Gunakan Text Overlay agar pesan tetap mudah dipahami.",
    "Kamu tidak harus menunjukkan wajah. Gunakan screen recording, footage, Canva, atau video produk.",
    "Tutup video dengan CTA yang jelas.",
  ],

  cta: [
    "Gunakan Hook untuk membuat orang berhenti scrolling.",
    "Gunakan Hook masalah untuk membuat audiens merasa relate.",
    "Gunakan Curiosity untuk membuat audiens ingin mengetahui lebih lanjut.",
    "Gunakan Soft Selling ketika audiens masih baru mengenal produk.",
    "Gunakan Hard Selling ketika audiens sudah memahami manfaat produk.",
    "Tes beberapa Hook dan CTA untuk menemukan gaya yang paling cocok.",
  ],

  email: [
    "Tentukan tujuan email terlebih dahulu.",
    "Buat Subject yang jelas dan menarik.",
    "Mulai dengan masalah yang memang dialami target pasar.",
    "Jelaskan solusi dan manfaat produk menggunakan bahasa sederhana.",
    "Gunakan CTA yang mudah dilakukan.",
    "Tutup email dengan kalimat yang membangun kepercayaan.",
  ],

  strategy: [
    "Tentukan siapa orang yang paling mungkin membutuhkan produkmu.",
    "Tentukan masalah utama yang ingin kamu bantu selesaikan.",
    "Buat pembeda sederhana agar produkmu mudah diingat.",
    "Buat konten yang membahas masalah, solusi, edukasi, dan pengalaman.",
    "Gunakan Instagram dan TikTok/Reels untuk mendapatkan perhatian secara organik.",
    "Arahkan orang dari konten ke produk atau halaman penjualan.",
    "Jalankan Action Plan 7 Hari secara bertahap.",
    "Evaluasi konten yang mendapatkan respons terbaik lalu buat versi berikutnya.",
  ],
};

/* =========================================================
   COMPONENT
========================================================= */

export default function AIMarketing() {
  const [selectedTool, setSelectedTool] =
    useState<MarketingTool | null>(null);

  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [goal, setGoal] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadHistory() {
      try {
        const historyData = await getHistory();

        if (mounted) {
          setHistory(historyData);
        }
      } catch (error) {
        console.error("MARKETING HISTORY ERROR:", error);

        if (mounted) {
          setHistory([]);
        }
      }
    }

    void loadHistory();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     HISTORY
  ========================================================= */

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

  /* =========================================================
     TOOL ACTIONS
  ========================================================= */

  function handleSelectTool(tool: MarketingTool) {
    setSelectedTool(tool);

    setResult("");
    setError("");

    setChatInput("");
    setChatMessages([]);

    setProduct("");
    setTarget("");
    setGoal("");
    setAdditionalInfo("");
  }

  function handleCloseTool() {
    setSelectedTool(null);

    setResult("");
    setError("");

    setProduct("");
    setTarget("");
    setGoal("");
    setAdditionalInfo("");

    setChatInput("");
    setChatMessages([]);
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
    setGoal("");
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

  /* =========================================================
     GENERATE AI
  ========================================================= */

  async function handleGenerate() {
    if (!selectedTool) {
      return;
    }

    if (!product.trim()) {
      setError(
        "Ceritakan dulu produk atau apa yang ingin kamu promosikan."
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

Kamu membantu pemula membangun dan mempromosikan bisnis digital.

Gunakan bahasa Indonesia yang:
- sederhana
- jelas
- praktis
- mudah dipahami
- tidak menggunakan istilah rumit tanpa penjelasan
- cocok untuk orang yang belum mengerti marketing

Jangan memberikan janji keuntungan pasti.

Jangan membuat pengguna merasa harus menjadi ahli marketing.

Berikan langkah yang realistis dan bisa dilakukan oleh pemula.

Tool yang digunakan:
${selectedTool.title}

${toolPrompts[selectedTool.id]}

PENTING:
- Sesuaikan hasil dengan produk pengguna.
- Sesuaikan dengan target pasar.
- Utamakan strategi organik jika memungkinkan.
- Jangan menjawab terlalu umum.
- Gunakan heading sederhana.
- Gunakan bullet point.
- Jangan menggunakan JSON.
- Jangan mengatakan "Sebagai AI".
- Jangan memberikan klaim keuntungan yang pasti.
- Hasil harus siap digunakan pengguna.
`;

      const userPrompt = `
Produk / Apa yang ingin dipromosikan:
${product}

Target pembeli:
${
  target ||
  "Belum tahu. Bantu tentukan target pembeli yang paling masuk akal."
}

Tujuan saya:
${
  goal ||
  "Belum ditentukan. Bantu tentukan tujuan promosi yang paling masuk akal."
}

Informasi tambahan:
${additionalInfo || "Tidak ada."}

Buat hasil untuk:
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

      await saveHistory(historyItem);

      const updatedHistory = await getHistory();
      setHistory(updatedHistory);
    } catch (err) {
      console.error("MARKETING AI ERROR:", err);

      setError(
        "Rife belum berhasil membuat hasilnya. Coba periksa koneksi lalu ulangi."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     ASK AI
  ========================================================= */

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

Pengguna sedang menggunakan:
${selectedTool.title}

Produk:
${product || "Tidak diketahui"}

Target:
${target || "Belum ditentukan"}

Tujuan:
${goal || "Belum ditentukan"}

Informasi tambahan:
${additionalInfo || "Tidak ada"}

HASIL AI SEBELUMNYA:
--------------------------------
${result}
--------------------------------

Bantu pengguna memahami, memperbaiki, mengembangkan,
atau menggunakan hasil tersebut.

ATURAN:
- Jawab dalam bahasa Indonesia.
- Gunakan bahasa yang mudah dipahami pemula.
- Jawab berdasarkan hasil AI sebelumnya.
- Jika pengguna meminta revisi, berikan versi revisinya.
- Jika meminta contoh, berikan contoh siap pakai.
- Jika meminta beberapa pilihan, berikan beberapa pilihan.
- Jangan menjanjikan keuntungan pasti.
- Jangan terlalu panjang kecuali diminta.
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
            "Maaf, Rife sedang mengalami masalah. Coba tanyakan lagi beberapa saat.",
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

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <DashboardLayout
      title="Marketing Studio"
      subtitle="Bingung cara promosi? Rife bantu susun langkahnya."
    >
      <div className="w-full min-w-0">

        {/* =====================================================
            HERO
        ===================================================== */}

        {!selectedTool && (
          <>
            <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-yellow-400/[0.10] via-[#111111] to-[#0c0c0c] p-6 sm:rounded-[32px] sm:p-8 lg:p-10">

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/[0.08] blur-[100px]" />

              <div className="relative max-w-3xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400 sm:text-xs">
                  <span>🚀</span>
                  Marketing Dibantu AI
                </div>

                <h1 className="mt-5 max-w-2xl text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Bingung Cara Promosi
                  <br />
                  <span className="text-yellow-400">
                    Produkmu?
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                  Nggak perlu jago marketing. Ceritakan saja
                  apa yang kamu jual, lalu Rife akan membantu
                  menentukan apa yang harus kamu lakukan
                  selanjutnya.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                    ✨ Cocok untuk pemula
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                    📱 Bisa lewat HP
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-400">
                    🚀 Fokus konten organik
                  </div>
                </div>

              </div>
            </section>

            {/* =================================================
                QUICK START
            ================================================= */}

            <section className="mt-8">

              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-400">
                  Mulai dari sini
                </p>

                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Mau dibantu bagian mana?
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Pilih saja. Kamu tidak perlu tahu istilah
                  marketing untuk mulai.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() =>
                      handleSelectTool(tool)
                    }
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-[#141414] hover:shadow-[0_20px_60px_rgba(234,179,8,.06)] sm:rounded-3xl sm:p-6"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.05] text-2xl transition group-hover:bg-yellow-400 group-hover:text-black">
                        {tool.icon}
                      </div>

                      <span className="text-lg text-gray-700 transition group-hover:text-yellow-400">
                        →
                      </span>

                    </div>

                    <h3 className="mt-5 text-lg font-black tracking-tight text-white">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {tool.description}
                    </p>

                    <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-yellow-400">
                      Mulai sekarang
                    </div>

                  </button>
                ))}
              </div>

            </section>

            {/* =================================================
                SIMPLE FLOW
            ================================================= */}

            <section className="mt-10 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">

              <div className="text-center">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">
                  Cara kerjanya
                </p>

                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Kamu cukup cerita. Rife yang bantu susun.
                </h2>

              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                {[
                  [
                    "01",
                    "Ceritakan Produk",
                    "Tulis saja dengan bahasa sehari-hari.",
                  ],
                  [
                    "02",
                    "Rife Menyusun",
                    "AI membantu membuat strategi dan konten.",
                  ],
                  [
                    "03",
                    "Tinggal Ikuti",
                    "Kamu mendapatkan langkah yang mudah diikuti.",
                  ],
                ].map(([number, title, desc]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5"
                  >
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-black text-black">
                        {number}
                      </div>

                      <h3 className="text-sm font-bold text-white">
                        {title}
                      </h3>

                    </div>

                    <p className="mt-3 text-xs leading-5 text-gray-500">
                      {desc}
                    </p>
                  </div>
                ))}

              </div>

            </section>

            {/* =================================================
                RECENT PROJECTS
            ================================================= */}

            {todayHistory.length > 0 && (
              <section className="mt-10">

                <div className="mb-5 flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">
                      Riwayat
                    </p>

                    <h2 className="mt-2 text-xl font-black text-white">
                      Baru saja kamu buat
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="text-xs font-semibold text-yellow-400 hover:text-yellow-300"
                  >
                    Lihat semua
                  </button>

                </div>

                <div className="grid gap-3 sm:grid-cols-3">

                  {todayHistory.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleOpenHistory(item)
                      }
                      className="rounded-2xl border border-white/10 bg-[#111111] p-4 text-left transition hover:border-yellow-400/30 hover:bg-[#141414]"
                    >

                      <div className="flex items-start gap-3">

                        <span className="text-xl">
                          {getToolByTitle(item.tool)?.icon ??
                            "✨"}
                        </span>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-white">
                            {item.tool}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
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

              </section>
            )}

          </>
        )}

        {/* =====================================================
            TOOL WORKSPACE
        ===================================================== */}

        {selectedTool && (
          <div className="space-y-6">

            {/* TOOL HEADER */}

            <section className="relative overflow-hidden rounded-[28px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.09] via-[#111111] to-[#0d0d0d] p-6 sm:p-8">

              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/[0.08] blur-[90px]" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-black shadow-lg shadow-yellow-400/10">
                    {selectedTool.icon}
                  </div>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                      Rife Marketing AI
                    </p>

                    <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                      {selectedTool.title}
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                      {selectedTool.description}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleCloseTool}
                  disabled={loading}
                  className="self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:border-white/20 hover:text-white disabled:opacity-50 sm:self-center"
                >
                  ← Pilih Tool Lain
                </button>

              </div>

            </section>

            {/* =================================================
                INPUT + RESULT
            ================================================= */}

            <div className="grid gap-5 xl:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)]">

              {/* INPUT */}

              <section className="rounded-3xl border border-white/10 bg-[#111111] p-5 sm:p-7">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                    Langkah 01
                  </p>

                  <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                    Ceritakan kebutuhanmu
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Tidak perlu menggunakan bahasa marketing.
                    Ceritakan saja seperti sedang berbicara
                    dengan teman.
                  </p>

                </div>

                <div className="mt-7 space-y-5">

                  {/* PRODUCT */}

                  <div>

                    <label className="mb-2 block text-sm font-bold text-white">
                      Apa yang ingin kamu promosikan?
                    </label>

                    <p className="mb-2 text-xs text-gray-600">
                      Contoh: Ebook Canva untuk orang yang
                      baru mulai jualan produk digital.
                    </p>

                    <textarea
                      value={product}
                      onChange={(e) =>
                        setProduct(e.target.value)
                      }
                      disabled={loading}
                      rows={4}
                      placeholder="Ceritakan produkmu di sini..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 text-sm leading-6 text-white outline-none placeholder:text-gray-700 focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/10 disabled:opacity-50"
                    />

                  </div>

                  {/* TARGET */}

                  <div>

                    <label className="mb-2 block text-sm font-bold text-white">
                      Siapa yang ingin kamu bantu?
                    </label>

                    <p className="mb-2 text-xs text-gray-600">
                      Kalau belum tahu, kosongkan saja. Rife
                      akan membantu menentukannya.
                    </p>

                    <input
                      value={target}
                      onChange={(e) =>
                        setTarget(e.target.value)
                      }
                      disabled={loading}
                      placeholder="Contoh: pemula yang ingin mulai jualan"
                      className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 text-sm text-white outline-none placeholder:text-gray-700 focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/10 disabled:opacity-50"
                    />

                  </div>

                  {/* GOAL */}

                  <div>

                    <label className="mb-3 block text-sm font-bold text-white">
                      Kamu ingin mencapai apa?
                    </label>

                    <div className="grid grid-cols-2 gap-2">

                      {[
                        "Mencari ide konten",
                        "Mendapatkan pembeli",
                        "Membangun akun",
                        "Meningkatkan penjualan",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          disabled={loading}
                          onClick={() =>
                            setGoal(
                              goal === item ? "" : item
                            )
                          }
                          className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold transition ${
                            goal === item
                              ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-400"
                              : "border-white/10 bg-[#0b0b0b] text-gray-500 hover:border-white/20 hover:text-gray-300"
                          }`}
                        >
                          {goal === item ? "✓ " : ""}
                          {item}
                        </button>
                      ))}

                    </div>

                  </div>

                  {/* ADDITIONAL */}

                  <div>

                    <label className="mb-2 block text-sm font-bold text-white">
                      Ada informasi tambahan?
                      <span className="ml-1 text-xs font-normal text-gray-600">
                        (opsional)
                      </span>
                    </label>

                    <textarea
                      value={additionalInfo}
                      onChange={(e) =>
                        setAdditionalInfo(
                          e.target.value
                        )
                      }
                      disabled={loading}
                      rows={3}
                      placeholder="Contoh: Harga Rp49.000, dijual lewat Lynk..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 text-sm leading-6 text-white outline-none placeholder:text-gray-700 focus:border-yellow-400/40 focus:ring-1 focus:ring-yellow-400/10 disabled:opacity-50"
                    />

                  </div>

                  {/* ERROR */}

                  {error && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                      {error}
                    </div>
                  )}

                  {/* BUTTON */}

                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 py-4 text-sm font-black text-black shadow-lg shadow-yellow-400/10 transition hover:-translate-y-0.5 hover:bg-yellow-300 disabled:cursor-wait disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                        Rife sedang membantu...
                      </>
                    ) : (
                      <>
                        ✨ Bantu Saya
                        <span className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] leading-5 text-gray-700">
                    Kamu tidak perlu tahu cara membuat prompt.
                    Cukup ceritakan kebutuhanmu.
                  </p>

                </div>

              </section>

              {/* RESULT */}

              <section className="min-w-0 rounded-3xl border border-white/10 bg-[#111111] p-5 sm:p-7">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                      Langkah 02
                    </p>

                    <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                      Hasil dari Rife
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Strategi dan ide yang bisa langsung kamu gunakan.
                    </p>

                  </div>

                  {result && (
                    <span className="shrink-0 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-400">
                      ✓ Selesai
                    </span>
                  )}

                </div>

                {/* EMPTY */}

                {!result && !loading && (
                  <div className="mt-6 flex min-h-[460px] items-center justify-center rounded-2xl border border-white/5 bg-[#0b0b0b] p-8 text-center">

                    <div className="max-w-sm">

                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/[0.08] text-3xl">
                        ✨
                      </div>

                      <h3 className="mt-5 text-lg font-black text-white">
                        Hasilmu akan muncul di sini
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        Isi produkmu di sebelah kiri lalu klik
                        <span className="font-semibold text-gray-500">
                          {" "}
                          “Bantu Saya”
                        </span>
                        .
                      </p>

                    </div>

                  </div>
                )}

                {/* LOADING */}

                {loading && (
                  <div className="mt-6 flex min-h-[460px] items-center justify-center rounded-2xl border border-yellow-400/10 bg-[#0b0b0b]">

                    <div className="text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">

                        <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />

                      </div>

                      <h3 className="mt-5 font-bold text-white">
                        Rife sedang berpikir...
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        Sedang menyusun strategi yang sesuai
                        dengan produkmu.
                      </p>

                    </div>

                  </div>
                )}

                {/* RESULT */}

                {result && !loading && (
                  <div className="mt-6 space-y-5">

                    <div className="max-h-[620px] overflow-y-auto rounded-2xl border border-white/5 bg-[#0b0b0b] p-5 sm:p-6">

                      <div className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                        {result}
                      </div>

                    </div>

                    {/* TUTORIAL */}

                    <div className="rounded-3xl border border-yellow-400/15 bg-yellow-400/[0.04] p-5 sm:p-6">

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-xl text-black">
                          📚
                        </div>

                        <div>

                          <h3 className="text-lg font-black text-white">
                            Cara Menggunakannya
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Ikuti langkah sederhana ini setelah
                            mendapatkan hasil dari Rife.
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 space-y-2">

                        {(
                          tutorials[selectedTool.id] ??
                          []
                        ).map((step, index) => (
                          <div
                            key={index}
                            className="flex gap-3 rounded-2xl border border-white/5 bg-[#111111] p-4"
                          >

                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-[10px] font-black text-black">
                              {index + 1}
                            </div>

                            <p className="text-sm leading-6 text-gray-400">
                              {step}
                            </p>

                          </div>
                        ))}

                      </div>

                    </div>

                    {/* ASK AI */}

                    <div className="rounded-3xl border border-white/10 bg-[#111111] p-5 sm:p-6">

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xl">
                          💬
                        </div>

                        <div>

                          <h3 className="text-lg font-black text-white">
                            Masih Bingung?
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Tanya Rife dengan bahasa sehari-hari.
                          </p>

                        </div>

                      </div>

                      {/* QUICK */}

                      <div className="mt-5 flex flex-wrap gap-2">

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
                              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-medium text-gray-500 transition hover:border-yellow-400/30 hover:text-yellow-400 disabled:opacity-40"
                            >
                              {question}
                            </button>
                          )
                        )}

                      </div>

                      {/* CHAT */}

                      {chatMessages.length > 0 && (
                        <div className="mt-5 max-h-[400px] space-y-3 overflow-y-auto pr-1">

                          {chatMessages.map(
                            (message, index) => (
                              <div
                                key={index}
                                className={`flex ${
                                  message.role ===
                                  "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >

                                <div
                                  className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                                    message.role ===
                                    "user"
                                      ? "bg-yellow-400 text-black"
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

                      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b0b0b] p-3">

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
                          placeholder="Contoh: Jelaskan bagian ini dengan bahasa yang lebih mudah..."
                          className="w-full resize-none bg-transparent px-2 py-2 text-sm leading-6 text-white outline-none placeholder:text-gray-700 disabled:opacity-50"
                        />

                        <div className="mt-2 flex items-center justify-between gap-3">

                          <p className="hidden px-2 text-[10px] text-gray-700 sm:block">
                            Enter kirim • Shift + Enter
                            baris baru
                          </p>

                          <button
                            type="button"
                            onClick={handleAskAI}
                            disabled={
                              chatLoading ||
                              !chatInput.trim()
                            }
                            className="ml-auto rounded-xl bg-yellow-400 px-4 py-2.5 text-xs font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {chatLoading
                              ? "Berpikir..."
                              : "Tanya Rife →"}
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                )}

              </section>

            </div>

          </div>
        )}

        {/* =====================================================
            ALL HISTORY
        ===================================================== */}

        {!selectedTool &&
          previousHistory.length > 0 && (
            <section className="mt-10 rounded-3xl border border-white/10 bg-[#111111] p-5 sm:p-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">
                    History
                  </p>

                  <h2 className="mt-2 text-xl font-black text-white">
                    Project Sebelumnya
                  </h2>

                </div>

                <div className="w-full sm:w-64">

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Cari project..."
                    className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-2.5 text-xs text-white outline-none placeholder:text-gray-700 focus:border-yellow-400/30"
                  />

                </div>

              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                {previousHistory.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      handleOpenHistory(item)
                    }
                    className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 text-left transition hover:border-yellow-400/30 hover:bg-[#141414]"
                  >

                    <div className="flex items-start gap-3">

                      <span className="text-xl">
                        {getToolByTitle(item.tool)?.icon ??
                          "✨"}
                      </span>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-white">
                          {item.tool}
                        </p>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                          {item.prompt
                            .replace(/\s+/g, " ")
                            .trim()}
                        </p>

                        <p className="mt-2 text-[10px] text-gray-700">
                          {formatDate(item.createdAt)}
                        </p>

                      </div>

                    </div>

                  </button>
                ))}

              </div>

            </section>
          )}

      </div>
    </DashboardLayout>
  );
}