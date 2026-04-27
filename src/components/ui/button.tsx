/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "text-foreground hover:bg-white/5 hover:text-foreground",
        hero:
          "bg-primary text-primary-foreground rounded-full px-7 py-3.5 text-base font-medium tracking-[-0.01em] hover:bg-primary/90 transition-colors",
        heroGlass:
          "liquid-glass-strong text-foreground rounded-full px-7 py-3.5 text-base font-normal tracking-[-0.01em] hover:bg-white/5 transition-colors",
        heroSolid:
          "bg-foreground text-background rounded-full px-7 py-3.5 text-base font-medium tracking-[-0.01em] hover:bg-foreground/90 transition-colors",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 py-2",
        lg: "h-12 px-6 py-3",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
