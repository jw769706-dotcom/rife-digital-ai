import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        // Setelah login berhasil, masuk ke Dashboard
        navigate("/dashboard");
      } else {
        await signUp(email, password);

        alert("Registrasi berhasil. Silakan login.");

        // Setelah daftar, kembali ke mode Login
        setIsLogin(true);
      }
    } catch (err: any) {
      console.error("AUTH ERROR:", err);
      alert(err?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090909] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-10">
        <h1 className="text-center text-4xl font-black text-white">
          Rife Digital AI
        </h1>

        <p className="mt-3 text-center text-gray-400">
          {isLogin ? "Login ke akunmu" : "Buat akun baru"}
        </p>

        <div className="mt-10 space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Daftar"}
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-sm text-yellow-400"
          >
            {isLogin
              ? "Belum punya akun? Daftar"
              : "Sudah punya akun? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}