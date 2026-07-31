function Trusted() {
  const items = [
    "AI Powered",
    "1000+ Users",
    "24/7 Support",
    "Secure Platform",
  ];

  return (
    <section className="border-y border-white/10 bg-black py-12">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-10 px-6">
        {items.map((item) => (
          <div
            key={item}
            className="text-sm font-medium tracking-wide text-gray-400"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Trusted;