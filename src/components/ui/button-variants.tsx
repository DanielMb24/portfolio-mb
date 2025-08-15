
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import * as React from "react";

interface CustomButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'variant'> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "hero" | "glass" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const ButtonVariants = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "default", size, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "hero":
          return "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-button border-0 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg";
        case "glass":
          return "glass text-foreground hover:bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300";
        case "gradient":
          return "bg-gradient-secondary text-secondary-foreground hover:opacity-90 border-0 transition-all duration-300 hover:scale-105";
        default:
          return "";
      }
    };

    return (
      <Button
        className={cn(getVariantStyles(), className)}
        variant={variant === "hero" || variant === "glass" || variant === "gradient" ? "default" : variant}
        size={size}
        ref={ref}
        {...props}
      />
    );
  }
);

ButtonVariants.displayName = "ButtonVariants";

export { ButtonVariants };
