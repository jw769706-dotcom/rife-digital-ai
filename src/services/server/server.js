import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import midtransClient from "midtrans-client";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("=================================");
console.log("MIDTRANS SERVER KEY :", process.env.MIDTRANS_SERVER_KEY);
console.log("MIDTRANS CLIENT KEY :", process.env.MIDTRANS_CLIENT_KEY);
console.log("IS PRODUCTION       :", false);
console.log("=================================");

const snap = new midtransClient.Snap({
  isProduction: false, // Sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

app.post("/create-payment", async (req, res) => {
  console.log("REQUEST MASUK");
  console.log(req.body);
  console.log("----------------");
  
  try {
    console.log("REQUEST BODY:", req.body);

    const { plan, userId, email } = req.body;

    const price = plan === "PRO" ? 99000 : 49000;

    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
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
        first_name: email || "Customer",
        email: email || "customer@example.com",
      },

      custom_field1: userId,
      custom_field2: plan,
    };

    console.log("MIDTRANS PARAMETER:");
    console.log(parameter);

    const transaction = await snap.createTransaction(parameter);

    console.log("TRANSACTION SUCCESS:");
    console.log(transaction);

    return res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    console.error("========== MIDTRANS ERROR ==========");
    console.error(err);
    console.error("====================================");

    return res.status(500).json({
      message: err.message,
      error: err.ApiResponse || err,
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`✅ Backend berjalan di http://localhost:${PORT}`);
});