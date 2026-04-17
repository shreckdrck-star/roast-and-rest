"use client";

import Link from "next/link";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("hero");

  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  React.useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const root = overlayRef.current;
    if (!root) return;

    const getFocusable = () => {
      const selector =
        'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';
      return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
      );
    };

    const focusables = getFocusable();
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 w-full overflow-visible transition-all duration-500",
    isScrolled
      ? "bg-coffee-50/95 text-coffee-800 backdrop-blur-md shadow-sm"
      : "bg-transparent text-white",
    className,
  );

  const logoColor = isScrolled ? "text-coffee-800" : "text-white";

  const sectionIdFromHref = (href: string) => href.replace(/^#/, "");

  return (
    <header className={headerClasses}>
      <Container as="div" className="h-20 overflow-visible">
        <div className="flex h-full items-center justify-between gap-6 overflow-visible">
          <Link
            href="#hero"
            className={cn(
              "font-heading text-xl font-bold leading-tight whitespace-nowrap flex-shrink-0 overflow-visible",
              logoColor,
            )}
            onClick={() => {
              setActiveSection("hero");
              closeMobileMenu();
            }}
          >
            {SITE_CONFIG.name}
          </Link>

          <nav
            role="navigation"
            className="hidden md:flex items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = link.href === `#${activeSection}`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm uppercase tracking-wider font-medium transition-all duration-300 py-2 border-b-2",
                    isActive
                      ? isScrolled
                        ? "text-coffee-800 border-coffee-500"
                        : "text-white border-coffee-300"
                      : isScrolled
                        ? "text-coffee-600 border-transparent hover:text-coffee-800"
                        : "text-coffee-200 border-transparent hover:text-white",
                  )}
                  onClick={() => setActiveSection(sectionIdFromHref(link.href))}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Button
              href="#contact"
              size="sm"
              variant={isScrolled ? "primary" : "outline"}
              className={
                isScrolled
                  ? undefined
                  : "border-white text-white hover:bg-white hover:text-coffee-800"
              }
              onClick={() => setActiveSection("contact")}
            >
              Book a Table
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              isScrolled ? "hover:bg-coffee-100" : "hover:bg-white/10",
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="relative block h-5 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[2px] w-6 rounded-full transition-all duration-300",
                  isScrolled ? "bg-coffee-800" : "bg-white",
                  isMobileMenuOpen ? "top-2.5 rotate-45" : undefined,
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2.5 h-[2px] w-6 rounded-full transition-all duration-300",
                  isScrolled ? "bg-coffee-800" : "bg-white",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-5 h-[2px] w-6 rounded-full transition-all duration-300",
                  isScrolled ? "bg-coffee-800" : "bg-white",
                  isMobileMenuOpen ? "top-2.5 -rotate-45" : undefined,
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-coffee-800 text-coffee-100"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-full flex-col">
              <div className="h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link
                  href="#hero"
                  className="font-heading text-xl font-bold text-coffee-100 whitespace-nowrap"
                  onClick={() => {
                    setActiveSection("hero");
                    closeMobileMenu();
                  }}
                >
                  {SITE_CONFIG.name}
                </Link>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-coffee-700/40 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="relative block h-5 w-6">
                    <span className="absolute left-0 top-2.5 h-[2px] w-6 rotate-45 rounded-full bg-coffee-100" />
                    <span className="absolute left-0 top-2.5 h-[2px] w-6 -rotate-45 rounded-full bg-coffee-100" />
                  </span>
                </button>
              </div>

              <motion.nav
                role="navigation"
                className="flex flex-1 items-center justify-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                  },
                }}
              >
                <motion.ul className="flex flex-col items-center gap-6">
                  {NAV_LINKS.map((link) => (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: -8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <a
                        href={link.href}
                        className="font-heading text-2xl text-coffee-100 hover:text-coffee-300 transition-colors"
                        onClick={() => {
                          setActiveSection(sectionIdFromHref(link.href));
                          closeMobileMenu();
                        }}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.nav>

              <div className="px-6 pb-10">
                <Button
                  href="#contact"
                  size="lg"
                  variant="outline"
                  className="w-full border-coffee-100 text-coffee-100 hover:bg-coffee-100 hover:text-coffee-800"
                  onClick={() => {
                    setActiveSection("contact");
                    closeMobileMenu();
                  }}
                >
                  Book a Table
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
