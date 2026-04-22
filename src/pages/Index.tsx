import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import GooeyNav from "@/components/GooeyNav";
import SpotlightCard from "@/components/SpotlightCard";
import SplitText from "@/components/SplitText";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const LightRays = lazy(() => import("@/components/LightRays"));

const LOGO_HORIZONTAL =
  "https://res.cloudinary.com/dtqvmh9te/image/upload/v1761757816/Realty_Inmobiliaria_Horizontal_-_fondo_oscuro_t5r57k.png";

type AppItem = {
  name: string;
  tagline: string;
  description: string;
  img: string;
  url: string;
  tag: string;
};

const apps: AppItem[] = [
  {
    name: "Aula Virtual",
    tagline: "Capacitacion",
    description:
      "Cursos, materiales y certificaciones para el equipo. Aprende a tu ritmo.",
    img: "https://res.cloudinary.com/dtqvmh9te/image/upload/v1776891989/aula_realty_es04uu.png",
    url: "https://aula.realtygi.pe",
    tag: "Educacion",
  },
  {
    name: "Separaciones",
    tagline: "Reservas",
    description:
      "Gestiona separaciones de lotes y unidades con seguimiento en tiempo real.",
    img: "https://res.cloudinary.com/dtqvmh9te/image/upload/v1776891989/plataforma_separaciones_e89wlm.png",
    url: "https://separaciones.realtygi.pe",
    tag: "Comercial",
  },
  {
    name: "Evaluaciones",
    tagline: "Calificacion",
    description:
      "Registra, evalua y aprueba candidatos con trazabilidad completa.",
    img: "https://res.cloudinary.com/dtqvmh9te/image/upload/v1776892341/sistema_evaluaciones_wjizcc.png",
    url: "https://evaluaciones.realtygi.pe",
    tag: "Financiero",
  },
];

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Aplicativos", href: "#aplicativos" },
  { label: "Soporte", href: "#soporte" },
];

const Index = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showLightRays, setShowLightRays] = useState(false);
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const scrollSettleTimeoutRef = useRef<number | null>(null);
  const autoScrollLockRef = useRef(false);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const wheelAccumulationRef = useRef(0);
  const wheelResetTimeoutRef = useRef<number | null>(null);

  const stopScrollAnimation = useCallback(() => {
    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }
  }, []);

  const animateWindowScroll = useCallback(
    (targetTop: number) => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clampedTarget = Math.max(0, targetTop);

      stopScrollAnimation();

      if (prefersReducedMotion) {
        window.scrollTo(0, clampedTarget);
        return 80;
      }

      const startY = window.scrollY;
      const distance = clampedTarget - startY;
      if (Math.abs(distance) < 2) {
        window.scrollTo(0, clampedTarget);
        return 80;
      }

      const duration = Math.min(820, Math.max(460, Math.abs(distance) * 0.36));
      const startTime = performance.now();
      const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

      const step = (timestamp: number) => {
        const progress = Math.min(1, (timestamp - startTime) / duration);
        const easedProgress = easeOutQuint(progress);
        window.scrollTo(0, Math.round(startY + distance * easedProgress));

        if (progress < 1) {
          scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
        } else {
          scrollAnimationFrameRef.current = null;
        }
      };

      scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
      return duration;
    },
    [stopScrollAnimation]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    const targetAnchor =
      targetSection.querySelector<HTMLElement>("[data-scroll-anchor]") ?? targetSection;
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const targetTop = targetAnchor.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

    autoScrollLockRef.current = true;
    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }

    window.history.replaceState(null, "", `#${sectionId}`);
    const animationDuration = animateWindowScroll(targetTop);
    setIsMobileMenuOpen(false);

    autoScrollTimeoutRef.current = window.setTimeout(() => {
      autoScrollLockRef.current = false;
    }, animationDuration + 80);
  }, [animateWindowScroll]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setShowLightRays(true);
      return;
    }

    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const enableLightRays = () => setShowLightRays(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enableLightRays, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(enableLightRays, 400);
    }

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }
      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }
      if (scrollSettleTimeoutRef.current) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }
      stopScrollAnimation();
    };
  }, [stopScrollAnimation]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024 || !window.matchMedia("(pointer: fine)").matches) return;

    const sectionIds = navItems.map((item) => item.href.replace("#", ""));

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 6) return;

      if (autoScrollLockRef.current) {
        event.preventDefault();
        return;
      }

      wheelAccumulationRef.current += event.deltaY;

      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelResetTimeoutRef.current = window.setTimeout(() => {
        wheelAccumulationRef.current = 0;
      }, 180);

      if (Math.abs(wheelAccumulationRef.current) < 70) return;

      const direction = wheelAccumulationRef.current > 0 ? 1 : -1;
      wheelAccumulationRef.current = 0;

      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const probeY = window.scrollY + headerHeight + 40;
      let currentIndex = 0;

      sectionIds.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        const targetAnchor =
          section?.querySelector<HTMLElement>("[data-scroll-anchor]") ?? section;

        if (!targetAnchor) return;

        const anchorTop = targetAnchor.getBoundingClientRect().top + window.scrollY;
        if (probeY >= anchorTop - 16) {
          currentIndex = index;
        }
      });

      const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, currentIndex + direction));
      if (nextIndex === currentIndex) return;

      event.preventDefault();
      scrollToSection(sectionIds[nextIndex]);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelResetTimeoutRef.current) {
        window.clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, [scrollToSection]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024 || !window.matchMedia("(pointer: fine)").matches) return;

    const sectionIds = navItems.map((item) => item.href.replace("#", ""));

    const settleToClosestSection = () => {
      if (autoScrollLockRef.current || isMobileMenuOpen) return;

      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const currentY = window.scrollY;
      const sectionTargets = sectionIds
        .map((sectionId) => {
        const section = document.getElementById(sectionId);
        const targetAnchor =
          section?.querySelector<HTMLElement>("[data-scroll-anchor]") ?? section;

          if (!targetAnchor) return null;

          return {
            id: sectionId,
            top: targetAnchor.getBoundingClientRect().top + window.scrollY - headerHeight - 10,
          };
        })
        .filter((section): section is { id: string; top: number } => Boolean(section));

      if (!sectionTargets.length) return;

      let targetSection = sectionTargets[0];

      for (let index = 0; index < sectionTargets.length - 1; index += 1) {
        const currentSection = sectionTargets[index];
        const nextSection = sectionTargets[index + 1];
        const midpoint = currentSection.top + (nextSection.top - currentSection.top) * 0.5;

        if (currentY < midpoint) {
          targetSection = currentSection;
          break;
        }

        targetSection = nextSection;
      }

      const distanceToTarget = Math.abs(targetSection.top - currentY);
      const snapThreshold = Math.min(window.innerHeight * 0.95, 760);

      if (distanceToTarget > 18 && distanceToTarget < snapThreshold) {
        scrollToSection(targetSection.id);
      }
    };

    const handleScroll = () => {
      if (autoScrollLockRef.current) return;

      if (scrollSettleTimeoutRef.current) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }

      scrollSettleTimeoutRef.current = window.setTimeout(() => {
        settleToClosestSection();
      }, 160);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollSettleTimeoutRef.current) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }
    };
  }, [isMobileMenuOpen, scrollToSection]);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCarouselIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    const sections = ["inicio", "aplicativos", "soporte"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const activeSectionId = visibleEntries[0].target.id;
        const nextIndex = navItems.findIndex((item) => item.href === `#${activeSectionId}`);

        if (nextIndex >= 0) {
          setActiveNavIndex(nextIndex);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const renderAppCard = (app: AppItem, compact = false) => {
    const { name, tagline, description, url, img, tag } = app;

    return (
      <SpotlightCard
        className={`h-full ${compact ? "min-h-0 w-full max-w-[30rem] mx-auto" : "min-h-[320px] lg:min-h-[350px]"}`}
        spotlightColor="rgba(214, 168, 71, 0.18)"
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group flex h-full flex-col"
        >
          <div
            className={`relative overflow-hidden rounded-[1.2rem] border border-border/70 bg-secondary/40 ${
              compact ? "mb-4 p-3 sm:p-3.5" : "mb-5 p-4 lg:p-5"
            }`}
          >
            <div className={`overflow-hidden rounded-[0.95rem] bg-black/12 ${compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
              <img
                src={img}
                alt={`Vista previa de ${name}`}
                loading="lazy"
                decoding="async"
                sizes={compact ? "(max-width: 1023px) 90vw, 40vw" : "(min-width: 1024px) 33vw, 50vw"}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {tag}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary/80 sm:text-xs">
                {tagline}
              </span>
            </div>
            <h3
              className={`mt-3 font-display font-bold leading-[0.98] text-foreground ${
                compact ? "text-[1.7rem] sm:text-[1.95rem]" : "text-3xl md:text-[2rem] xl:text-[2.2rem]"
              }`}
            >
              {name}
            </h3>
            <p className={`mt-3 leading-relaxed text-muted-foreground ${compact ? "text-[13.5px] sm:text-[14px]" : "text-sm md:text-[15px]"}`}>
              {description}
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {url.replace("https://", "")}
            </p>

            <div className={`mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-5 ${compact ? "flex-wrap" : ""}`}>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Abrir plataforma
              </span>
              <span className={`inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 font-semibold text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground ${compact ? "px-4 py-2.5 text-[13px]" : "px-4 py-2.5 text-sm"}`}>
                Entrar
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </a>
      </SpotlightCard>
    );
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <header className="fixed inset-x-0 top-0 z-30 bg-transparent">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_hsl(var(--background)/0.82)_0%,_hsl(var(--background)/0.42)_58%,_transparent_100%)]" />
        <nav className="container relative flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_HORIZONTAL} alt="Realty Inmobiliaria" className="h-8 w-auto" />
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            <GooeyNav
              items={navItems}
              particleCount={14}
              particleDistances={[72, 10]}
              particleR={80}
              initialActiveIndex={0}
              activeIndex={activeNavIndex}
              onActiveChange={setActiveNavIndex}
              onItemSelect={(item) => scrollToSection(item.href.replace("#", ""))}
              animationTime={520}
              timeVariance={220}
              colors={[1, 2, 3, 1, 2, 4]}
            />
            <a
              href="https://realtygi.pe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
            >
              Web Principal
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/20 text-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="container relative pb-4 lg:hidden"
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-[linear-gradient(180deg,_hsl(var(--card)/0.96),_hsl(var(--background)/0.94))] shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="flex flex-col p-3">
                  {navItems.map((item, index) => (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => {
                        setActiveNavIndex(index);
                        scrollToSection(item.href.replace("#", ""));
                      }}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        activeNavIndex === index
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/82 hover:bg-secondary"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  ))}
                  <a
                    href="https://realtygi.pe"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground/82 transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <span>Web Principal</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <section id="inicio" className="relative isolate flex min-h-[100svh] items-center pt-8 md:pt-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(40_52%_30%_/_0.58),_transparent_46%),linear-gradient(180deg,_hsl(32_16%_9%)_0%,_hsl(30_11%_7%)_52%,_hsl(30_10%_5%)_100%)]" />
          {showLightRays ? (
            <Suspense fallback={null}>
              <LightRays
                raysOrigin="top-center"
                raysColor="#d8b56f"
                raysSpeed={0.9}
                lightSpread={0.82}
                rayLength={1.22}
                fadeDistance={1.08}
                saturation={0.72}
                followMouse
                mouseInfluence={0.05}
                noiseAmount={0.045}
                distortion={0.03}
                className="opacity-85"
              />
            </Suspense>
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_hsl(30_10%_6%_/_0.08),_transparent_24%,_transparent_72%,_hsl(30_10%_6%_/_0.42))]" />
          <div className="absolute inset-0 bg-grid opacity-[0.14]" />
        </div>

        <div className="container relative z-10 w-full -translate-y-2 md:-translate-y-8 lg:-translate-y-14">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              Portal Realty
            </motion.div>

            <SplitText
              text="Bienvenido al portal de Realty"
              tag="h1"
              delay={50}
              duration={1.2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-50px"
              textAlign="center"
              className="mt-8 font-display text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg"
            >
              Un unico punto de acceso a las herramientas internas de la organizacion.
            </motion.p>

          </div>
        </div>

        <motion.a
          href="#aplicativos"
          aria-label="Ir a aplicativos"
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("aplicativos");
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="group absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit items-center justify-center md:bottom-12"
        >
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/92 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
          >
            <ArrowDown strokeWidth={2.35} className="h-10 w-10 md:h-12 md:w-12" />
          </motion.span>
        </motion.a>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </section>

      <section id="aplicativos" className="relative py-10 md:py-12 lg:min-h-[100svh]">
        <div className="container flex w-full flex-col justify-start pt-2 md:pt-4 lg:min-h-[calc(100svh-6rem)] lg:pt-6">
          <div
            data-scroll-anchor
            className="mb-7 flex flex-col items-start justify-between gap-4 lg:mb-8 lg:flex-row lg:items-end"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                / Aplicativos
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Acceso rapido a tus <span className="text-gradient-gold">herramientas</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Cada aplicativo esta optimizado para tareas especificas del dia a dia.
              Desplazate por la lista y abre cada plataforma desde una tarjeta interactiva.
            </p>
          </div>

          <div className="relative overflow-hidden lg:p-4">
            <div className="lg:hidden">
              <Carousel
                setApi={setCarouselApi}
                opts={{ align: "center", containScroll: "keepSnaps" }}
                className="mx-auto w-full max-w-sm sm:max-w-md"
              >
                <CarouselContent className="-ml-0">
                  {apps.map((app, index) => (
                    <CarouselItem key={app.name} className="flex basis-full pl-0">
                      <motion.div
                        className="flex h-full w-full justify-center px-1 sm:px-2"
                        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {renderAppCard(app, true)}
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

            <div className="mt-5 flex items-center justify-center gap-2">
              {apps.map((app, index) => (
                <button
                    key={app.name}
                    type="button"
                    aria-label={`Ir al aplicativo ${index + 1}`}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      carouselIndex === index
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-border hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative hidden gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
              {apps.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {renderAppCard(app)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="soporte" className="relative py-10 sm:py-14 lg:min-h-[100svh]">
        <div
          data-scroll-anchor
          className="container flex w-full flex-col justify-start pt-2 sm:pt-5 lg:min-h-[calc(100svh-6rem)] lg:justify-center lg:pt-0"
        >
          <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[1.65rem] border border-border bg-[var(--gradient-card)] p-5 sm:max-w-2xl sm:rounded-[1.85rem] sm:p-8 lg:max-w-5xl lg:rounded-[2rem] lg:p-16">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-glow/15 blur-3xl" />

            <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10">
              <div className="mx-auto max-w-[18rem] text-center sm:max-w-xl lg:mx-0 lg:max-w-none lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  / Soporte
                </p>
                <h2 className="mx-auto mt-3 max-w-[8.8ch] font-display text-[1.95rem] font-bold leading-[0.96] tracking-tight sm:max-w-[11ch] sm:text-[2.8rem] lg:mx-0 lg:max-w-none lg:text-5xl">
                  Necesitas ayuda con un <span className="shiny-text">aplicativo</span>?
                </h2>
                <p className="mx-auto mt-4 max-w-[18rem] text-sm leading-relaxed text-muted-foreground sm:max-w-md sm:text-[15px] lg:mx-0 lg:max-w-md lg:text-base">
                  Escribenos a Asistencia de Sistemas y te respondemos lo antes posible.
                </p>
              </div>

              <div className="mx-auto w-full max-w-sm space-y-3 sm:max-w-md sm:space-y-4 lg:max-w-none">
                <a
                  href="mailto:asistente.sistemas@realtygi.pe"
                  className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[1.25rem] border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-secondary sm:gap-4 sm:rounded-2xl sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email de soporte
                    </p>
                    <p className="text-[0.98rem] font-semibold leading-tight text-foreground [overflow-wrap:anywhere] sm:text-[1.05rem]">
                      asistente.sistemas@realtygi.pe
                    </p>
                  </div>
                  <ArrowUpRight className="h-[18px] w-[18px] shrink-0 justify-self-end text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:h-5 sm:w-5" />
                </a>
                <a
                  href="tel:+5116517376"
                  className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[1.25rem] border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-secondary sm:gap-4 sm:rounded-2xl sm:p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Telefono
                    </p>
                    <p className="text-[1.02rem] font-semibold leading-tight text-foreground sm:text-[1.1rem]">
                      (01) 651 7376
                    </p>
                  </div>
                  <ArrowUpRight className="h-[18px] w-[18px] shrink-0 justify-self-end text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <img src={LOGO_HORIZONTAL} alt="Realty" className="h-6 w-auto" />
          <span>© {new Date().getFullYear()} Realty Inmobiliaria. Portal interno.</span>
          <a href="https://realtygi.pe" target="_blank" rel="noreferrer" className="hover:text-foreground">
            realtygi.pe
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Index;
