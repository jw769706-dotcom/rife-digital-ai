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
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#151515] p-4">
      <div>
        <p className="text-sm text-gray-400">Login sebagai</p>
        <p className="font-semibold text-white">{email}</p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}