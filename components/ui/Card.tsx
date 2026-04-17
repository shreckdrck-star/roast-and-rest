import * as React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings: Record<NonNullable<CardProps["padding"]>, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, padding = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-card overflow-hidden shadow-card transition-all duration-300",
          hover ? "hover:shadow-card-hover hover:-translate-y-1" : undefined,
          paddings[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
