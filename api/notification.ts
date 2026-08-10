import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import midtransClient from "midtrans-client";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Midtrans menggunakan POST untuk mengirim notification
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    console.log("========== MIDTRANS NOTIFICATION ==========");
    console.log("REQUEST BODY:", req.body);

    // Verifikasi notification ke Midtrans
    const notification = await core.transaction.notification(req.body);

    console.log("MIDTRANS NOTIFICATION:", notification);

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log("ORDER ID:", orderId);
    console.log("TRANSACTION STATUS:", transactionStatus);
    console.log("FRAUD STATUS:", fraudStatus);

    // Pembayaran berhasil
    if (
      transactionStatus === "capture" ||
      transactionStatus === "settlement"
    ) {
      const userId = notification.custom_field1;
      const plan = notification.custom_field2;

      console.log("USER ID:", userId);
      console.log("PLAN:", plan);

      if (!userId || !plan) {
        console.error("USER ID atau PLAN tidak ditemukan.");
        return res.status(400).json({
          success: false,
          message: "Missing userId or plan",
        });
      }

      // Simpan / update subscription
      const { error } = await supabase
        .from("subscriptions")
        .upsert({
          user_id: userId,
          plan: plan,
        });

      if (error) {
        console.error("SUPABASE ERROR:", error);

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      console.log("✅ PLAN BERHASIL DIUPDATE");
    }

    // Beri response sukses ke Midtrans
    return res.status(200).json({
      success: true,
      message: "Notification received",
      order_id: orderId,
      transaction_status: transactionStatus,
    });
  } catch (err: any) {
    console.error("========== NOTIFICATION ERROR ==========");
    console.error(err);
    console.error("========================================");

    // Jangan return object err langsung karena bisa circular
    return res.status(500).json({
      success: false,
      error: err?.message || "Internal Server Error",
    });
  }
}                                                                                                                                                                                                                                                                                                                                                               