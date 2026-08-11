import {
  ShieldCheck,
  Sparkles,
  Clock3,
  Layers3,
} from "lucide-react";

function Trusted() {
  const items = [
    {
      icon: Sparkles,
      value: "50+",
      label: "AI Tools",
    },
    {
      icon: Layers3,
      value: "ALL-IN-ONE",
      label: "Workspace",
    },
    {
      icon: Clock3,
      value: "24/7",
      label: "AI Support",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Secure",
    },
  ];

  return (
    <section className="border-y border-white/[0.08] bg-[#080808]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.015] sm:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`
                  relative flex min-h-[118px]
                  flex-col items-center justify-center
                  px-3 py-6 text-center
                  transition-colors duration-300
                  hover:bg-yellow-400/[0.03]

                  ${
                    index % 2 !== 1
                      ? "border-r border-white/[0.08]"
                      : ""
                  }

                  ${
                    index < 2
                      ? "border-b border-white/[0.08] sm:border-b-0"
                      : ""
                  }

                  sm:border-r-0

                  ${
                    index !== items.length - 1
                      ? "sm:border-r sm:border-white/[0.08]"
                      : ""
                  }
                `}
              >
                {/* ICON */}
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/[0.08]">
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="text-yellow-400"
                  />
                </div>

                {/* VALUE */}
                <p
                  className={`
                    font-black tracking-tight text-white
                    ${
                      item.value === "ALL-IN-ONE"
                        ? "text-[11px] sm:text-xs"
                        : "text-lg sm:text-xl"
                    }
                  `}
                >
                  {item.value}
                </p>

                {/* LABEL */}
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 sm:text-xs">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Trusted;