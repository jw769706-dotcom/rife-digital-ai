export const STORAGE_KEY = "rife-chat";

export function saveChat(messages: any[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(messages)
  );
}

export function loadChat() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function clearChat() {
  localStorage.removeItem(STORAGE_KEY);
}

export function newChat(welcomeMessage: any) {
  localStorage.removeItem(STORAGE_KEY);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([welcomeMessage])
  );

  return [welcomeMessage];
}