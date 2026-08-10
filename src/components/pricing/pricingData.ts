import {
  Rocket,
  Crown,
  Gift,
  Sparkles,
  Infinity,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const plans = [
  {
    id: "FREE",

    name: "GRATIS",

    price: "Rp0",

    monthly: "",

    featured: false,

    badge: "",

    button: "Mulai Gratis",

    value: "",

    icon: Sparkles,

    subtitle:
      "Coba semua AI sebelum memutuskan upgrade.",

    features: [
      "5 generate AI setiap hari",
      "Bisa mencoba semua AI Tools",
      "Buat Caption Instagram",
      "Buat Copywriting",
      "Buat Ide Konten",
      "Buat Landing Page",
      "Copy hasil AI",
    ],

    disabled: [
      "Generate tanpa batas",
      "Semua hasil tersimpan",
      "Semua AI Premium",
      "Update fitur terbaru",
    ],
  },

  {
    id: "BASIC",

    name: "BASIC",

    price: "Rp49.000",

    monthly: "/bulan",

    featured: true,

    badge: "🔥 PALING BANYAK DIPILIH",

    button: "🚀 Buka Semua Fitur",

    value: "BASIC",

    icon: Rocket,

    subtitle:
      "Mulai membuat produk digital, konten, dan promosi lebih cepat walaupun belum pernah menggunakan AI.",

    features: [
      "Generate AI tanpa batas",
      "Buat Ebook siap jual",
      "Buat Template Canva",
      "Buat Produk Digital",
      "Buat Worksheet",
      "Buat Digital Planner",
      "Buat Landing Page",
      "Buat Copywriting",
      "Buat Caption Instagram",
      "Buat Script Reels & TikTok",
      "Buat Ide Konten setiap hari",
      "Buat Ide Produk Digital",
      "Semua hasil tersimpan otomatis",
      "Semua AI Tools terbuka",
      "Tidak perlu belajar Prompt",
      "Cocok untuk pemula",
      "Update fitur terbaru GRATIS",
    ],

    disabled: [],
  },

  {
    id: "PRO",

    name: "PRO",

    price: "Rp99.000",

    monthly: "/bulan",

    featured: false,

    badge: "👑 UNTUK BISNIS",

    button: "👑 Upgrade PRO",

    value: "PRO",

    icon: Crown,

    subtitle:
      "Untuk yang menggunakan AI setiap hari dan ingin hasil lebih cepat.",

    features: [
      "Semua fitur BASIC",
      "Server lebih cepat",
      "Prioritas Generate",
      "Template Premium",
      "AI terbaru lebih dulu",
      "Prioritas bantuan",
      "Semua update otomatis",
      "Konsultasi private 1:1 by WhatsApp ",
    ],

    disabled: [],
  },
];

export const basicBonuses = [
  {
    icon: Gift,
    title: "BONUS KHUSUS",
    items: [
      "Semua AI Tools baru otomatis terbuka.",
      "Update fitur tanpa biaya tambahan.",
      "Prioritas mencoba fitur terbaru.",
    ],
  },
];

export const basicTarget = [
  "Pengangguran",
  "Mahasiswa",
  "UMKM",
  "Content Creator",
  "Karyawan",
  "Ibu Rumah Tangga",
  "Affiliate",
  "Pebisnis Digital",
];

export const basicHighlight = [
  {
    icon: Infinity,
    title: "Unlimited",
    desc: "Generate AI sepuasnya tanpa batas setiap hari.",
  },
  {
    icon: ShieldCheck,
    title: "Mudah Dipakai",
    desc: "Tidak perlu belajar AI atau membuat prompt.",
  },
  {
    icon: Zap,
    title: "Lebih Cepat",
    desc: "Semua pekerjaan selesai hanya dalam hitungan detik.",
  },
];