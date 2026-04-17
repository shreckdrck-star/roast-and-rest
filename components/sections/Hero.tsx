"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FADE_UP } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";
import { BLUR_DATA_URL, HERO_IMAGE } from "@/lib/images";
import { cn } from "@/lib/utils";

/* ── Noise texture data URI ── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ── Heading word config ── */
const HEADING_WORDS = [
  { text: "Roast", styled: false },
  { text: "&", styled: true },
  { text: "Rest", styled: false },
];

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } },
};

const wordReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ── CTA stagger ── */
const ctaContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 1.5 } },
};

/* ── Floating beans ── */
type BeanConfig = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  duration: number;
  delay: number;
};

const FLOATING_BEANS: BeanConfig[] = [
  { top: "15%", left: "10%", size: 20, duration: 8, delay: 0 },
  { top: "25%", right: "15%", size: 16, duration: 6, delay: 1 },
  { bottom: "30%", left: "20%", size: 24, duration: 10, delay: 2 },
  { top: "60%", right: "8%", size: 18, duration: 7, delay: 0.5 },
];

function CoffeeBean({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.4)}
      viewBox="0 0 20 28"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="10" cy="14" rx="8" ry="13" />
      <path
        d="M10 2C7 9 7 19 10 26"
        stroke="rgba(26,14,8,0.3)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

/* ── Hero component ── */
export function Hero() {
  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* ══ Background parallax layer ══ */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        {/* Background image */}
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-coffee-900/60" />

        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: NOISE_SVG }}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(26, 14, 8, 0.4) 100%)",
          }}
        />

        {/* Scroll darkness overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-coffee-900"
          style={{ opacity: overlayOpacity }}
        />

        {/* Coffee ring — top right */}
        <motion.svg
          className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px]"
          viewBox="0 0 300 300"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 1.0, duration: 2.0 }}
        >
          <circle
            cx="150"
            cy="150"
            r="148"
            fill="none"
            stroke="#D4A574"
            strokeWidth="1"
          />
        </motion.svg>

        {/* Coffee ring — bottom left */}
        <motion.svg
          className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px]"
          viewBox="0 0 400 400"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 1.0, duration: 2.0 }}
        >
          <circle
            cx="200"
            cy="200"
            r="198"
            fill="none"
            stroke="#D4A574"
            strokeWidth="1"
          />
        </motion.svg>

        {/* Floating coffee beans — desktop only */}
        {FLOATING_BEANS.map((bean, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute hidden text-coffee-300 md:block"
            style={{
              top: bean.top,
              left: bean.left,
              right: bean.right,
              bottom: bean.bottom,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{
              duration: bean.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bean.delay,
            }}
          >
            <CoffeeBean size={bean.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* ══ Content parallax layer ══ */}
      <motion.div
        className="relative z-10 flex h-full items-center justify-center will-change-[transform,opacity]"
        style={{ y: contentY, opacity: heroOpacity }}
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            {/* Decorative divider — t=0.3 */}
            <motion.div
              className="mb-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="h-px w-10 bg-coffee-300/50" />
              <div className="h-2 w-2 rotate-45 bg-coffee-300/50" />
              <div className="h-px w-10 bg-coffee-300/50" />
            </motion.div>

            {/* Tagline — t=0.5 */}
            <motion.p
              className="mb-6 font-body text-sm font-light uppercase tracking-[0.3em] text-coffee-300/80"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {SITE_CONFIG.tagline}
            </motion.p>

            {/* Heading — word-by-word t=0.7 */}
            <motion.h1
              className="font-heading text-5xl font-bold tracking-[-0.02em] text-coffee-50 md:text-7xl lg:text-8xl xl:text-9xl"
              style={{ perspective: 800 }}
              initial="hidden"
              animate="visible"
              variants={headingContainer}
            >
              {HEADING_WORDS.map((word, i) => (
                <React.Fragment key={i}>
                  <span className="inline-block overflow-hidden px-6 py-1">
                    <motion.span
                      className={cn(
                        "inline-block",
                        word.styled && "italic text-coffee-300",
                      )}
                      style={word.styled ? { fontSize: "1.15em" } : undefined}
                      variants={wordReveal}
                    >
                      {word.text}
                    </motion.span>
                  </span>
                  {i < HEADING_WORDS.length - 1 && " "}
                </React.Fragment>
              ))}
            </motion.h1>

            {/* Subtitle — t=1.2 */}
            <motion.p
              className="mx-auto mt-6 max-w-lg text-lg font-light leading-relaxed text-coffee-200/80 md:mt-8 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Premium craft coffee, handpicked beans, artisan brewing.
              Portland&apos;s favorite since 2019.
            </motion.p>

            {/* CTA buttons — t=1.5 */}
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12"
              initial="hidden"
              animate="visible"
              variants={ctaContainer}
            >
              <motion.div variants={FADE_UP}>
                <Button
                  href="#menu"
                  variant="primary"
                  size="lg"
                  className="w-full bg-coffee-300 text-coffee-900 hover:bg-coffee-200 sm:w-auto"
                >
                  Explore Our Menu
                </Button>
              </motion.div>
              <motion.div variants={FADE_UP}>
                <Button
                  href="#contact"
                  variant="outline"
                  size="lg"
                  className="w-full border-coffee-300/50 text-coffee-100 hover:bg-coffee-300/10 sm:w-auto"
                >
                  Book a Table
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* ══ Scroll indicator — t=2.0, no parallax ══ */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex md:flex-col md:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
      >
        <div className="relative h-6 w-px bg-coffee-300/20">
          <div className="hero-scroll-dot absolute -left-[2.5px] top-0 h-1.5 w-1.5 rounded-full bg-coffee-300/60" />
        </div>
      </motion.div>

      {/* Scroll indicator keyframes */}
      <style>{`
        @keyframes heroScrollDot {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(18px); opacity: 1; }
        }
        .hero-scroll-dot {
          animation: heroScrollDot 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
