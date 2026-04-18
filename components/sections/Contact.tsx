"use client";

import * as React from "react";
import {
  CheckCircle,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import {
  FADE_UP,
  SLIDE_LEFT,
  SLIDE_RIGHT,
  STAGGER_CONTAINER,
  VIEWPORT_CONFIG,
} from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";
import { BLUR_DATA_URL, MAP_IMAGE } from "@/lib/images";
import { cn } from "@/lib/utils";

/* ── Shared input classes ── */
const inputClasses = cn(
  "w-full rounded-xl border border-coffee-200 bg-white px-4 py-3.5",
  "text-base text-coffee-800 placeholder:text-coffee-300",
  "outline-none transition-all duration-300",
  "focus:border-coffee-500 focus:ring-2 focus:ring-coffee-500/20",
);

/* ── Reusable field component ── */
function Field({
  label,
  id,
  required,
  ...props
}: {
  label: string;
  id: string;
  required?: boolean;
} & (
  | (React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" })
)) {
  const { as, ...rest } = props;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-coffee-600"
      >
        {label}
        {required && <span className="text-coffee-400"> *</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          aria-required={required || undefined}
          className={inputClasses}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={id}
          aria-required={required || undefined}
          className={inputClasses}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}

/* ── Contact info items ── */
const CONTACT_ITEMS = [
  { icon: MapPin, label: "Address", value: SITE_CONFIG.address, href: undefined },
  { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: Facebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
  { icon: TikTokIcon, href: SITE_CONFIG.social.tiktok, label: "TikTok" },
];

/* ── Form field stagger (tighter than default) ── */
const formStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Contact() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    if (name && email && message) setIsSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-coffee-50">
      <Container>
        {/* Heading */}
        <AnimatedSection>
          <SectionHeading
            title="Visit Us"
            subtitle="We'd love to see you. Drop by for a cup or send us a message."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ── Left column — Form ── */}
          <div className="lg:col-span-7">
            <AnimatedSection variant={SLIDE_LEFT}>
              <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.1,
                        }}
                      >
                        <CheckCircle className="h-12 w-12 text-green-500" />
                      </motion.div>
                      <h3 className="mt-4 font-heading text-2xl font-bold text-coffee-800">
                        Message Sent!
                      </h3>
                      <p className="mt-2 text-coffee-500">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 text-sm font-medium text-coffee-600 underline underline-offset-4 hover:text-coffee-800"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.form
                        onSubmit={handleSubmit}
                        aria-label="Contact form"
                        className="space-y-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT_CONFIG}
                        variants={formStagger}
                      >
                        {/* Name + Email */}
                        <motion.div
                          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                          variants={FADE_UP}
                        >
                          <Field
                            label="Your Name"
                            id="name"
                            type="text"
                            placeholder="Jane Doe"
                            required
                          />
                          <Field
                            label="Your Email"
                            id="email"
                            type="email"
                            placeholder="jane@example.com"
                            required
                          />
                        </motion.div>

                        <motion.div variants={FADE_UP}>
                          <Field
                            label="Subject"
                            id="subject"
                            type="text"
                            placeholder="Reservation, catering, or just saying hi"
                          />
                        </motion.div>

                        <motion.div variants={FADE_UP}>
                          <Field
                            label="Message"
                            id="message"
                            as="textarea"
                            rows={5}
                            placeholder="Tell us what's on your mind..."
                            required
                          />
                        </motion.div>

                        <motion.div variants={FADE_UP}>
                          <Field
                            label="Phone (optional)"
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                          />
                        </motion.div>

                        <motion.div variants={FADE_UP}>
                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto"
                          >
                            Send Message
                          </Button>
                        </motion.div>
                      </motion.form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>

          {/* ── Right column — Info, Map, Social ── */}
          <div className="lg:col-span-5">
            {/* Contact details card */}
            <AnimatedSection variant={SLIDE_RIGHT}>
              <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_CONFIG}
                  variants={STAGGER_CONTAINER}
                >
                  {CONTACT_ITEMS.map((item) => (
                    <motion.div
                      key={item.label}
                      className="group flex gap-4"
                      variants={FADE_UP}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coffee-100 transition-colors duration-300 group-hover:bg-coffee-200">
                        <item.icon className="h-5 w-5 text-coffee-500" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-coffee-400">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium text-coffee-800 hover:text-coffee-600"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-coffee-800">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Hours */}
                  <motion.div className="group flex gap-4" variants={FADE_UP}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coffee-100 transition-colors duration-300 group-hover:bg-coffee-200">
                      <Clock className="h-5 w-5 text-coffee-500" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-coffee-400">
                        Hours
                      </p>
                      <p className="font-medium text-coffee-800">
                        Mon–Fri: {SITE_CONFIG.hours.weekdays}
                      </p>
                      <p className="font-medium text-coffee-800">
                        Sat–Sun: {SITE_CONFIG.hours.weekends}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Map image */}
            <AnimatedSection variant={FADE_UP} delay={0.3}>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={MAP_IMAGE.src}
                  alt={MAP_IMAGE.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                <div className="absolute inset-0 bg-coffee-900/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <MapPin className="h-10 w-10 text-white/80" />
                  <p className="mt-2 px-4 text-center text-sm font-medium text-white/90">
                    {SITE_CONFIG.address}
                  </p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 text-sm text-white/80 underline underline-offset-2 hover:text-white"
                >
                  View on Google Maps
                </a>
              </div>
            </AnimatedSection>

            {/* Social links */}
            <AnimatedSection variant={FADE_UP} delay={0.4}>
              <div className="mt-4 flex gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-coffee-100 text-coffee-500 transition-colors hover:bg-coffee-200"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}
