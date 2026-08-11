import { useState } from "react";
import SubscriptionGuard from "../components/SubscriptionGuard";
import { supabase } from "../lib/supabase";

import ProductHeader from "../components/aiproduct/ProductHeader";
import ProductSidebar from "../components/aiproduct/ProductSidebar";
import ProductForm from "../components/aiproduct/ProductForm";
import ProductResult from "../components/aiproduct/ProductResult";

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
      <div className="min-h-screen w-full bg-[#0A0A0A] text-white">
        {/* Header */}
        <div className="w-full border-b border-white/5">
          <ProductHeader />
        </div>

        {/* Main Workspace */}
        <div className="w-full px-6 py-8 lg:px-8 xl:px-10">
          <div className="mx-auto grid w-full max-w-[1600px] items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">

            {/* Sidebar */}
            <aside className="w-full rounded-3xl border border-white/10 bg-[#111111] p-6">
              <ProductSidebar
                onSelectProject={handleSelectProject}
              />
            </aside>

            {/* Main Content */}
            <main className="min-w-0 space-y-8">

              {/* Generator */}
              <section className="w-full rounded-3xl border border-white/10 bg-[#111111] p-6 lg:p-8">
                <ProductForm onResult={handleGenerated} />
              </section>

              {/* AI Result */}
              <section className="relative w-full rounded-3xl border border-white/10 bg-[#111111] p-6 lg:p-8">

                {loadingProject && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-[#111111]/90 backdrop-blur-sm">
                    <div className="text-center">

                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

                      <p className="mt-4 text-sm text-gray-400">
                        Memuat project...
                      </p>

                    </div>
                  </div>
                )}

                <ProductResult result={result} />

              </section>

            </main>
          </div>
        </div>
      </div>
    </SubscriptionGuard>
  );
}