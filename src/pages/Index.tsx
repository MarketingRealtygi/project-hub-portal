import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, FileSignature, ClipboardCheck, Sparkles, Mail, Phone } from "lucide-react";
import Aurora from "@/components/Aurora";
import SplitText from "@/components/SplitText";
import SpotlightCard from "@/components/SpotlightCard";

const LOGO_DARK_BG =
  "https://res.cloudinary.com/dtqvmh9te/image/upload/v1774559429/Realty_Inmobiliaria_Horizontal_-_fondo_claro_qqffzq.png";

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
    tagline: "Capacitación continua",
    description:
      "Cursos, materiales y certificaciones para el equipo Realty. Aprende a tu ritmo desde cualquier dispositivo.",
    url: "https://aula.realtygi.pe",
    Icon: GraduationCap,
    tag: "Educación",
  },
  {
    name: "Separaciones",
    tagline: "Reservas inmobiliarias",
    description:
      "Gestiona separaciones de lotes y unidades en tiempo real, con seguimiento del estado y documentación.",
    url: "https://separaciones.realtygi.pe",
    Icon: FileSignature,
    tag: "Comercial",
  },
  {
    name: "Evaluaciones",
    tagline: "Calificación crediticia",
    description:
      "Sistema centralizado para registrar, evaluar y aprobar candidatos con trazabilidad completa.",
    url: "https://evaluaciones.realtygi.pe",
    Icon: ClipboardCheck,
    tag: "Financiero",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* NAV */}
      <header className="absolute inset-x-0 top-0 z-30">
        <nav className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center gap-3">
            <img src={LOGO_DARK_BG} alt="Realty Inmobiliaria" className="h-9 w-auto" />
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#aplicativos" className="transition-colors hover:text-foreground">Aplicativos</a>
            <a href="#contacto" className="transition-colors hover:text-foreground">Contacto</a>
            <a
              href="https://realtygi.pe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-foreground transition-colors hover:bg-primary/20"
            >
              Web pública
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center pt-28">
        <Aurora />

        <div className="container relative z-10 grid gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Portal interno · Realty Inmobiliaria
          </motion.div>

          <div className="mx-auto max-w-5xl text-center">
            <SplitText
              as="h1"
              text="Bienvenido al Portal Realty"
              className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            />
            <SplitText
              as="h2"
              text="¿Qué deseas hacer hoy?"
              delay={0.6}
              className="mt-6 font-display text-3xl font-light italic md:text-5xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
            >
              Un solo lugar para acceder a todos los aplicativos de la organización.
              Selecciona la herramienta con la que necesitas trabajar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#aplicativos"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[var(--gradient-gold)] px-8 py-4 text-sm font-semibold text-primary-foreground shadow-gold transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Ver aplicativos</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-card"
              >
                Soporte
              </a>
            </motion.div>
          </div>
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
                  Nuestro equipo está disponible para resolver cualquier duda o problema técnico.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:informes@realtygi.pe"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-secondary"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">informes@realtygi.pe</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
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
