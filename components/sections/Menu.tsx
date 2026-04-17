"use client";

import * as React from "react";
import Image from "next/image";
import { Coffee } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FADE_UP } from "@/lib/animations";
import { MENU_CATEGORIES, type MenuItemTag } from "@/lib/constants";
import { BLUR_DATA_URL, MENU_FALLBACK_IMAGE, MENU_IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

const ACCENT_TAGS: MenuItemTag[] = ["popular", "new"];

export function Menu() {
  const [activeCategory, setActiveCategory] = React.useState(
    MENU_CATEGORIES[0]?.id ?? "",
  );

  const activeItems =
    MENU_CATEGORIES.find((c) => c.id === activeCategory)?.items ?? [];

  return (
    <section id="menu" className="section-padding bg-coffee-50">
      <Container>
        {/* Heading */}
        <AnimatedSection>
          <SectionHeading
            title="Our Menu"
            subtitle="From single-origin espresso to artisan pastries — crafted with care, served with love."
          />
        </AnimatedSection>

        {/* Decorative separator */}
        <AnimatedSection variant={FADE_UP} delay={0.1}>
          <div className="-mt-6 flex justify-center">
            <Coffee className="h-5 w-5 text-coffee-200" />
          </div>
        </AnimatedSection>

        {/* Category tabs */}
        <AnimatedSection variant={FADE_UP} delay={0.2}>
          <div className="mt-6 flex justify-center">
            <div className="inline-flex max-w-full overflow-x-auto rounded-full bg-coffee-100 p-1.5">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors duration-300 md:px-6 md:py-3 md:text-sm",
                    activeCategory === cat.id
                      ? "text-coffee-800"
                      : "text-coffee-400 hover:text-coffee-600",
                  )}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeMenuTab"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Menu items — animated tab switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {activeItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card hover className="group p-0">
                  {/* Image with hover zoom */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-coffee-100">
                    <Image
                      src={MENU_IMAGES[item.id] ?? MENU_FALLBACK_IMAGE}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />

                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant={
                              ACCENT_TAGS.includes(tag) ? "accent" : "default"
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-coffee-800">
                      {item.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-coffee-500">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-coffee-600">
                        {formatPrice(item.price)}
                      </span>
                      <span className="cursor-pointer text-xs uppercase tracking-wider text-coffee-400 transition-colors hover:text-coffee-600">
                        Add to order
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
