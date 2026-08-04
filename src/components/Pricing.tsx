import { useState } from "react";
import { createPayment } from "../services/payment";
import { supabase } from "../lib/supabase";

const plans = [
  {
    name: "Gratis",
    price: "Rp0",
    value: "",
    button: "Mulai Gratis",
    featured: false,
    features: [
      "5 Generate Gratis",
      "AI Writer",
      "Caption Instagram",
      "Copywriting",
    ],
  },

  {
    name: "Basic",
    price: "Rp49K",
    value: "BASIC",
    button: "Upgrade Basic",
    featured: true,
    features: [
      "Unlimited Generate",
      "AI Product",
      "AI Marketing",
      "AI Content",
      "History",
      "Export PDF",
      "Streaming AI",
      "Markdown",
    ],
  },

  {
    name: "Pro",
    price: "Rp99K",
    value: "PRO",
    button: "Upgrade Pro",
    featured: false,
    features: [
      "Semua fitur Basic",
      "Priority Support",
      "Workspace",
      "Team",
      "Semua update terbaru",
    ],
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState("");

  async function handleUpgrade(plan: "BASIC" | "PRO") {
    try {
      setLoading(plan);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      const payment = await createPayment(plan, user.email!);

      window.location.href = payment.redirect_url;
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading("");
    }
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-black">
          Pricing
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 ${
                plan.featured
                  ? "border-yellow-400"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-3xl font-black">
                {plan.name}
              </h3>

              <h2 className="mt-6 text-5xl font-black text-yellow-500">
                {plan.price}
              </h2>

              <ul className="mt-8 space-y-3">
                {plan.features.map((item) => (
                  <li key={item}>✔ {item}</li>
                ))}
              </ul>

              {plan.value === "" ? (
                <button
                  className="mt-10 w-full rounded-2xl border py-4 font-bold"
                >
                  {plan.button}
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleUpgrade(plan.value as "BASIC" | "PRO")
                  }
                  className="mt-10 w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black"
                >
                  {loading === plan.value
                    ? "Loading..."
                    : plan.button}
                </button>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}