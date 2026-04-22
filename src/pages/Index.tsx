import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, GraduationCap, FileSignature, ClipboardCheck, Mail, Phone, ArrowRight } from "lucide-react";
import Aurora from "@/components/Aurora";
import SpotlightCard from "@/components/SpotlightCard";

// Logo isotipo (1x1) — se ve mejor sobre fondo oscuro
const LOGO_MARK =
  "https://res.cloudinary.com/dtqvmh9te/image/upload/v1774559393/Realty_Inmobiliaria_1x1_-_fondo_claro_gxlaw0.png";

type AppItem = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  Icon: typeof GraduationCap;
  tag: string;
};

const apps: AppItem[] = [
  {
    name: "Aula Virtual",
    tagline: "Capacitación",
    description:
      "Cursos, materiales y certificaciones para el equipo. Aprende a tu ritmo.",
    url: "https://aula.realtygi.pe",
    Icon: GraduationCap,
    tag: "Educación",
  },
  {
    name: "Separaciones",
    tagline: "Reservas",
    description:
      "Gestiona separaciones de lotes y unidades con seguimiento en tiempo real.",
    url: "https://separaciones.realtygi.pe",
    Icon: FileSignature,
    tag: "Comercial",
  },
  {
    name: "Evaluaciones",
    tagline: "Calificación",
    description:
      "Registra, evalúa y aprueba candidatos con trazabilidad completa.",
    url: "https://evaluaciones.realtygi.pe",
    Icon: ClipboardCheck,
    tag: "Financiero",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-30">
        <nav className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_MARK} alt="Realty Inmobiliaria" className="h-11 w-11 rounded-lg bg-foreground/95 p-1.5" />
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Portal</span>
              <span className="text-sm font-bold tracking-wide text-foreground">Realty</span>
            </div>
          </a>
          <div className="hidden items-center gap-10 text-sm font-medium text-muted-foreground md:flex">
            <a href="#aplicativos" className="transition-colors hover:text-foreground">Aplicativos</a>
            <a href="#contacto" className="transition-colors hover:text-foreground">Soporte</a>
            <a
              href="https://realtygi.pe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-primary"
            >
              realtygi.pe
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center pt-28">
        <Aurora />

        <div className="container relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* Columna texto */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground"
              >
                <span className="h-px w-8 bg-primary" />
                Portal interno
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-[-0.02em] text-foreground md:text-7xl lg:text-[5.5rem]"
              >
                Trabaja con todo lo que <span className="italic font-light text-gradient-gold">Realty</span> pone a tu alcance.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                Un único punto de acceso a las herramientas internas de la organización.
                Limpio, rápido y diseñado para tu día a día.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-12 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#aplicativos"
                  className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  Ver aplicativos
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-primary-foreground/15">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-2 py-4 text-sm font-semibold text-muted-foreground underline-offset-8 transition-colors hover:text-foreground hover:underline"
                >
                  Hablar con soporte
                </a>
              </motion.div>
            </div>

            {/* Columna decorativa con marca */}
            <div className="hidden lg:col-span-5 lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto aspect-square w-full max-w-md"
              >
                {/* Anillos */}
                <div className="absolute inset-0 rounded-full border border-border/60" />
                <div className="absolute inset-8 rounded-full border border-border/40" />
                <div className="absolute inset-16 rounded-full border border-primary/30" />
                <div className="absolute inset-24 rounded-full border border-primary/20" />

                {/* Halo */}
                <div className="absolute inset-12 rounded-full bg-primary/10 blur-2xl" />

                {/* Logo central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-3xl bg-foreground p-6 shadow-card-elev">
                    <img src={LOGO_MARK} alt="Realty" className="h-24 w-24" />
                  </div>
                </div>

                {/* Pings */}
                <span className="absolute right-4 top-1/3 h-2 w-2 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
                <span className="absolute bottom-1/4 left-2 h-2 w-2 rounded-full bg-primary-glow shadow-[0_0_20px_hsl(var(--primary-glow))]" />
              </motion.div>
            </div>
          </div>

          {/* Stats / meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 gap-8 border-t border-border/60 pt-8 md:grid-cols-4"
          >
            {[
              { k: "3", v: "Aplicativos activos" },
              { k: "24/7", v: "Acceso disponible" },
              { k: "1", v: "Punto de entrada" },
              { k: "100%", v: "Equipo Realty" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl font-bold text-foreground md:text-4xl">{s.k}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* APLICATIVOS */}
      <section id="aplicativos" className="relative py-28">
        <div className="container">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                / Aplicativos
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Acceso rápido a tus <span className="text-gradient-gold">herramientas</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Cada aplicativo está optimizado para tareas específicas del día a día.
              Pasa el cursor sobre cada tarjeta para verla en acción.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {apps.map(({ name, tagline, description, url, Icon, tag }) => (
              <motion.a
                key={name}
                variants={item}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col gap-8 p-8">
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {tag}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                        {tagline}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                        {name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <span className="font-mono text-xs text-muted-foreground">
                        {url.replace("https://", "")}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                        Entrar
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="relative py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-[var(--gradient-card)] p-10 md:p-16">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-glow/15 blur-3xl" />

            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                  / Soporte
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  ¿Necesitas ayuda con un <span className="shiny-text">aplicativo</span>?
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Escríbenos a Asistencia de Sistemas y te respondemos lo antes posible.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:asistente.sistemas@realtygi.pe"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Email de soporte</p>
                    <p className="truncate font-semibold text-foreground">asistente.sistemas@realtygi.pe</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </a>
                <a
                  href="tel:+5116517376"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Teléfono</p>
                    <p className="font-semibold text-foreground">(01) 651 7376</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-3">
            <img src={LOGO_DARK_BG} alt="Realty" className="h-6 w-auto opacity-80" />
            <span>© {new Date().getFullYear()} Realty Inmobiliaria. Portal interno.</span>
          </div>
          <a href="https://realtygi.pe" target="_blank" rel="noreferrer" className="hover:text-foreground">
            realtygi.pe
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Index;
