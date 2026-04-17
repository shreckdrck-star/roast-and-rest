"use client";

import { Clock, Coffee, Flame, Heart, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FADE_UP,
  SCALE_UP,
  SLIDE_RIGHT,
  STAGGER_CONTAINER,
  VIEWPORT_CONFIG,
} from "@/lib/animations";
import { ABOUT_CONTENT, FEATURES, type FeatureIcon } from "@/lib/constants";
import { ABOUT_IMAGES, BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<FeatureIcon, LucideIcon> = {
  Coffee,
  Flame,
  Heart,
  Clock,
};

/* Left column: slides in from left + staggers children */
const storyColumnVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/* Image zoom-out reveal */
const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageRevealDelayed: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <Container>
        {/* ── Heading ── */}
        <AnimatedSection>
          <SectionHeading
            title={ABOUT_CONTENT.heading}
            subtitle={ABOUT_CONTENT.subheading}
          />
        </AnimatedSection>

        {/* ── Row 1 — Story + Image ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column — text + stats */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={storyColumnVariants}
          >
            {ABOUT_CONTENT.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                className="mb-6 text-lg leading-relaxed text-coffee-600"
                variants={FADE_UP}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Stats row */}
            <motion.div
              className="mt-10 grid grid-cols-2 gap-8 lg:flex lg:gap-0"
              variants={STAGGER_CONTAINER}
            >
              {ABOUT_CONTENT.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={cn(
                    "text-center lg:flex-1 lg:px-6 first:lg:pl-0 last:lg:pr-0",
                    i < ABOUT_CONTENT.stats.length - 1 &&
                      "lg:border-r lg:border-coffee-200",
                  )}
                  variants={SCALE_UP}
                >
                  <div className="font-heading text-3xl font-bold text-coffee-800 md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm uppercase tracking-wider text-coffee-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — image placeholders (desktop only) */}
          <motion.div
            className="hidden lg:col-span-5 lg:flex lg:flex-col lg:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={SLIDE_RIGHT}
          >
            <motion.div
              className="relative aspect-[3/4] overflow-hidden rounded-card"
              variants={imageReveal}
            >
              <Image
                src={ABOUT_IMAGES.main.src}
                alt={ABOUT_IMAGES.main.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>
            <motion.div
              className="relative aspect-video overflow-hidden rounded-card"
              variants={imageRevealDelayed}
            >
              <Image
                src={ABOUT_IMAGES.secondary.src}
                alt={ABOUT_IMAGES.secondary.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Row 2 — Features ── */}
        <div className="relative mt-16 md:mt-20">
          {/* Dot pattern — slow fade in */}
          <motion.div
            className="pointer-events-none absolute -inset-4 rounded-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(232, 201, 160, 0.3) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <motion.div
            className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={STAGGER_CONTAINER}
          >
            {FEATURES.map((feature) => {
              const Icon = ICON_MAP[feature.icon];
              return (
                <motion.div
                  key={feature.id}
                  className="group rounded-card bg-coffee-50 p-6 md:p-8"
                  variants={FADE_UP}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-100 transition-transform duration-300 group-hover:rotate-12">
                    <Icon className="h-6 w-6 text-coffee-500" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-coffee-800">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-coffee-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
