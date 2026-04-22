import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, FileSignature, ClipboardCheck, Mail, Phone, ArrowRight } from "lucide-react";
import Aurora from "@/components/Aurora";
import SplitText from "@/components/SplitText";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

// Logo horizontal para fondo oscuro
const LOGO_HORIZONTAL =
  "https://res.cloudinary.com/dtqvmh9te/image/upload/v1761757816/Realty_Inmobiliaria_Horizontal_-_fondo_oscuro_t5r57k.png";

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

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <nav className="container flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_HORIZONTAL} alt="Realty Inmobiliaria" className="h-8 w-auto" />
          </a>
          <div className="hidden items-center gap-10 text-sm font-medium text-muted-foreground md:flex">
            <a href="#inicio" className="transition-colors hover:text-foreground">Inicio</a>
            <a href="#aplicativos" className="transition-colors hover:text-foreground">Aplicativos</a>
            <a href="#soporte" className="transition-colors hover:text-foreground">Soporte</a>
            <a
              href="https://realtygi.pe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
            >
              realtygi.pe
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative isolate flex min-h-[88vh] items-center pt-24">
        <Aurora />

        <div className="container relative z-10">
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
              className="mt-8 font-display text-5xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Un único punto de acceso a las herramientas internas de la organización.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#aplicativos"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Ver aplicativos
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-primary-foreground/15">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
              <a
                href="#soporte"
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-muted-foreground underline-offset-8 transition-colors hover:text-foreground hover:underline"
              >
                Hablar con soporte
              </a>
            </motion.div>
          </div>
        </div>

        {/* Smooth section transition */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* APLICATIVOS */}
      <section id="aplicativos" className="relative scroll-mt-24 py-28">
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

          <ScrollStack
            useWindowScroll
            itemDistance={80}
            itemScale={0.04}
            itemStackDistance={28}
            stackPosition="22%"
            scaleEndPosition="12%"
            baseScale={0.86}
            rotationAmount={0}
            blurAmount={0}
          >
            {apps.map(({ name, tagline, description, url, Icon, tag }) => (
              <ScrollStackItem key={name} itemClassName="border border-border bg-[var(--gradient-card)] shadow-card-elev backdrop-blur-sm">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block h-full w-full"
                >
                  <div className="grid h-full gap-8 md:grid-cols-12 md:items-center">
                    {/* Icono grande */}
                    <div className="md:col-span-3">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 text-primary">
                          <Icon className="h-10 w-10" />
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="md:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {tag}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                          {tagline}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                        {name}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        {description}
                      </p>
                      <p className="mt-4 font-mono text-xs text-muted-foreground">
                        {url.replace("https://", "")}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="md:col-span-2 md:text-right">
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        Entrar
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* SOPORTE */}
      <section id="soporte" className="relative scroll-mt-24 py-28">
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
