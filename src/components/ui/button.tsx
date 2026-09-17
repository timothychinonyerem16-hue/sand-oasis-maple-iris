import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-transform duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg shadow-card",
        navy: "bg-navy text-accent-fg",
        outline: "border border-border bg-surface text-fg",
        ghost: "text-muted hover:bg-accent-soft hover:text-fg",
        danger: "bg-danger-soft text-danger",
        ok: "bg-ok-soft text-ok",
      },
      size: {
        sm: "h-9 rounded-[var(--radius-sm)] px-3 text-xs",
        md: "h-11 rounded-[var(--radius-md)] px-4 text-sm",
        lg: "h-12 rounded-[var(--radius-lg)] px-5 text-sm",
        icon: "size-11 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
