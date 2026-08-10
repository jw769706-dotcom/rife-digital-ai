export async function createPayment(
  plan: "BASIC" | "PRO",
  userId: string,
  email: string
) {
  const response = await fetch(
    "/api/create-payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        userId,
        email,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
}