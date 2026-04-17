import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider",
        variant === "accent"
          ? "bg-coffee-500 text-white"
          : "bg-coffee-100 text-coffee-600",
        className,
      )}
      {...props}
    />
  );
}

