import type { VercelRequest, VercelResponse } from "@vercel/node";
import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const { plan, email } = req.body;

    const price = plan === "PRO" ? 99000 : 49000;

    const parameter = {
      transaction_details: {
        order_id: `RIFE-${Date.now()}`,
        gross_amount: price,
      },

      item_details: [
        {
          id: plan,
          price,
          quantity: 1,
          name: `Rife Digital AI ${plan}`,
        },
      ],

      customer_details: {
        first_name: email ?? "Customer",
        email: email ?? "customer@example.com",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error,
    });

  }
}