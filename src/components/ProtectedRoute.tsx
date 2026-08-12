import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      try {
        // Supabase hanya di-load ketika ProtectedRoute benar-benar digunakan.
        const { supabase } = await import("../services/supabase");

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        setLoggedIn(!!session);
      } catch (error) {
        console.error("Gagal mengecek session:", error);

        if (!mounted) return;

        setLoggedIn(false);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkUser();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}