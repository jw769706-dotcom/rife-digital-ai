export async function createPayment(
  plan: "BASIC" | "PRO",
  email: string
) {
  const response = await fetch("/api/create-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan,
      email,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}