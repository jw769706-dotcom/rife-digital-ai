import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { generateText } from "../services/ai";

import {
  canGenerate,
  increaseUsage,
} from "../lib/subscriptions";

import { getHistory, saveHistory } from "../lib/history";
import type { HistoryItem } from "../lib/history";

type FieldType = "text" | "textarea" | "select";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  options?: string[];
};

type TutorialStep = {
  title: string;
  description: string;
};

type Tool = {
  id: string;
  title: string;
  icon: string;
  description: string;
  fields: Field[];
  systemPrompt: string;
  buildPrompt: (values: Record<string, string>) => string;
  tutorial: TutorialStep[];
};

const tools: Tool[] = [
  {
    id: "calendar",
    title: "Content Calendar",
    icon: "📅",
    description: "Buat kalender konten lengkap untuk beberapa hari.",
    fields: [
      {
        name: "topic",
        label: "Apa yang ingin kamu promosikan?",
        placeholder: "Contoh: Ebook Canva untuk pemula",
        type: "text",
      },
      {
        name: "target",
        label: "Siapa target pembelinya?",
        placeholder: "Contoh: Pemula yang ingin belajar Canva",
        type: "text",
      },
      {
        name: "platform",
        label: "Mau posting di mana?",
        type: "select",
        options: [
          "Instagram",
          "TikTok",
          "Instagram & TikTok",
          "Facebook",
          "YouTube Shorts",
        ],
      },
      {
        name: "duration",
        label: "Mau dibuat untuk berapa hari?",
        type: "select",
        options: ["7 hari", "14 hari", "30 hari"],
      },
      {
        name: "contentType",
        label: "Jenis konten",
        type: "select",
        options: [
          "Campuran",
          "Edukasi",
          "Promosi",
          "Storytelling",
          "Tips & Tutorial",
        ],
      },
      {
        name: "goal",
        label: "Tujuan konten",
        type: "select",
        options: [
          "Mendapatkan pembeli",
          "Mendapatkan followers",
          "Meningkatkan engagement",
          "Membangun kepercayaan",
          "Mengenalkan produk",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah content strategist profesional untuk bisnis digital.

Target pengguna adalah pemula yang tidak memahami strategi konten.

Buat hasil yang:
- sangat mudah dipahami
- praktis
- tidak menggunakan istilah rumit
- bisa langsung dipraktikkan
- cocok untuk pemula
`,
    buildPrompt: (v) => `
Buat Content Calendar lengkap berdasarkan:

Produk:
${v.topic}

Target pasar:
${v.target}

Platform:
${v.platform}

Durasi:
${v.duration}

Jenis konten:
${v.contentType}

Tujuan:
${v.goal}

Untuk setiap hari berikan:

1. Hari
2. Judul konten
3. Format konten
4. Hook
5. Isi konten
6. CTA
7. Ide visual

Buat seolah-olah pengguna benar-benar pemula dan tinggal mengikuti kalender tersebut.
`,
    tutorial: [
      {
        title: "Tentukan produk atau topik",
        description:
          "Masukkan produk atau topik yang ingin kamu promosikan. Contohnya ebook, template Canva, jasa desain, atau produk digital lainnya.",
      },
      {
        title: "Tentukan target pembeli",
        description:
          "Tulis siapa yang paling cocok membeli produkmu. Tidak perlu rumit. Contohnya guru, mahasiswa, karyawan, ibu rumah tangga, atau pemula.",
      },
      {
        title: "Pilih platform",
        description:
          "Pilih tempat kamu biasanya membuat konten seperti Instagram atau TikTok.",
      },
      {
        title: "Pilih durasi kalender",
        description:
          "Untuk pemula, mulai dari 7 hari terlebih dahulu agar lebih mudah dijalankan.",
      },
      {
        title: "Ikuti kalender dari AI",
        description:
          "Gunakan ide, hook, isi, CTA, dan visual yang diberikan AI. Kamu tidak harus membuat strategi dari awal.",
      },
      {
        title: "Mulai posting",
        description:
          "Buat kontennya satu per satu sesuai jadwal. Jangan menunggu semuanya sempurna sebelum mulai posting.",
      },
    ],
  },

  {
    id: "ideas",
    title: "Ide Konten",
    icon: "💡",
    description: "Cari ide konten berdasarkan produk dan target pasar.",
    fields: [
      {
        name: "topic",
        label: "Apa produk atau topik kamu?",
        placeholder: "Contoh: Template Canva untuk guru",
        type: "text",
      },
      {
        name: "target",
        label: "Siapa target kamu?",
        placeholder:
          "Contoh: Guru SD yang tidak terlalu mahir desain",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform utama",
        type: "select",
        options: [
          "Instagram",
          "TikTok",
          "Instagram & TikTok",
          "Facebook",
          "YouTube Shorts",
        ],
      },
      {
        name: "amount",
        label: "Berapa ide yang kamu inginkan?",
        type: "select",
        options: ["10 ide", "20 ide", "30 ide"],
      },
      {
        name: "style",
        label: "Gaya konten",
        type: "select",
        options: [
          "Santai",
          "Profesional",
          "Lucu",
          "Storytelling",
          "Edukasi",
          "Persuasif",
        ],
      },
      {
        name: "goal",
        label: "Tujuan utama",
        type: "select",
        options: [
          "Jualan",
          "Followers",
          "Engagement",
          "Branding",
          "Edukasi",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah ahli content marketing dan social media strategist.

Pengguna adalah pemula.

Jangan membuat pengguna harus memahami istilah marketing yang rumit.
Berikan contoh yang konkret dan mudah diterapkan.
`,
    buildPrompt: (v) => `
Buat ${v.amount} ide konten untuk:

Produk/topik:
${v.topic}

Target:
${v.target}

Platform:
${v.platform}

Gaya:
${v.style}

Tujuan:
${v.goal}

Untuk setiap ide berikan:

- Judul
- Hook
- Ide isi
- Format
- CTA
- Ide visual

Prioritaskan ide yang realistis dibuat oleh pemula.
`,
    tutorial: [
      {
        title: "Masukkan produk atau topik",
        description:
          "Tulis produk yang ingin kamu promosikan atau topik yang ingin kamu bahas.",
      },
      {
        title: "Tentukan target",
        description:
          "Jelaskan secara sederhana siapa yang ingin kamu jangkau.",
      },
      {
        title: "Pilih gaya konten",
        description:
          "Kalau bingung, pilih Campuran atau gaya Santai agar ide lebih bervariasi.",
      },
      {
        title: "Generate ide",
        description:
          "Klik Generate dan AI akan memberikan beberapa ide konten yang bisa langsung kamu gunakan.",
      },
      {
        title: "Pilih ide terbaik",
        description:
          "Tidak perlu menggunakan semua ide. Pilih yang paling sesuai dengan produk dan kemampuanmu.",
      },
      {
        title: "Kembangkan menjadi konten",
        description:
          "Gunakan ide tersebut sebagai dasar untuk membuat Reels, TikTok, carousel, atau postingan.",
      },
    ],
  },

  {
    id: "carousel",
    title: "Instagram Carousel",
    icon: "📸",
    description: "Buat carousel Instagram lengkap dari slide 1 sampai CTA.",
    fields: [
      {
        name: "topic",
        label: "Topik carousel",
        placeholder:
          "Contoh: 5 kesalahan pemula saat jualan produk digital",
        type: "text",
      },
      {
        name: "target",
        label: "Target pembaca",
        placeholder:
          "Contoh: Orang yang baru mulai bisnis online",
        type: "text",
      },
      {
        name: "slides",
        label: "Jumlah slide",
        type: "select",
        options: ["5 slide", "7 slide", "8 slide", "10 slide"],
      },
      {
        name: "style",
        label: "Gaya bahasa",
        type: "select",
        options: [
          "Santai",
          "Profesional",
          "Storytelling",
          "Persuasif",
          "Edukasi",
        ],
      },
      {
        name: "goal",
        label: "Tujuan carousel",
        type: "select",
        options: [
          "Mendapatkan pembeli",
          "Meningkatkan engagement",
          "Edukasi",
          "Mendapatkan followers",
          "Promosi produk",
        ],
      },
      {
        name: "cta",
        label: "CTA yang diinginkan",
        placeholder:
          "Contoh: Klik link di bio untuk melihat produknya",
        type: "text",
      },
    ],
    systemPrompt: `
Kamu adalah copywriter Instagram profesional.

Buat carousel yang:
- mudah dibaca
- tidak terlalu panjang
- memiliki alur jelas
- menarik sejak slide pertama
- cocok untuk pemula
`,
    buildPrompt: (v) => `
Buat Instagram Carousel:

Topik:
${v.topic}

Target:
${v.target}

Jumlah slide:
${v.slides}

Gaya:
${v.style}

Tujuan:
${v.goal}

CTA:
${v.cta}

Untuk setiap slide berikan:

Slide X:
Judul:
Isi:
Ide visual:

Pastikan slide pertama memiliki hook yang kuat.
Slide terakhir harus memiliki CTA.
`,
    tutorial: [
      {
        title: "Tentukan topik",
        description:
          "Pilih satu topik yang ingin kamu jelaskan kepada audiens. Hindari memasukkan terlalu banyak topik dalam satu carousel.",
      },
      {
        title: "Tentukan target pembaca",
        description:
          "Tulis siapa yang akan membaca carousel tersebut agar bahasa dan contoh yang diberikan AI lebih relevan.",
      },
      {
        title: "Pilih jumlah slide",
        description:
          "Untuk pemula, 5 sampai 7 slide sudah cukup untuk mulai membuat carousel.",
      },
      {
        title: "Generate carousel",
        description:
          "Klik Generate dan AI akan membuat struktur dari slide pertama sampai CTA.",
      },
      {
        title: "Buat desain di Canva",
        description:
          "Salin isi setiap slide ke Canva. Gunakan desain sederhana dan pastikan teks mudah dibaca.",
      },
      {
        title: "Upload dan evaluasi",
        description:
          "Posting carousel lalu lihat bagian mana yang mendapatkan respons paling bagus dari audiens.",
      },
    ],
  },

  {
    id: "video",
    title: "Video Content",
    icon: "🎬",
    description: "Buat script video Reels, TikTok, dan Shorts.",
    fields: [
      {
        name: "topic",
        label: "Topik video",
        placeholder:
          "Contoh: Cara menghasilkan uang dari produk digital",
        type: "text",
      },
      {
        name: "target",
        label: "Target penonton",
        placeholder:
          "Contoh: Pemula usia 18-30 tahun",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          "TikTok",
          "Instagram Reels",
          "YouTube Shorts",
          "TikTok & Reels",
        ],
      },
      {
        name: "duration",
        label: "Durasi video",
        type: "select",
        options: [
          "15 detik",
          "30 detik",
          "45 detik",
          "60 detik",
        ],
      },
      {
        name: "style",
        label: "Gaya video",
        type: "select",
        options: [
          "Faceless",
          "Talking Head",
          "Storytelling",
          "Tutorial",
          "Edukasi",
        ],
      },
      {
        name: "goal",
        label: "Tujuan video",
        type: "select",
        options: [
          "Viral / Jangkauan",
          "Mendapatkan followers",
          "Menjual produk",
          "Edukasi",
          "Membangun personal brand",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah scriptwriter video pendek profesional.

Buat script yang cocok untuk pemula.
Gunakan bahasa sehari-hari.
Fokus pada hook, retention, value, dan CTA.
`,
    buildPrompt: (v) => `
Buat script video:

Topik:
${v.topic}

Target:
${v.target}

Platform:
${v.platform}

Durasi:
${v.duration}

Style:
${v.style}

Tujuan:
${v.goal}

Buat dengan struktur:

1. Hook 0-3 detik
2. Opening
3. Masalah
4. Isi utama
5. Solusi
6. CTA

Tambahkan:

- Voice over
- Teks di layar
- Ide visual
- Musik / suasana yang cocok

Jika menggunakan faceless, berikan contoh footage yang bisa digunakan.
`,
    tutorial: [
      {
        title: "Tentukan topik video",
        description:
          "Tulis satu hal yang ingin kamu sampaikan kepada penonton.",
      },
      {
        title: "Tentukan target penonton",
        description:
          "Semakin jelas targetnya, semakin mudah AI membuat bahasa yang sesuai.",
      },
      {
        title: "Pilih gaya video",
        description:
          "Kalau tidak ingin menunjukkan wajah, pilih Faceless. AI akan memberikan contoh footage yang bisa digunakan.",
      },
      {
        title: "Generate script",
        description:
          "AI akan membuat hook, isi, voice over, teks layar, visual, dan CTA.",
      },
      {
        title: "Rekam atau kumpulkan footage",
        description:
          "Ikuti bagian visual yang diberikan AI. Kamu bisa menggunakan rekaman sendiri atau footage yang sesuai.",
      },
      {
        title: "Edit dan upload",
        description:
          "Masukkan video ke aplikasi editing, tambahkan teks, musik, dan voice over lalu upload.",
      },
    ],
  },

  {
    id: "hook",
    title: "Hook Generator",
    icon: "🎯",
    description: "Buat hook kuat untuk menarik perhatian.",
    fields: [
      {
        name: "topic",
        label: "Topik konten",
        placeholder:
          "Contoh: Jualan produk digital",
        type: "text",
      },
      {
        name: "target",
        label: "Target penonton",
        placeholder:
          "Contoh: Pemula yang ingin mendapatkan penghasilan online",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          "TikTok",
          "Instagram Reels",
          "YouTube Shorts",
          "Instagram Carousel",
        ],
      },
      {
        name: "amount",
        label: "Jumlah hook",
        type: "select",
        options: ["10 hook", "20 hook", "30 hook"],
      },
      {
        name: "style",
        label: "Jenis hook",
        type: "select",
        options: [
          "Rasa penasaran",
          "Masalah",
          "Hasil",
          "Storytelling",
          "Pertanyaan",
          "Kontroversial",
          "Campuran",
        ],
      },
      {
        name: "tone",
        label: "Gaya bahasa",
        type: "select",
        options: [
          "Santai",
          "Tegas",
          "Profesional",
          "Friendly",
          "Berani",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah ahli copywriting dan hook media sosial.

Buat hook yang menarik tetapi tidak menipu.
Hook harus mudah dipahami oleh orang awam.
`,
    buildPrompt: (v) => `
Buat ${v.amount} hook untuk:

Topik:
${v.topic}

Target:
${v.target}

Platform:
${v.platform}

Jenis hook:
${v.style}

Gaya bahasa:
${v.tone}

Buat hook yang pendek dan langsung menarik perhatian.

Untuk setiap hook tambahkan:
- Hook
- Kenapa menarik
- Contoh lanjutan 1 kalimat
`,
    tutorial: [
      {
        title: "Tentukan topik",
        description:
          "Masukkan topik yang akan dibahas dalam konten.",
      },
      {
        title: "Tentukan target",
        description:
          "Tulis siapa yang ingin kamu tarik perhatiannya.",
      },
      {
        title: "Pilih jenis hook",
        description:
          "Kalau bingung, pilih Campuran agar AI memberikan berbagai gaya hook.",
      },
      {
        title: "Generate hook",
        description:
          "AI akan membuat beberapa pembuka yang bisa kamu pilih.",
      },
      {
        title: "Pilih hook terbaik",
        description:
          "Pilih hook yang paling sesuai dengan isi kontenmu. Jangan membuat hook yang menjanjikan sesuatu yang tidak ada di isi.",
      },
      {
        title: "Gunakan di awal konten",
        description:
          "Letakkan hook pada 1 sampai 3 detik pertama video atau slide pertama carousel.",
      },
    ],
  },

  {
    id: "viral",
    title: "Viral Content",
    icon: "🔥",
    description:
      "Buat konsep konten dengan potensi engagement tinggi.",
    fields: [
      {
        name: "product",
        label: "Produk / topik",
        placeholder:
          "Contoh: Template Canva untuk UMKM",
        type: "text",
      },
      {
        name: "target",
        label: "Target pasar",
        placeholder:
          "Contoh: Pemilik UMKM yang belum bisa desain",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform utama",
        type: "select",
        options: [
          "TikTok",
          "Instagram Reels",
          "TikTok & Instagram",
          "YouTube Shorts",
        ],
      },
      {
        name: "contentType",
        label: "Jenis konten",
        type: "select",
        options: [
          "Edukasi",
          "Storytelling",
          "Tips",
          "Tutorial",
          "Promosi",
          "Entertainment",
          "Campuran",
        ],
      },
      {
        name: "goal",
        label: "Tujuan",
        type: "select",
        options: [
          "Jangkauan",
          "Followers",
          "Engagement",
          "Penjualan",
          "Brand Awareness",
        ],
      },
      {
        name: "amount",
        label: "Jumlah konsep",
        type: "select",
        options: [
          "5 konsep",
          "10 konsep",
          "20 konsep",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah social media strategist profesional.

Jangan menjamin sebuah konten pasti viral.
Gunakan istilah "berpotensi mendapatkan engagement tinggi".

Buat strategi yang realistis untuk pemula.
`,
    buildPrompt: (v) => `
Buat ${v.amount} konsep konten untuk:

Produk/topik:
${v.product}

Target:
${v.target}

Platform:
${v.platform}

Jenis:
${v.contentType}

Tujuan:
${v.goal}

Untuk setiap konsep berikan:

1. Judul
2. Hook
3. Angle
4. Struktur konten
5. Script singkat
6. Ide visual
7. Caption
8. CTA
9. Alasan konsep ini menarik

Buat semuanya mudah dipraktikkan oleh pemula.
`,
    tutorial: [
      {
        title: "Masukkan produk atau topik",
        description:
          "Tulis produk atau topik yang ingin kamu jadikan bahan konten.",
      },
      {
        title: "Kenali target pasar",
        description:
          "Tulis siapa orang yang ingin kamu jangkau.",
      },
      {
        title: "Pilih jenis konten",
        description:
          "Pilih jenis konten yang paling cocok. Jika bingung, gunakan Campuran.",
      },
      {
        title: "Generate konsep",
        description:
          "AI akan membuat beberapa konsep lengkap beserta hook, script, visual, caption, dan CTA.",
      },
      {
        title: "Jangan mengejar viral saja",
        description:
          "Gunakan konsep yang relevan dengan target pasar. Konten yang mendapatkan penonton yang tepat lebih berguna daripada sekadar banyak views.",
      },
      {
        title: "Uji beberapa konsep",
        description:
          "Coba beberapa konsep lalu lihat mana yang mendapatkan respons terbaik. Gunakan hasil tersebut untuk membuat konten berikutnya.",
      },
    ],
  },
];

function getHistoryIcon(toolName: string) {
  const name = toolName.toLowerCase();

  if (name.includes("calendar")) return "📅";
  if (name.includes("ide")) return "💡";
  if (name.includes("carousel")) return "📸";
  if (name.includes("video")) return "🎬";
  if (name.includes("hook")) return "🎯";
  if (name.includes("viral")) return "🔥";

  return "✨";
}

function getHistoryPreview(prompt: string) {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return clean.length > 58 ? `${clean.slice(0, 58)}...` : clean;
}

export default function AIContent() {
  const [selectedTool, setSelectedTool] =
    useState("calendar");

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const [values, setValues] =
    useState<Record<string, string>>({});

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [asking, setAsking] = useState(false);

  const tool =
    tools.find((item) => item.id === selectedTool) ??
    tools[0];

  useEffect(() => {
  async function refreshHistory() {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error("Gagal membaca history:", error);
      setHistory([]);
    }
  }

  void refreshHistory();

  window.addEventListener("rife-history-updated", refreshHistory);
  window.addEventListener("storage", refreshHistory);

  return () => {
    window.removeEventListener("rife-history-updated", refreshHistory);
    window.removeEventListener("storage", refreshHistory);
  };
}, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function openHistory(item: HistoryItem) {
    setSelectedHistoryId(item.id);
    setResult(item.result);
    setQuestion("");
    setAnswer("");

    const toolName = item.tool.replace("Content Studio • ", "").trim();
    const matchedTool = tools.find((item) => item.title === toolName);

    if (matchedTool) {
      setSelectedTool(matchedTool.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectTool(toolId: string) {
    setSelectedTool(toolId);
    setValues({});
    setResult("");
    setQuestion("");
    setAnswer("");
  }

  function updateValue(
    name: string,
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleGenerate() {
    const missingField = tool.fields.find(
      (field) =>
        field.type !== "select" &&
        !values[field.name]?.trim()
    );

    if (missingField) {
      alert(
        `Silakan isi bagian "${missingField.label}" terlebih dahulu.`
      );
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const allowed = await canGenerate();

      if (!allowed) {
        setResult(
          "🚫 Limit generate kamu sudah habis.\n\nUpgrade ke BASIC untuk melanjutkan."
        );
        return;
      }

      const prompt = tool.buildPrompt(values);

      const ai = await generateText({
        systemPrompt: tool.systemPrompt,
        userPrompt: prompt,
      });

      await increaseUsage();

      setResult(ai);

      /*
       * SIMPAN KE HISTORY
       */
      saveHistory({
        id: crypto.randomUUID(),
        tool: `Content Studio • ${tool.title}`,
        prompt,
        result: ai,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(
        "CONTENT AI ERROR:",
        error
      );

      setResult(
        "Terjadi kesalahan saat membuat konten. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAskAI() {
    if (!question.trim()) {
      alert("Tulis pertanyaan terlebih dahulu.");
      return;
    }

    if (!result) {
      alert(
        "Generate hasil AI terlebih dahulu sebelum bertanya."
      );
      return;
    }

    setAsking(true);

    try {
      const allowed = await canGenerate();

      if (!allowed) {
        setAnswer(
          "🚫 Limit generate kamu sudah habis. Upgrade ke BASIC untuk melanjutkan."
        );
        return;
      }

      const ai = await generateText({
        systemPrompt: `
Kamu adalah asisten AI di Rife Digital AI.

Pengguna adalah pemula yang mungkin masih sangat awam.

Jawab dengan:
- bahasa Indonesia sederhana
- langkah yang jelas
- contoh konkret
- jangan menggunakan istilah rumit tanpa menjelaskannya

Kamu sedang membantu pengguna memahami hasil Content Studio.
`,
        userPrompt: `
Tools:
${tool.title}

Hasil AI:
${result}

Pertanyaan pengguna:
${question}

Jawab pertanyaan pengguna berdasarkan hasil AI di atas.

Jika pertanyaannya meminta langkah, berikan langkah bernomor.
Jika pengguna terlihat bingung, jelaskan dengan bahasa yang sangat sederhana.
`,
      });

      await increaseUsage();

      setAnswer(ai);
    } catch (error) {
      console.error(
        "CONTENT ASK AI ERROR:",
        error
      );

      setAnswer(
        "Terjadi kesalahan saat bertanya kepada AI."
      );
    } finally {
      setAsking(false);
    }
  }

  function handleClear() {
    setValues({});
    setResult("");
    setQuestion("");
    setAnswer("");
  }

              return (
    <DashboardLayout
      title="Content Studio"
      subtitle="Buat konten tanpa perlu bingung harus mulai dari mana."
    >
      <div className="mx-auto w-full min-w-0 max-w-[1500px] space-y-6 overflow-x-hidden">

        {/* HERO / INTRO */}
        <div className="relative overflow-hidden rounded-[28px] border border-yellow-400/15 bg-gradient-to-br from-yellow-400/[0.10] via-[#111111] to-[#0b0b0b] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/[0.08] blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/[0.07] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 sm:text-xs">
                <span>✨</span>
                Content Studio
              </div>

              <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Bikin Konten.
                <br />
                <span className="text-yellow-400">AI yang Pikirkan Sisanya.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                Nggak perlu jago marketing, nggak perlu pusing mencari ide.
                Pilih kebutuhanmu, isi beberapa informasi sederhana, lalu biarkan
                Rife membantu membuat kontennya.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-[360px]">
              {[
                ["01", "Pilih"],
                ["02", "Isi"],
                ["03", "Generate"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-black/20 p-3 text-center sm:p-4"
                >
                  <div className="text-[10px] font-black text-yellow-400 sm:text-xs">
                    {number}
                  </div>
                  <p className="mt-1 text-xs font-bold text-white sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="grid w-full min-w-0 max-w-full gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">

          {/* HISTORY */}
          <aside className="h-fit w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f] p-4 sm:p-5 xl:sticky xl:top-24">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                  Workspace
                </p>
                <h2 className="mt-1 text-xl font-black text-white">
                  Hasil Sebelumnya
                </h2>
              </div>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
                {history.length}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.04] p-4">
              <p className="text-xs leading-5 text-gray-400">
                Semua hasil Content Studio yang kamu buat akan tersimpan di sini,
                jadi kamu nggak perlu membuatnya dari awal lagi.
              </p>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">
                Riwayat Generate
              </p>

              {history.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-[#111111] p-5 text-center">
                  <div className="text-2xl">📂</div>
                  <p className="mt-2 text-sm font-bold text-gray-400">
                    Belum ada hasil
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    Generate konten pertamamu. Hasilnya akan otomatis muncul di sini.
                  </p>
                </div>
              ) : (
                <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openHistory(item)}
                      className={`block w-full min-w-0 max-w-full overflow-hidden rounded-2xl border p-3 text-left transition ${
                        selectedHistoryId === item.id
                          ? "border-yellow-400/40 bg-yellow-500/10"
                          : "border-white/5 bg-[#151515] hover:border-yellow-400/25 hover:bg-[#181818]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-base">
                          {getHistoryIcon(item.tool)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-white">
                            {item.tool.replace("Content Studio • ", "")}
                          </p>
                          <p className="mt-1 truncate text-[11px] text-gray-500">
                            {getHistoryPreview(item.prompt)}
                          </p>
                          <p className="mt-1.5 text-[10px] text-gray-600">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* MAIN */}
          <div className="w-full min-w-0 max-w-full space-y-6 overflow-hidden">

            {/* TOOL SELECTOR */}
            <section className="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f] p-5 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    Langkah 1
                  </p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Kamu mau bikin apa?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Pilih satu. Kalau kamu masih bingung, mulai dari{" "}
                    <span className="font-semibold text-gray-300">
                      Ide Konten
                    </span>
                    .
                  </p>
                </div>

                <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-gray-500 sm:block">
                  {tools.length} tools tersedia
                </div>
              </div>

              <div className="mt-6 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((item) => {
                  const active = selectedTool === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectTool(item.id)}
                      className={`group relative min-w-0 max-w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                        active
                          ? "border-yellow-400/40 bg-yellow-500/[0.08] shadow-[0_10px_35px_rgba(234,179,8,.06)]"
                          : "border-white/10 bg-[#151515] hover:-translate-y-0.5 hover:border-yellow-400/20 hover:bg-[#181818]"
                      }`}
                    >
                      {active && (
                        <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-2 py-1 text-[8px] font-black uppercase tracking-wider text-black">
                          Dipilih
                        </div>
                      )}

                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition ${
                          active
                            ? "bg-yellow-400 text-black"
                            : "bg-white/5 group-hover:bg-yellow-400/10"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <h3 className="mt-4 text-sm font-black text-white sm:text-base">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-500">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* FORM */}
            <section className="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f] p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-black shadow-lg shadow-yellow-400/10">
                    {tool.icon}
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                      Langkah 2
                    </p>
                    <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                      {tool.title}
                    </h2>
                  </div>
                </div>

                <div className="rounded-full border border-green-400/10 bg-green-400/[0.05] px-3 py-1.5 text-[10px] font-bold text-green-400">
                  ✓ Dibuat untuk pemula
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-yellow-400/15 bg-gradient-to-r from-yellow-400/[0.07] to-transparent p-4 sm:p-5">
                <div className="flex gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="text-sm font-bold text-yellow-400">
                      Nggak tahu harus isi apa?
                    </p>
                    <p className="mt-1 text-xs leading-6 text-gray-400 sm:text-sm">
                      Tulis saja dengan bahasa sehari-hari. Nggak harus rapi dan
                      nggak perlu tahu istilah marketing.
                      <span className="font-semibold text-gray-200">
                        {" "}Contoh: “Saya jual ebook Canva untuk guru.”
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {tool.fields.map((field) => {
                  if (field.type === "textarea") {
                    return (
                      <div key={field.name} className="md:col-span-2">
                        <label className="mb-2 block text-sm font-bold text-gray-300">
                          {field.label}
                        </label>

                        <textarea
                          value={values[field.name] ?? ""}
                          onChange={(e) =>
                            updateValue(field.name, e.target.value)
                          }
                          placeholder={field.placeholder}
                          rows={5}
                          className="w-full resize-none rounded-2xl border border-white/10 bg-[#151515] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/60 focus:bg-[#181818] focus:ring-4 focus:ring-yellow-400/[0.05]"
                        />
                      </div>
                    );
                  }

                  if (field.type === "select") {
                    return (
                      <div key={field.name}>
                        <label className="mb-2 block text-sm font-bold text-gray-300">
                          {field.label}
                        </label>

                        <select
                          value={
                            values[field.name] ?? field.options?.[0] ?? ""
                          }
                          onChange={(e) =>
                            updateValue(field.name, e.target.value)
                          }
                          className="w-full appearance-none rounded-2xl border border-white/10 bg-[#151515] px-5 py-4 text-sm text-white outline-none transition focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/[0.05]"
                        >
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={field.name}>
                      <label className="mb-2 block text-sm font-bold text-gray-300">
                        {field.label}
                      </label>

                      <input
                        value={values[field.name] ?? ""}
                        onChange={(e) =>
                          updateValue(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-full rounded-2xl border border-white/10 bg-[#151515] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/60 focus:bg-[#181818] focus:ring-4 focus:ring-yellow-400/[0.05]"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-7 py-4 text-sm font-black text-black shadow-lg shadow-yellow-400/10 transition hover:-translate-y-0.5 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "⚡ AI sedang bekerja..."
                    : `${tool.icon} Buat dengan AI`}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={loading}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-bold text-gray-300 transition hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
                >
                  Bersihkan
                </button>
              </div>

              <p className="mt-3 text-center text-[11px] text-gray-600">
                Kamu cukup isi informasinya. Rife yang membantu menyusun hasilnya.
              </p>
            </section>

            {/* RESULT */}
            <section className="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f] p-5 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    Langkah 3
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-white">
                    Hasil untuk Kamu
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {result
                      ? `Hasil dari ${tool.title} siap digunakan.`
                      : "Belum ada hasil. Isi form lalu mulai generate."}
                  </p>
                </div>

                {result && (
                  <span className="inline-flex w-fit items-center rounded-full border border-green-400/20 bg-green-400/[0.06] px-3 py-1.5 text-xs font-bold text-green-400">
                    ✓ Selesai
                  </span>
                )}
              </div>

              {!result && !loading && (
                <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-[#151515] p-10 text-center sm:p-14">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/[0.08] text-2xl">
                    ✨
                  </div>
                  <h3 className="mt-4 text-lg font-black text-white">
                    Hasilmu akan muncul di sini
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Nggak perlu takut salah. Mulai saja dengan informasi yang
                    kamu punya, lalu biarkan AI membantu.
                  </p>
                </div>
              )}

              {loading && (
                <div className="mt-6 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.04] p-10 text-center sm:p-14">
                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />
                  <h3 className="mt-5 text-lg font-black text-white">
                    Rife sedang membuatkan kontenmu...
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Tunggu sebentar. Kamu nggak perlu melakukan apa-apa.
                  </p>
                </div>
              )}

              {result && !loading && (
                <>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]">
                    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 sm:px-5">
                      <p className="text-xs font-bold text-gray-400">
                        Output AI
                      </p>

                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(result)}
                        className="rounded-xl bg-yellow-400 px-4 py-2 text-xs font-black text-black transition hover:bg-yellow-300"
                      >
                        📋 Copy
                      </button>
                    </div>

                    <pre className="max-h-[650px] overflow-auto whitespace-pre-wrap p-5 font-sans text-sm leading-7 text-gray-300 sm:p-6">
                      {result}
                    </pre>
                  </div>

                  {/* TUTORIAL */}
                  <div className="mt-6 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.04] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-xl text-black">
                        📚
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white sm:text-xl">
                          Setelah ini harus ngapain?
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          Ikuti langkah sederhana ini kalau kamu masih bingung.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {tool.tutorial.map((step, index) => (
                        <div
                          key={step.title}
                          className="rounded-2xl border border-white/10 bg-[#151515] p-4 sm:p-5"
                        >
                          <div className="flex gap-3 sm:gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-xs font-black text-black">
                              {index + 1}
                            </div>

                            <div>
                              <h4 className="font-bold text-white">
                                {step.title}
                              </h4>
                              <p className="mt-1.5 text-xs leading-6 text-gray-400 sm:text-sm">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ASK AI */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-[#111111] p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-xl text-black">
                        💬
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white sm:text-xl">
                          Masih bingung?
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          Tanyakan hasil ini langsung ke Rife.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Saya harus mulai dari mana?",
                        "Jelaskan lebih sederhana.",
                        "Berikan contoh untuk pemula.",
                        "Bagaimana cara menerapkannya?",
                      ].map((text) => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => setQuestion(text)}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-gray-300 transition hover:border-yellow-400/30 hover:bg-yellow-400/[0.05] hover:text-yellow-400"
                        >
                          {text}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-[#171717] p-4">
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleAskAI();
                          }
                        }}
                        rows={3}
                        placeholder="Contoh: Saya masih pemula, langkah pertama yang harus saya lakukan apa?"
                        className="w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-gray-600"
                      />

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[10px] text-gray-600">
                          Enter untuk mengirim • Shift + Enter untuk baris baru
                        </p>

                        <button
                          type="button"
                          onClick={handleAskAI}
                          disabled={asking || !question.trim()}
                          className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {asking ? "AI sedang menjawab..." : "Tanya Rife →"}
                        </button>
                      </div>
                    </div>

                    {answer && (
                      <div className="mt-4 rounded-2xl border border-green-400/15 bg-green-400/[0.04] p-5">
                        <div className="flex items-center gap-2">
                          <span>🤖</span>
                          <p className="text-sm font-black text-green-400">
                            Jawaban Rife
                          </p>
                        </div>

                        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">
                          {answer}
                        </pre>
                      </div>
                    )}
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}