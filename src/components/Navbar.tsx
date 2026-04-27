import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BRAND_NAME,
  CTA_HREF,
  CTA_LABEL,
  LOGO_PATH,
  NAV_ITEMS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeHref, setActiveHref] = useState<string>(NAV_ITEMS[0].href);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveHref(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: "-36% 0px -48% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        data-scrolled={scrolled}
        initial={false}
        animate={{ y: scrolled ? -8 : 0 }}
        className={cn(
          "fixed left-1/2 z-50 w-[min(1200px,calc(100vw-32px))] -translate-x-1/2 transition-all duration-300",
          scrolled ? "top-2" : "top-4",
        )}
      >
        <div
          className={cn(
            "liquid-glass rounded-full px-2 py-2 transition-[backdrop-filter,background-color]",
            scrolled && "bg-black/18 backdrop-blur-xl",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="flex items-center gap-2 pl-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img src={LOGO_PATH} alt={`${BRAND_NAME} logo`} className="h-6 w-auto" />
              <span className="font-display text-lg tracking-tight">{BRAND_NAME}</span>
            </a>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group relative px-3.5 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className={cn("transition-colors", isActive && "text-foreground")}>
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-primary transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="heroSolid"
                size="sm"
                className="hidden rounded-full px-4 py-1.5 text-sm md:inline-flex"
              >
                <a href={CTA_HREF}>
                  {CTA_LABEL}
                  <ArrowUpRight className="ml-1 size-4" />
                </a>
              </Button>

              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/75 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass-strong mx-4 mt-24 rounded-[32px] p-6"
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-4 font-display text-2xl uppercase tracking-tight text-foreground/75 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      activeHref === item.href && "text-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <Button asChild variant="heroSolid" className="mt-6 w-full">
                <a href={CTA_HREF} onClick={() => setIsMenuOpen(false)}>
                  {CTA_LABEL}
                  <ArrowUpRight className="ml-1 size-4" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
