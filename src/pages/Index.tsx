import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FolderOpen,
  Globe,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import SplitText from "@/components/SplitText";
import realtygiPreview from "@/assets/realtygi-preview.png";
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
  img?: string;
  url: string;
  tag: string;
  icon: LucideIcon;
  imgFit?: "cover" | "contain";
};

const apps: AppItem[] = [
  {
    name: "Aula Virtual",
    tagline: "Capacitacion",
    description:
      "Cursos, materiales y certificaciones para el equipo. Aprende a tu ritmo.",
    img: "https://res.cloudinary.com/dtqvmh9te/image/upload/v1777407688/aula_clrq3i.png",
    url: "https://aula.realtygi.pe",
    tag: "Educación",
    icon: BookOpen,
  },
  {
    name: "Separaciones",
    tagline: "Reservas",
    description:
      "Gestiona separaciones de lotes y unidades con seguimiento en tiempo real.",
    img: "https://res.cloudinary.com/dtqvmh9te/image/upload/v1776891989/plataforma_separaciones_e89wlm.png",
    url: "https://separaciones.realtygi.pe",
    tag: "Comercial",
    icon: LayoutDashboard,
  },
  {
    name: "Evaluaciones",
    tagline: "Calificación",
    description:
      "Registra, evalua y aprueba asesores con trazabilidad completa.",
    img: "https://res.cloudinary.com/dtqvmh9te/image/upload/v1776892341/sistema_evaluaciones_wjizcc.png",
    url: "https://evaluaciones.realtygi.pe",
    tag: "Educación",
    icon: ClipboardCheck,
  },
  {
    name: "Drive Comercial",
    tagline: "Archivos",
    description:
      "Accede a documentos, carpetas compartidas y recursos del equipo en un solo lugar.",
    url: "https://drive.google.com/",
    tag: "Comercial",
    icon: FolderOpen,
  },
];

const chunkItems = <T,>(items: T[], size: number) =>
  items.reduce<T[][]>((acc, item, index) => {
    const pageIndex = Math.floor(index / size);
    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }
    acc[pageIndex].push(item);
    return acc;
  }, []);

const desktopPages = chunkItems(apps, 3);

type CardMode = "desktop" | "mobile";

const shellMotion = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as const,
};

const Index = () => {
  const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi>();
  const [mobileCarouselIndex, setMobileCarouselIndex] = useState(0);
  const [desktopPageIndex, setDesktopPageIndex] = useState(0);
  const [showLightRays, setShowLightRays] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setShowLightRays(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: ReturnType<typeof requestIdleCallback> | null = null;

    const enableLightRays = () => setShowLightRays(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enableLightRays, { timeout: 1200 });
    } else {
      timeoutId = setTimeout(enableLightRays, 400);
    }

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    updateViewport();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  useEffect(() => {
    if (!mobileCarouselApi || !isMobileViewport) return;

    const onSelect = () => {
      setMobileCarouselIndex(mobileCarouselApi.selectedScrollSnap());
    };

    onSelect();
    mobileCarouselApi.on("select", onSelect);
    mobileCarouselApi.on("reInit", onSelect);

    return () => {
      mobileCarouselApi.off("select", onSelect);
      mobileCarouselApi.off("reInit", onSelect);
    };
  }, [isMobileViewport, mobileCarouselApi]);

  const renderAppCard = (app: AppItem, mode: CardMode) => {
    const isMobileCard = mode === "mobile";
    const { name, description, url, img, icon: Icon, imgFit } = app;
    const fitClass =
      imgFit === "contain"
        ? "object-cover object-top"
        : "object-cover object-center";
    const spotlightStyle = {
      ["--spotlight-padding" as string]: isMobileCard ? "1rem" : "1.35rem",
      ["--spotlight-radius" as string]: isMobileCard ? "1.5rem" : "1.5rem",
    } as CSSProperties;

    return (
      <SpotlightCard
        className={`h-full ${
          isMobileCard ? "mx-auto w-full max-w-[22rem]" : "w-full max-w-[23rem]"
        }`.trim()}
        spotlightColor="rgba(214, 168, 71, 0.18)"
        style={spotlightStyle}
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={`group flex h-full flex-col ${
            isMobileCard ? "min-h-[21rem]" : "min-h-[25rem]"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-[1.1rem] border border-border/70 bg-[radial-gradient(circle_at_top,_rgba(214,168,71,0.22),_rgba(10,10,10,0.95)_78%)] ${
              isMobileCard ? "mb-3 aspect-[16/9]" : "mb-4 aspect-[16/10]"
            }`}
          >
            {img ? (
              <img
                  src={img}
                  alt={`Vista previa de ${name}`}
                  loading="lazy"
                  decoding="async"
                  sizes={
                    isMobileCard
                      ? "(max-width: 767px) 86vw, 352px"
                      : "(min-width: 1280px) 22rem, (min-width: 1024px) 20rem, 32vw"
                  }
                  className={`h-full w-full ${fitClass} transition-transform duration-500 group-hover:scale-[1.03]`}
                />
            ) : (
              <div className="flex h-full items-center justify-center p-6">
                <div
                  className={`flex items-center justify-center rounded-2xl border border-primary/20 bg-background/70 text-primary backdrop-blur ${
                    isMobileCard ? "h-16 w-16" : "h-[3.6rem] w-[3.6rem]"
                  }`}
                >
                  <Icon className={isMobileCard ? "h-8 w-8" : "h-5.5 w-5.5"} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <div className="min-w-0">
              <h3
                className={`font-display font-bold leading-tight text-foreground ${
                  isMobileCard ? "text-[1.55rem]" : "text-[1.35rem]"
                }`}
              >
                {name}
              </h3>
            </div>

            <p
              className={`mt-3 text-muted-foreground ${
                isMobileCard
                  ? "text-[13.5px] leading-relaxed"
                  : "text-[12.5px] leading-[1.55]"
              }`}
            >
              {description}
            </p>

            <div className="mt-auto pt-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 font-semibold text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground ${
                  isMobileCard
                    ? "px-4 py-2.5 text-sm"
                    : "w-full justify-center px-4 py-2 text-[12px]"
                }`}
              >
                Abrir aplicativo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </a>
      </SpotlightCard>
    );
  };

  const getDesktopPageLayout = (page: AppItem[]) => {
    if (page.length === 3) {
      return "mx-auto grid max-w-[72rem] grid-cols-3 items-stretch gap-5";
    }

    if (page.length === 2) {
      return "mx-auto grid max-w-[48rem] grid-cols-2 items-stretch gap-5";
    }

    return "mx-auto grid max-w-[23rem] grid-cols-1 items-stretch";
  };

  const currentDesktopPage = desktopPages[desktopPageIndex] ?? desktopPages[0];
  const isFirstDesktopPage = desktopPageIndex === 0;
  const isLastDesktopPage = desktopPageIndex === desktopPages.length - 1;

  const desktopNavButtonClass =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/75 text-primary shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background md:h-screen md:overflow-hidden">
      <section className="relative isolate min-h-screen overflow-hidden md:h-full">
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

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[76rem] flex-col px-4 py-4 sm:px-6 sm:py-5 md:flex md:h-full md:min-h-0 md:flex-col md:justify-between">
          <header className="mx-auto flex w-full max-w-[72rem] items-center justify-between gap-4 py-2 sm:py-2.5 md:py-3">
            <img
              src={LOGO_HORIZONTAL}
              alt="Realty Inmobiliaria"
              className="h-4 w-auto sm:h-7"
            />
            <a
              href="https://realtygi.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary sm:text-xs"
            >
              Realtygi.pe
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
            </a>
          </header>

          <div className="flex min-h-0 flex-1 items-center justify-center py-6 sm:py-7 md:py-0">
            <motion.section
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={shellMotion}
              className="flex w-full flex-col items-center justify-center gap-4 md:gap-5"
            >
              <div className="flex w-full flex-col items-center text-center pb-3 sm:pb-4 md:pb-0">
                <SplitText
                  tag="h1"
                  text={
                    isMobileViewport
                      ? "Bienvenido\u00A0a\u00A0nuestro portal\u00A0interno"
                      : "Bienvenido a nuestro portal interno"
                  }
                  className={`font-display text-[1.6rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-[2rem] md:text-[2.4rem] ${
                    isMobileViewport
                      ? "[&_.split-word:nth-child(n+2)_.split-char]:text-primary"
                      : "[&_.split-word:nth-child(n+4)_.split-char]:text-primary"
                  }`}
                  delay={35}
                  duration={0.9}
                  splitType="chars"
                  threshold={0.1}
                  rootMargin="0px"
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </div>
              {isMobileViewport ? (
                <div className="mx-auto mt-2 w-full max-w-sm">
                  <div className="relative">
                    <Carousel
                      setApi={setMobileCarouselApi}
                      opts={{ align: "center", containScroll: "trimSnaps" }}
                      className="mx-auto w-full max-w-sm"
                    >
                      <CarouselContent className="-ml-0">
                        {apps.map((app, index) => (
                          <CarouselItem key={app.name} className="basis-full pl-0">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                ...shellMotion,
                                delay: index * 0.04,
                              }}
                              className="px-1"
                            >
                              {renderAppCard(app, "mobile")}
                            </motion.div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>

                    <button
                      type="button"
                      aria-label="Anterior"
                      onClick={() => mobileCarouselApi?.scrollPrev()}
                      disabled={mobileCarouselIndex === 0}
                      className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-1 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Siguiente"
                      onClick={() => mobileCarouselApi?.scrollNext()}
                      disabled={mobileCarouselIndex === apps.length - 1}
                      className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2">
                    {apps.map((app, index) => (
                      <button
                        key={app.name}
                        type="button"
                        aria-label={`Ir al aplicativo ${index + 1}`}
                        onClick={() => mobileCarouselApi?.scrollTo(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          mobileCarouselIndex === index
                            ? "w-8 bg-primary"
                            : "w-2.5 bg-border hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto w-full max-w-[74rem]">
                  <div className="mx-auto grid w-full grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-3">
                    <button
                      type="button"
                      aria-label="Pagina anterior"
                      onClick={() =>
                        setDesktopPageIndex((current) => Math.max(current - 1, 0))
                      }
                      disabled={isFirstDesktopPage}
                      className={desktopNavButtonClass}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <motion.div
                      key={`desktop-page-${desktopPageIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={shellMotion}
                      className="min-w-0 flex-1"
                    >
                      <div className={getDesktopPageLayout(currentDesktopPage)}>
                        {currentDesktopPage.map((app) => (
                          <div
                            key={app.name}
                            className="flex min-w-0 justify-center"
                          >
                            {renderAppCard(app, "desktop")}
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <button
                      type="button"
                      aria-label="Pagina siguiente"
                      onClick={() =>
                        setDesktopPageIndex((current) =>
                          Math.min(current + 1, desktopPages.length - 1)
                        )
                      }
                      disabled={isLastDesktopPage}
                      className={desktopNavButtonClass}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2">
                    {desktopPages.map((_, index) => {
                      const isActive = desktopPageIndex === index;

                      return (
                        <button
                          key={`desktop-page-${index + 1}`}
                          type="button"
                          aria-label={`Ir a la pagina ${index + 1}`}
                          onClick={() => setDesktopPageIndex(index)}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-8 bg-primary"
                              : "w-2.5 bg-border hover:bg-muted-foreground/50"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.section>
          </div>

          <footer className="mx-auto mt-6 flex w-full max-w-[72rem] items-center justify-between gap-4 border-t border-border/80 pt-3 text-[11px] text-muted-foreground md:mt-0 md:pt-4">
            <span>Portal Interno Realty</span>
            <span>&copy; {new Date().getFullYear()} Realty Inmobiliaria</span>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default Index;
