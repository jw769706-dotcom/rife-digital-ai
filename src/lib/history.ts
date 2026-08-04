export type HistoryItem = {
  id: string;
  tool: string;
  prompt: string;
  result: string;
  createdAt: string;
};

const KEY = "rife-history";

export function getHistory(): HistoryItem[] {
  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveHistory(item: HistoryItem) {
  const history = getHistory();

  history.unshift(item);

  localStorage.setItem(
    KEY,
    JSON.stringify(history)
  );
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}