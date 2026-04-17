import type { Variants } from "framer-motion";

/* ── Easing curves ── */
const SMOOTH_EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

/* ── Reusable transitions ── */

export const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

export const SMOOTH_TRANSITION = {
  duration: 0.6,
  ease: SMOOTH_EASE,
};

/* ── Viewport / scroll-trigger config ── */

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
  margin: "-50px",
};

/* ── Variants ── */

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SMOOTH_EASE } },
};

export const FADE_DOWN: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const SCALE_UP: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const SLIDE_LEFT: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: SMOOTH_EASE } },
};

export const SLIDE_RIGHT: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: SMOOTH_EASE } },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const STAGGER_CONTAINER_SLOW: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

/* ── Helpers ── */

export function createStaggerContainer(
  stagger: number = 0.1,
  delay: number = 0.1,
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}
