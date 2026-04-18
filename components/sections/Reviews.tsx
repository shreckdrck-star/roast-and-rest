"use client";

import * as React from "react";
import { Star } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FADE_UP,
  SCALE_UP,
  STAGGER_CONTAINER_SLOW,
  VIEWPORT_CONFIG,
} from "@/lib/animations";
import { REVIEWS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ── Star rating (static) ── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-coffee-300 text-coffee-300" />
      ))}
    </div>
  );
}

/* ── Animated counter for aggregate rating ── */
function AnimatedRating({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 50, damping: 15 });

  React.useEffect(() => {
    if (isInView) count.set(value);
  }, [isInView, count, value]);

  React.useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(1);
    });
    return unsubscribe;
  }, [spring]);

  return <span ref={ref}>0.0</span>;
}

/* ── Star pop-in variant ── */
const starPop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export function Reviews() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards =
      container.querySelectorAll<HTMLElement>("[data-review-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.reviewIndex,
            );
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reviews"
      className="section-padding bg-coffee-800 text-coffee-50"
    >
      <Container>
        {/* Heading */}
        <AnimatedSection>
          <SectionHeading
            title="What People Say"
            subtitle="Don't just take our word for it."
            theme="dark"
          />
        </AnimatedSection>

        {/* Aggregate rating */}
        <AnimatedSection variant={SCALE_UP} delay={0.2}>
          <div className="-mt-6 mb-12 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <span className="font-heading text-5xl font-bold text-coffee-50">
                <AnimatedRating value={4.9} />
              </span>
              <motion.div
                className="flex gap-1"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.div key={i} variants={starPop}>
                    <Star className="h-5 w-5 fill-coffee-300 text-coffee-300" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <p className="mt-1 text-sm text-coffee-400">
              Average rating from our customers
            </p>
          </div>
        </AnimatedSection>

        {/* Reviews: scroll carousel on mobile, staggered grid on md+ */}
        <motion.div
          ref={scrollRef}
          className={cn(
            "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4",
            "md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:snap-none md:pb-0",
            "lg:grid-cols-3",
          )}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={STAGGER_CONTAINER_SLOW}
        >
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              data-review-index={i}
              className={cn(
                "group shrink-0 snap-center",
                "min-w-[80vw] sm:min-w-[320px] md:min-w-0",
                "rounded-2xl border border-coffee-600/30 bg-coffee-700/50 p-6 backdrop-blur-sm md:p-8",
              )}
              variants={FADE_UP}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Opening quote — brightens on hover */}
              <span
                className="block select-none font-serif text-6xl leading-none text-coffee-500/30 transition-colors duration-300 group-hover:text-coffee-500/50"
                aria-hidden="true"
              >
                {"\u201C"}
              </span>

              {/* Review text */}
              <p className="mt-4 text-base italic leading-relaxed text-coffee-100 md:text-lg">
                {review.text}
              </p>

              {/* Reviewer info */}
              <div className="mt-6 flex items-center gap-4 border-t border-coffee-600/30 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee-600">
                  <span className="text-lg font-semibold text-coffee-200">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-coffee-50">
                    {review.name}
                  </p>
                  <p className="text-sm text-coffee-400">{review.role}</p>
                </div>
                <div className="ml-auto shrink-0">
                  <StarRating count={review.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll dots — mobile only */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {REVIEWS.map((review, i) => (
            <span
              key={review.id}
              className={cn(
                "block rounded-full transition-all duration-300",
                activeIndex === i
                  ? "h-2.5 w-2.5 bg-coffee-300"
                  : "h-2 w-2 bg-coffee-600",
              )}
            />
          ))}
        </div>
      </Container>

      {/* Hide scrollbar on carousel */}
      <style>{`
        #reviews .overflow-x-auto { scrollbar-width: none; }
        #reviews .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
