import { lazy, Suspense, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import SubscriptionGuard from "../components/SubscriptionGuard";

import { supabase } from "../lib/supabase";

import ProductSidebar from "../components/aiproduct/ProductSidebar";
import ProductForm from "../components/aiproduct/ProductForm";

const ProductResult = lazy(
  () => import("../components/aiproduct/ProductResult")
);

export type ProductAIResult = {
  productName: string;
  targetMarket: string[];
  recommendedPrice: string;
  valueProposition: string;
  launchStrategy: string[];
  estimatedProfit: string;

  tutorial: {
    title: string;
    steps: string[];
  }[];

  actionPlan: {
    day: string;
    task: string;
  }[];
};

export default function AIProduct() {
  const [result, setResult] = useState<ProductAIResult | null>(null);
  const [loadingProject, setLoadingProject] = useState(false);

  async function handleSelectProject(projectId: string) {
    try {
      setLoadingProject(true);

      const { data, error } = await supabase
        .from("ai_projects")
        .select("result")
        .eq("id", projectId)
        .single();

      if (error) {
        console.error("Gagal mengambil project:", error);
        alert("Gagal mengambil project.");
        return;
      }

      if (!data?.result) {
        alert("Hasil AI project ini tidak ditemukan.");
        return;
      }

      setResult(data.result as ProductAIResult);
    } catch (error) {
      console.error("LOAD PROJECT ERROR:", error);
      alert("Terjadi kesalahan saat mengambil project.");
    } finally {
      setLoadingProject(false);
    }
  }

  function handleGenerated(newResult: ProductAIResult) {
    setResult(newResult);
  }

  return (
    <SubscriptionGuard required="BASIC">
      <DashboardLayout
        title="Product Studio"
        subtitle="Buat produk digital dari ide sampai siap dijual."
      >
        <div className="w-full min-w-0 overflow-x-hidden bg-[#080808] text-white">
          <div className="mx-auto w-full min-w-0 max-w-[1400px] space-y-6">
            {/* HERO */}
            <section className="relative overflow-hidden rounded-[28px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.11] via-[#111111] to-[#0b0b0b] p-6 sm:rounded-[32px] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-yellow-400/[0.08] blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-yellow-400/[0.04] blur-3xl" />

              <div className="relative max-w-4xl">
                <div className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/[0.07] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-yellow-400 sm:text-xs">
                  ✨ PRODUCT STUDIO
                </div>

                <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Punya ide produk?
                  <br />
                  <span className="text-yellow-400">
                    Biar Rife bantu menyusunnya.
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                  Nggak perlu tahu harus mulai dari mana. Ceritakan ide atau
                  masalah yang ingin kamu selesaikan, lalu Rife membantu
                  menyusun produk, target pembeli, harga, strategi launching,
                  sampai langkah yang bisa kamu lakukan berikutnya.
                </p>

                {/* SIMPLE FLOW */}
                <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
                  {[
                    ["01", "Ceritakan", "Ide atau keinginanmu"],
                    ["02", "Rife Menyusun", "Produk & strateginya"],
                    ["03", "Siap Mulai", "Ikuti langkahnya"],
                  ].map(([number, title, description]) => (
                    <div
                      key={number}
                      className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-[10px] font-black text-black">
                        {number}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-black text-white sm:text-sm">
                          {title}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:text-xs">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WORKSPACE */}
            <div className="grid w-full min-w-0 max-w-full items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
              {/* PROJECT SIDEBAR */}
              <aside className="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f]">
                <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-yellow-400">
                    WORKSPACE
                  </p>

                  <h2 className="mt-2 text-lg font-black text-white">
                    Project Kamu
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Pilih project lama kalau ingin melanjutkannya.
                  </p>
                </div>

                <div className="min-w-0 p-4 sm:p-5">
                  <ProductSidebar onSelectProject={handleSelectProject} />
                </div>
              </aside>

              {/* MAIN */}
              <main className="w-full min-w-0 max-w-full space-y-6">
                {/* GENERATOR */}
                <section className="w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f]">
                  <div className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-lg text-black shadow-lg shadow-yellow-400/10">
                        💡
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                          LANGKAH 1
                        </p>

                        <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                          Ceritakan produk yang ingin kamu buat
                        </h2>

                        <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
                          Bingung? Nggak apa-apa. Isi sebisanya, Rife akan
                          membantu menyusun sisanya.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 p-5 sm:p-7 lg:p-8">
                    <ProductForm onResult={handleGenerated} />
                  </div>
                </section>

                {/* RESULT */}
                <section className="relative w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f]">
                  <div className="border-b border-white/10 px-5 py-5 sm:px-7 sm:py-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                      HASIL DARI RIFE
                    </p>

                    <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                      Produk & langkah berikutnya
                    </h2>

                    <p className="mt-1.5 text-xs leading-5 text-gray-500 sm:text-sm">
                      Setelah selesai, hasil produkmu akan muncul di sini.
                    </p>
                  </div>

                  {loadingProject && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f0f]/90 p-6 backdrop-blur-sm">
                      <div className="rounded-2xl border border-white/10 bg-[#151515] px-6 py-5 text-center shadow-2xl">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

                        <p className="mt-4 text-sm font-semibold text-white">
                          Memuat project...
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Sebentar, kami mengambil hasil sebelumnya.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="min-w-0 p-5 sm:p-7 lg:p-8">
                    {result ? (
                      <Suspense
                        fallback={
                          <div className="flex min-h-[200px] items-center justify-center">
                            <div className="text-center">
                              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />

                              <p className="mt-4 text-sm text-gray-500">
                                Menyiapkan hasil...
                              </p>
                            </div>
                          </div>
                        }
                      >
                        <ProductResult result={result} />
                      </Suspense>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-[#0b0b0b] px-5 py-10 text-center sm:px-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-2xl">
                          📦
                        </div>

                        <h3 className="mt-5 text-lg font-black text-white sm:text-xl">
                          Belum ada produk yang dibuat
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                          Mulai dari form di atas. Kamu cukup menjelaskan
                          keinginanmu dengan bahasa sehari-hari.
                        </p>

                        <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-left sm:grid sm:grid-cols-3">
                          {[
                            "💡 Cari ide",
                            "📦 Susun produk",
                            "🚀 Siapkan jualan",
                          ].map((item) => (
                            <div
                              key={item}
                              className="rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-center text-xs font-semibold text-gray-400"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* BEGINNER NOTE */}
                <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.05] px-5 py-4 sm:px-6">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">🤝</span>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">
                        Masih bingung?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        Nggak perlu membuat prompt yang rumit. Tulis saja
                        seperti sedang bercerita ke teman. Rife akan membantu
                        menerjemahkannya menjadi langkah bisnis.
                      </p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </SubscriptionGuard>
  );
}