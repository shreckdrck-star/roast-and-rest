import * as React from "react";

import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        <div className={cn("h-[2px] w-10", isDark ? "bg-coffee-50/40" : "bg-coffee-300")} />
        <div className={cn("h-2 w-2 rotate-45", isDark ? "bg-coffee-50/40" : "bg-coffee-300")} />
        <div className={cn("h-[2px] w-10", isDark ? "bg-coffee-50/40" : "bg-coffee-300")} />
      </div>

      <h2
        className={cn(
          "font-heading text-3xl font-bold md:text-4xl lg:text-5xl",
          isDark ? "text-coffee-50" : "text-coffee-800",
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={cn(
            "mt-3 max-w-2xl text-lg",
            isDark ? "text-coffee-200" : "text-coffee-500",
            align === "center" ? "mx-auto" : undefined,
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
