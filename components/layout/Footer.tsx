"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import {
  FADE_IN,
  FADE_UP,
  STAGGER_CONTAINER,
  VIEWPORT_CONFIG,
} from "@/lib/animations";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

const socialStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-coffee-800 text-coffee-100", className)}>
      <Container as="div" className="py-16">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={STAGGER_CONTAINER}
        >
          {/* Column 1: Logo + description + social */}
          <motion.div variants={FADE_UP}>
            <Link href="#hero" className="font-heading text-xl font-bold">
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-coffee-200 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {SITE_CONFIG.description}
            </p>

            <motion.div
              className="mt-6 flex items-center gap-3"
              variants={socialStagger}
            >
              <motion.a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-coffee-200/30 text-coffee-200 transition hover:text-coffee-300"
                aria-label="Instagram"
                variants={socialItem}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-coffee-200/30 text-coffee-200 transition hover:text-coffee-300"
                aria-label="Facebook"
                variants={socialItem}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-coffee-200/30 text-coffee-200 transition hover:text-coffee-300"
                aria-label="TikTok"
                variants={socialItem}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <TikTokIcon className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={FADE_UP}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-coffee-100">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-coffee-200 transition hover:text-coffee-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div variants={FADE_UP}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-coffee-100">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-coffee-200">
              <p>{SITE_CONFIG.address}</p>
              <p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-coffee-200 transition hover:text-coffee-300"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-coffee-200 transition hover:text-coffee-300"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
              <div className="pt-2">
                <p className="text-coffee-100 font-medium">Hours</p>
                <p className="mt-1">
                  Mon–Fri: {SITE_CONFIG.hours.weekdays}
                  <br />
                  Sat–Sun: {SITE_CONFIG.hours.weekends}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Copyright */}
      <AnimatedSection variant={FADE_IN} delay={0.3}>
        <div className="border-t border-coffee-200">
          <Container as="div" className="py-6">
            <p className="text-center text-sm text-coffee-400">
              © 2024 {SITE_CONFIG.name}. All rights reserved.
            </p>
          </Container>
        </div>
      </AnimatedSection>
    </footer>
  );
}
