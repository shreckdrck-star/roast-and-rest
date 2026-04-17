"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { FADE_UP, VIEWPORT_CONFIG } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ElementTag = "div" | "section" | "article";

const MotionComponents: Record<ElementTag, typeof motion.div> = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
};

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  viewportConfig?: Record<string, unknown>;
  as?: ElementTag;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  variant = FADE_UP,
  viewportConfig = VIEWPORT_CONFIG,
  as = "div",
  delay,
}: AnimatedSectionProps) {
  const Component = MotionComponents[as];

  const resolvedVariant = React.useMemo<Variants>(() => {
    if (delay == null) return variant;

    const visible = variant.visible;
    if (typeof visible === "function") return variant;

    const existingTransition =
      visible && typeof visible === "object" && "transition" in visible
        ? (visible.transition as Record<string, unknown>)
        : {};

    return {
      ...variant,
      visible: {
        ...(visible as Record<string, unknown>),
        transition: { ...existingTransition, delay },
      },
    };
  }, [variant, delay]);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={resolvedVariant}
    >
      {children}
    </Component>
  );
}
