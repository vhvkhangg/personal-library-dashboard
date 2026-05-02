import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[image:var(--accent-active)] text-white shadow-sm shadow-indigo-950/20",
        secondary: "bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
        ghost: "text-[var(--foreground)]/85 hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]",
        outline: "border border-[var(--border)] bg-transparent text-[var(--foreground)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.06)] hover:border-[var(--accent)] hover:bg-[var(--interactive-hover-bg)] hover:text-[var(--interactive-hover-text)]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
