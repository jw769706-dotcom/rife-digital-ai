import { supabase } from "./supabase";

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signUp(email: string, password: string) {
  console.log("SIGN UP: mulai");

  try {
    const result = await Promise.race([
      supabase.auth.signUp({
        email,
        password,
      }),

      new Promise((_, reject) =>
        setTimeout(() => {
          reject(
            new Error(
              "Koneksi ke server terlalu lama. Silakan cek koneksi internet atau konfigurasi Supabase."
            )
          );
        }, 15000)
      ),
    ]);

    const { data, error } = result as {
      data: any;
      error: any;
    };

    console.log("SIGN UP: response diterima");
    console.log("SIGN UP DATA:", data);
    console.log("SIGN UP ERROR:", error);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("SIGN UP FAILED:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Registrasi gagal. Silakan coba lagi.");
  }
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}