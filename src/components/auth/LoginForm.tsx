import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../services/supabase";
import { signInWithGoogle } from "../../services/auth";

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  }

  async function handleGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      alert("Login Google gagal.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-10">

      <h1 className="text-center text-5xl font-black text-white">
        Rife Digital AI
      </h1>

      <p className="mt-4 text-center text-gray-400">
        Login ke akunmu
      </p>

      <input
        className="mt-10 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-5 py-4 text-white outline-none"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mt-5 w-full rounded-2xl border border-white/10 bg-[#1C1C1C] px-5 py-4 text-white outline-none"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <button
        onClick={handleGoogle}
        className="mt-4 w-full rounded-2xl border border-white/10 bg-white py-4 font-bold text-black"
      >
        Lanjutkan dengan Google
      </button>

      <p className="mt-8 text-center text-yellow-400">
        Belum punya akun? Daftar
      </p>

    </div>
  );
}