import { supabase } from "./supabase";

export type HistoryItem = {
  id: string;
  tool: string;
  prompt: string;
  result: string;
  createdAt: string;
};

const LEGACY_KEY = "rife-history";

async function getUserHistoryKey(): Promise<string | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Gagal mengambil user untuk history:", error);
    return null;
  }

  if (!user) {
    return null;
  }

  return `rife-history-${user.id}`;
}

/**
 * Mengambil semua history generate AI
 * khusus untuk user yang sedang login.
 */
export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const key = await getUserHistoryKey();

    if (!key) {
      return [];
    }

    let data = localStorage.getItem(key);

    /*
     * Migrasi history lama.
     *
     * Kalau user sebelumnya sudah punya history dari sistem lama,
     * kita pindahkan history tersebut ke akun yang sedang login.
     */
    if (!data) {
      const legacyData = localStorage.getItem(LEGACY_KEY);

      if (legacyData) {
        localStorage.setItem(key, legacyData);
        localStorage.removeItem(LEGACY_KEY);
        data = legacyData;
      }
    }

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("Gagal membaca history:", error);
    return [];
  }
}

/**
 * Menyimpan hasil generate AI
 * khusus untuk user yang sedang login.
 */
export async function saveHistory(item: HistoryItem): Promise<void> {
  try {
    const key = await getUserHistoryKey();

    if (!key) {
      console.warn("History tidak disimpan karena user belum login.");
      return;
    }

    const history = await getHistory();

    const newItem: HistoryItem = {
      id: item.id || crypto.randomUUID(),
      tool: item.tool,
      prompt: item.prompt,
      result: item.result,
      createdAt: item.createdAt || new Date().toISOString(),
    };

    history.unshift(newItem);

    localStorage.setItem(key, JSON.stringify(history));

    window.dispatchEvent(new Event("rife-history-updated"));
  } catch (error) {
    console.error("Gagal menyimpan history:", error);
  }
}

/**
 * Helper untuk membuat history item baru.
 */
export function createHistoryItem(
  tool: string,
  prompt: string,
  result: string
): HistoryItem {
  return {
    id: crypto.randomUUID(),
    tool,
    prompt,
    result,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Menghapus satu history berdasarkan ID.
 */
export async function deleteHistory(id: string): Promise<void> {
  try {
    const key = await getUserHistoryKey();

    if (!key) {
      return;
    }

    const history = await getHistory();

    const filtered = history.filter((item) => item.id !== id);

    localStorage.setItem(key, JSON.stringify(filtered));

    window.dispatchEvent(new Event("rife-history-updated"));
  } catch (error) {
    console.error("Gagal menghapus history:", error);
  }
}

/**
 * Menghapus seluruh history user yang sedang login.
 */
export async function clearHistory(): Promise<void> {
  try {
    const key = await getUserHistoryKey();

    if (!key) {
      return;
    }

    localStorage.removeItem(key);

    window.dispatchEvent(new Event("rife-history-updated"));
  } catch (error) {
    console.error("Gagal menghapus seluruh history:", error);
  }
}