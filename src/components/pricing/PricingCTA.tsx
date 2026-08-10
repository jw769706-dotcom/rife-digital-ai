import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingCTA() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-28">

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-[40px] border border-yellow-400/20 bg-gradient-to-br from-yellow-500/10 via-[#111111] to-[#090909] p-14 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-black">

            <Sparkles size={38} />

          </div>

          <h2 className="mt-10 text-5xl font-black leading-tight text-white">

            Siap Membangun
            <br />

            <span className="text-yellow-400">

              Bisnis Digital

            </span>

            <br />

            Bersama AI?

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-300">

            Tidak perlu jago AI.

            <br />

            Tidak perlu jago menulis.

            <br />

            Tidak perlu belajar prompt.

            <br /><br />

            Tinggal isi form.

            Klik <span className="font-bold text-yellow-400">Generate</span>.

            AI akan membantu membuat konten, produk digital,
            landing page, copywriting,
            caption, hingga ide bisnis untukmu.

          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

            <Link
              to="/login"
              className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-10 py-5 text-lg font-black text-black transition hover:scale-105 hover:bg-yellow-300"
            >
              🚀 Mulai Gratis

              <ArrowRight size={20} />

            </Link>

            <Link
              to="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-bold text-white transition hover:bg-white/10"
            >
              Lihat Semua Paket
            </Link>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div>

              <h3 className="text-4xl font-black text-yellow-400">

                50+

              </h3>

              <p className="mt-2 text-gray-400">

                AI Tools

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-yellow-400">

                ∞

              </h3>

              <p className="mt-2 text-gray-400">

                Generate Tanpa Batas

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-yellow-400">

                24/7

              </h3>

              <p className="mt-2 text-gray-400">

                AI Siap Membantu

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}