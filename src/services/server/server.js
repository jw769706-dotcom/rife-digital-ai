require("dotenv").config({ path: "../.env.server" });

const express = require("express");
const cors = require("cors");
const midtransClient = require("midtrans-client");

const app = express();

app.use(cors());
app.use(express.json());

const snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

app.post("/create-payment", async (req, res) => {
  try {
    const { plan, userId } = req.body;

    let price = 49000;

    if (plan === "PRO") {
      price = 99000;
    }

    const parameter = {
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
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

      custom_field1: userId,
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.listen(3001, () => {
  console.log("✅ Backend berjalan di http://localhost:3001");
});