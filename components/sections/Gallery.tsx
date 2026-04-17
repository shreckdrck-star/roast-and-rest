"use client";

import * as React from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FADE_UP, VIEWPORT_CONFIG } from "@/lib/animations";
import { GALLERY_IMAGES, type GalleryImageCategory } from "@/lib/constants";
import { BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";

type FilterValue = GalleryImageCategory | "all";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Interior", value: "interior" },
  { label: "Coffee", value: "coffee" },
  { label: "Food", value: "food" },
  { label: "People", value: "people" },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] =
    React.useState<FilterValue>("all");

  const images =
    activeFilter === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="section-padding bg-white">
      <Container>
        {/* Heading */}
        <AnimatedSection>
          <SectionHeading
            title="Our Space"
            subtitle="Step inside Roast & Rest — where every corner tells a story."
          />
        </AnimatedSection>

        {/* Filter tabs with sliding pill */}
        <AnimatedSection variant={FADE_UP} delay={0.2}>
          <div className="-mt-6 flex justify-center">
            <div className="inline-flex max-w-full overflow-x-auto rounded-full bg-coffee-100 p-1">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-300 md:px-5 md:py-2.5 md:text-sm",
                    activeFilter === filter.value
                      ? "text-coffee-800"
                      : "text-coffee-400 hover:text-coffee-600",
                  )}
                >
                  {activeFilter === filter.value && (
                    <motion.div
                      layoutId="activeGalleryFilter"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Gallery frame — fades in on scroll */}
        <motion.div
          className="mt-10 rounded-xl border border-coffee-100 p-3 md:p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Grid with layout animation for filter switching */}
          <motion.div
            layout
            className={cn(
              "grid grid-cols-2 gap-3 auto-rows-[150px]",
              "md:grid-cols-3 md:gap-4 md:auto-rows-[180px]",
              "lg:grid-cols-4 lg:auto-rows-[200px]",
            )}
            style={{ gridAutoFlow: "dense" }}
          >
            <AnimatePresence initial={false}>
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    layout: { duration: 0.4, ease: "easeInOut" },
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-lg bg-coffee-100",
                    image.span === "wide" && "col-span-2",
                    image.span === "tall" && "row-span-2",
                  )}
                >
                  {/* Image with hover zoom */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />

                  {/* Hover overlay — icon only, no caption */}
                  <div className="absolute inset-0 flex items-start justify-end bg-coffee-900/40 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4 text-coffee-50/70" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
