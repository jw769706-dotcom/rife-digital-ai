import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-300 active:scale-95",

        fullWidth && "w-full",

        variant === "primary" &&
          "bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40",

        variant === "secondary" &&
          "bg-white/5 border border-white/10 text-white hover:bg-white/10",

        variant === "outline" &&
          "border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}