export type HistoryItem = {
  id: string;
  tool: string;
  prompt: string;
  result: string;
  createdAt: string;
};

const KEY = "rife-history";

/**
 * Mengambil semua history generate AI
 */
export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(KEY);

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
 * Menyimpan hasil generate AI ke history
 */
export function saveHistory(item: HistoryItem) {
  try {
    const history = getHistory();

    const newItem: HistoryItem = {
      id: item.id || crypto.randomUUID(),
      tool: item.tool,
      prompt: item.prompt,
      result: item.result,
      createdAt: item.createdAt || new Date().toISOString(),
    };

    history.unshift(newItem);

    localStorage.setItem(KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Gagal menyimpan history:", error);
  }
}

/**
 * Helper untuk membuat history item baru
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
 * Menghapus satu history berdasarkan ID
 */
export function deleteHistory(id: string) {
  try {
    const history = getHistory();

    const filtered = history.filter((item) => item.id !== id);

    localStorage.setItem(KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Gagal menghapus history:", error);
  }
}

/**
 * Menghapus seluruh history
 */
export function clearHistory() {
  localStorage.removeItem(KEY);
}