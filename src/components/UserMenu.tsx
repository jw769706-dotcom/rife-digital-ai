import { useEffect, useState } from "react";
import { getUser, signOut } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();

      if (user) {
        setEmail(user.email || "");
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <div className="flex w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#151515] p-3 sm:p-4">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400 sm:text-sm">
          Login sebagai
        </p>

        <p
          className="mt-1 truncate text-sm font-semibold text-white sm:text-base"
          title={email}
        >
          {email || "Memuat..."}
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="shrink-0 rounded-xl bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 sm:px-4 sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
}