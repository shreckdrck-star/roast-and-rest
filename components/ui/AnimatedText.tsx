"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { FADE_UP, VIEWPORT_CONFIG } from "@/lib/animations";
import { cn } from "@/lib/utils";

type TextTag = "h1" | "h2" | "h3" | "p" | "span";

const MotionComponents: Record<TextTag, typeof motion.h1> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

export interface AnimatedTextProps {
  text: string;
  as?: TextTag;
  className?: string;
  animation?: "word" | "letter";
  staggerDelay?: number;
  once?: boolean;
}

const CHILD_VARIANT: Variants = {
  hidden: FADE_UP.hidden,
  visible: FADE_UP.visible,
};

export function AnimatedText({
  text,
  as = "h2",
  className,
  animation = "word",
  staggerDelay,
  once = true,
}: AnimatedTextProps) {
  const Component = MotionComponents[as];
  const resolvedDelay = staggerDelay ?? (animation === "letter" ? 0.03 : 0.05);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: resolvedDelay,
        delayChildren: 0.1,
      },
    },
  };

  if (animation === "letter") {
    const letters = text.split("");

    return (
      <Component
        className={cn("whitespace-pre-wrap", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2, margin: VIEWPORT_CONFIG.margin }}
        variants={container}
        aria-label={text}
      >
        {letters.map((char, i) => (
          <motion.span
            key={`${i}-${char}`}
            className="inline-block"
            style={char === " " ? { width: "0.3em" } : undefined}
            variants={CHILD_VARIANT}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  /* word animation (default) */
  const words = text.split(" ");

  return (
    <Component
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: VIEWPORT_CONFIG.margin }}
      variants={container}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${i}-${word}`}
          className="mr-[0.3em] inline-block"
          variants={CHILD_VARIANT}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
}
