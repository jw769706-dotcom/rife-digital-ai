function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Rp29K",
      features: [
        "AI Content Generator",
        "50 Prompt / Hari",
        "Basic Support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "Rp99K",
      features: [
        "Unlimited AI",
        "Prompt Library",
        "Digital Product Generator",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Business",
      price: "Rp199K",
      features: [
        "Semua Fitur Pro",
        "Konsultasi",
        "AI Marketing",
        "Team Access",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Pilih Paket
            <span className="text-yellow-500"> Sesuai Kebutuhanmu</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Mulai dari paket Starter hingga Business.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 transition ${
                plan.highlight
                  ? "border-yellow-500 bg-yellow-500/10 scale-105"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <div className="mt-4 text-5xl font-extrabold text-yellow-500">
                {plan.price}
                <span className="text-lg text-gray-400">/bulan</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature}>✅ {feature}</li>
                ))}
              </ul>

              <button className="mt-10 w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-400">
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;