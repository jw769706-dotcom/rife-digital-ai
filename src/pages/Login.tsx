import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { signIn, signUp } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      alert("Lengkapi email dan password.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);

        console.log("LOGIN BERHASIL → AKAN KE DASHBOARD");

        navigate("/dashboard");
      } else {
        await signUp(email, password);

        alert(
          "Registrasi berhasil. Silakan login dengan akun yang sudah dibuat."
        );

        setIsLogin(true);
      }
    } catch (err: any) {
      console.error("AUTH ERROR:", err);

      alert(err?.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070707] text-white">
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-400/[0.035] blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-220px] left-[-150px] h-[400px] w-[400px] rounded-full bg-yellow-400/[0.02] blur-[120px]" />

      {/* HEADER */}

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg font-black text-black shadow-[0_0_30px_rgba(250,204,21,0.12)] transition-transform duration-200 group-hover:scale-105">
            R
          </div>

          <div className="text-left">
            <p className="text-sm font-black tracking-tight text-white sm:text-base">
              Rife <span className="text-yellow-400">Digital AI</span>
            </p>

            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-gray-600">
              Build Faster with AI
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          disabled={loading}
          className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-[11px] font-bold text-gray-400 transition hover:border-yellow-400/20 hover:text-white disabled:opacity-50 sm:px-5 sm:py-2.5 sm:text-xs"
        >
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
          <span className="ml-1.5 text-yellow-400">
            {isLogin ? "Daftar" : "Masuk"}
          </span>
        </button>
      </header>

      {/* MAIN */}

      <main className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10">
        <div
          className={`w-full ${
            isLogin ? "max-w-md" : "max-w-5xl"
          }`}
        >
          {isLogin ? (
            /* =================================================
               LOGIN
            ================================================== */

            <div className="mx-auto">
              <div className="rounded-[28px] border border-white/[0.08] bg-[#101010]/95 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-9">
                {/* HEADER */}

                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.07]">
                    <LockKeyhole
                      size={23}
                      className="text-yellow-400"
                    />
                  </div>

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                    Welcome Back
                  </p>

                  <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                    Selamat Datang
                  </h1>

                  <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-gray-500 sm:text-sm">
                    Masuk ke workspace Rife Digital AI dan lanjutkan
                    perjalanan membangun bisnis digitalmu.
                  </p>
                </div>

                {/* FORM */}

                <div className="mt-8 space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                      />

                      <input
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-white/[0.08] bg-[#171717] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400/40 focus:bg-[#191919]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                      />

                      <input
                        type="password"
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-white/[0.08] bg-[#171717] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400/40 focus:bg-[#191919]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3.5 text-sm font-black text-black shadow-[0_10px_30px_rgba(250,204,21,0.10)] transition hover:bg-yellow-300 hover:shadow-[0_12px_35px_rgba(250,204,21,0.16)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      "Memproses..."
                    ) : (
                      <>
                        Masuk ke Dashboard
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* FOOTER */}

                <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
                  <p className="text-[11px] text-gray-600">
                    Belum punya akun?
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      disabled={loading}
                      className="ml-1.5 font-bold text-yellow-400 transition hover:text-yellow-300 disabled:opacity-50"
                    >
                      Buat akun sekarang
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* =================================================
               REGISTER
            ================================================== */

            <div className="grid overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#101010]/95 shadow-2xl shadow-black/50 backdrop-blur-xl lg:grid-cols-[1fr_0.9fr]">
              {/* LEFT — BRAND / VALUE */}

              <div className="relative overflow-hidden border-b border-white/[0.06] p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-yellow-400/[0.05] blur-[90px]" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/15 bg-yellow-400/[0.05] px-3 py-1.5">
                    <Sparkles
                      size={12}
                      className="text-yellow-400"
                    />

                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-yellow-400">
                      Start Your Journey
                    </span>
                  </div>

                  <h1 className="mt-6 max-w-lg text-3xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
                    Bangun bisnis digitalmu
                    <span className="text-yellow-400">
                      {" "}
                      mulai dari sini.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500">
                    Satu workspace untuk membantu kamu menemukan ide,
                    membuat produk digital, menghasilkan konten, dan
                    memasarkan bisnis dengan bantuan AI.
                  </p>

                  {/* BENEFITS */}

                  <div className="mt-8 space-y-3">
                    {[
                      "Buat produk digital lebih cepat",
                      "Generate konten & copywriting dengan AI",
                      "Temukan ide produk yang bisa dijual",
                      "Semua tools berada dalam satu workspace",
                    ].map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400/[0.08]">
                          <Check
                            size={13}
                            className="text-yellow-400"
                            strokeWidth={2.5}
                          />
                        </div>

                        <span className="text-xs text-gray-400 sm:text-sm">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* TRUST */}

                  <div className="mt-9 flex items-center gap-3 border-t border-white/[0.06] pt-6">
                    <ShieldCheck
                      size={18}
                      className="shrink-0 text-yellow-400"
                    />

                    <p className="text-[10px] leading-5 text-gray-600">
                      Buat akunmu dan akses workspace Rife Digital AI
                      secara aman.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT — REGISTER FORM */}

              <div className="p-7 sm:p-10">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-yellow-400">
                    Create Account
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                    Buat akunmu
                  </h2>

                  <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                    Mulai workspace bisnis digitalmu dalam beberapa
                    langkah.
                  </p>
                </div>

                {/* FORM */}

                <div className="mt-7 space-y-4">
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                      />

                      <input
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-white/[0.08] bg-[#171717] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400/40 focus:bg-[#191919]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                      />

                      <input
                        type="password"
                        placeholder="Buat password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-white/[0.08] bg-[#171717] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-yellow-400/40 focus:bg-[#191919]"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                    <div className="flex gap-2.5">
                      <ShieldCheck
                        size={15}
                        className="mt-0.5 shrink-0 text-yellow-400"
                      />

                      <p className="text-[10px] leading-5 text-gray-600">
                        Gunakan password yang kuat dan jangan bagikan
                        informasi login kepada siapa pun.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3.5 text-sm font-black text-black shadow-[0_10px_30px_rgba(250,204,21,0.10)] transition hover:bg-yellow-300 hover:shadow-[0_12px_35px_rgba(250,204,21,0.16)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      "Membuat akun..."
                    ) : (
                      <>
                        Buat Akun & Mulai
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>

                {/* LOGIN SWITCH */}

                <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
                  <p className="text-[11px] text-gray-600">
                    Sudah punya akun?
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      disabled={loading}
                      className="ml-1.5 font-bold text-yellow-400 transition hover:text-yellow-300 disabled:opacity-50"
                    >
                      Masuk ke akun
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}