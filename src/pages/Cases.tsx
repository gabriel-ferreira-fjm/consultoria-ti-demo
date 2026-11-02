import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  animate,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Globe,
  Building2,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Database,
} from "lucide-react";

/**
 * ✅ CASES PAGE (Premium / Modern / Animated) — FULL FILE (100%)
 * Base visual language: igual à página Services que você enviou (dark, blobs, linhas, marquee).
 * ✅ Logos: locais em public/logos
 *
 * Inclui:
 * - Logos de clientes por região
 * - ✅ NOVO: Logos de tecnologias/DBs (Aurora, DynamoDB, MongoDB, MS SQL, MySQL, Oracle, Postgres, Redis, Teradata)
 *
 * IMPORTANTE:
 * - Paths assumem que os arquivos estão em: public/logos/...
 */

// ============================================
// LOGOS (local) - public/logos
// ============================================

type Client = { name: string; logo: string };

const clientLogos: Record<"global" | "portugal" | "europe" | "brazil", Client[]> = {
  global: [
    { name: "Empresa exemplo 1", logo: "/demo/logo.svg" }, // arquivo: rebook
    { name: "Empresa exemplo 2", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 3", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 4", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 5", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 6", logo: "/demo/logo.svg" }, // arquivo: bosh
    { name: "Empresa exemplo 7", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 8", logo: "/demo/logo.svg" },
  ],
  portugal: [
    { name: "Empresa exemplo 9", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 10", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 11", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 12", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 13", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 14", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 15", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 16", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 17", logo: "/demo/logo.svg" },
  ],
  europe: [
    { name: "Empresa exemplo 18", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 19", logo: "/demo/logo.svg" },
  ],
  brazil: [
    { name: "Empresa exemplo 20", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 21", logo: "/demo/logo.svg" },
    { name: "Empresa exemplo 22", logo: "/demo/logo.svg" },
  ],
};

// ✅ NOVO: Tech / Database logos (mesmo caminho public/logos)
const techLogos: Client[] = [
  { name: "Amazon Aurora", logo: "/demo/logo.svg" },
  { name: "Amazon DynamoDB", logo: "/demo/logo.svg" },
  { name: "MongoDB", logo: "/demo/logo.svg" },
  { name: "Microsoft SQL Server", logo: "/demo/logo.svg" },
  { name: "MySQL", logo: "/demo/logo.svg" },
  { name: "Oracle", logo: "/demo/logo.svg" },
  { name: "PostgreSQL", logo: "/demo/logo.svg" },
  { name: "Redis", logo: "/demo/logo.svg" },
  { name: "Teradata", logo: "/demo/logo.svg" },
];

// ============================================
// SHARED COMPONENTS - Matching Services style
// ============================================

const MorphingBlob = ({
  className,
  color,
  delay = 0,
}: {
  className?: string;
  color: string;
  delay?: number;
}) => {
  const id = useRef(`gradient-${color}-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <motion.div
      className={`absolute pointer-events-none ${className || ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id={id.current} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#${id.current})`}
          animate={{
            d: [
              "M 100 0 C 150 0 200 50 200 100 C 200 150 150 200 100 200 C 50 200 0 150 0 100 C 0 50 50 0 100 0",
              "M 100 10 C 140 0 200 60 190 100 C 180 140 140 200 100 190 C 60 180 0 140 10 100 C 20 60 60 20 100 10",
              "M 100 0 C 150 0 200 50 200 100 C 200 150 150 200 100 200 C 50 200 0 150 0 100 C 0 50 50 0 100 0",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};

const AnimatedTitle = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = (text || "").split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const CountUp = ({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, target, {
            duration,
            ease: "easeOut",
            onUpdate: (value) => setCount(Math.round(value)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={nodeRef}>
      {count}
      {suffix}
    </span>
  );
};

const InfiniteScrollText = ({ text, speed = 35 }: { text: string; speed?: number }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap pointer-events-none">
      <motion.div className="inline-block" animate={{ x: [0, -1500] }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }}>
        {[...Array(8)].map((_, i) => (
          <span key={i} className="inline-block mx-8 text-[8rem] font-bold text-white/[0.015] select-none">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const HoverCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div className={className} whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
};

const AnimatedLine = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="h-[2px] bg-NEXO-cyan"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    />
  );
};

// ============================================
// EXTRA COMPONENTS (logos UI)
// ============================================

/**
 * ✅ LOGO CARD - CORREÇÕES APLICADAS:
 * - brightness-0 invert: transforma qualquer logo em branco
 * - max-h-14 (antes era max-h-10): logos maiores
 * - h-20 no container (antes era h-16): mais espaço vertical
 * - opacity-80 no estado normal, opacity-100 no hover
 */
const LogoCard = ({ client }: { client: Client }) => {
  const [failed, setFailed] = useState(false);

  return (
    <HoverCard className="h-full">
      <div className="group h-full p-4 md:p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors">
        <div className="flex items-center justify-center h-20">
          {!failed ? (
            <img
              src={client.logo}
              alt={client.name}
              className="max-h-14 max-w-full object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300"
              loading="lazy"
              onError={() => {
                console.warn("Logo não encontrado:", client.logo);
                setFailed(true);
              }}
            />
          ) : (
            <span className="text-sm font-semibold text-white/70 text-center">{client.name}</span>
          )}
        </div>
      </div>
    </HoverCard>
  );
};

const MarqueeLogos = ({ logos, speed = 28 }: { logos: Client[]; speed?: number }) => {
  const row = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
      <motion.div
        className="flex items-center gap-4 py-5 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {row.map((c, i) => (
          <div key={`${c.name}-${i}`} className="w-[200px] shrink-0">
            <LogoCard client={c} />
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent" />
    </div>
  );
};

const RegionPills = ({
  active,
  setActive,
  items,
}: {
  active: string;
  setActive: (v: string) => void;
  items: { key: string; label: string; icon: React.ElementType }[];
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.key;

        return (
          <button
            key={it.key}
            onClick={() => setActive(it.key)}
            className={[
              "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
              isActive
                ? "bg-NEXO-cyan text-[#0a0a0f] shadow-lg shadow-NEXO-cyan/15"
                : "bg-white/[0.03] text-white/70 border border-white/5 hover:border-white/10 hover:text-white",
            ].join(" ")}
          >
            <Icon className={["h-4 w-4", isActive ? "text-[#0a0a0f]" : "text-NEXO-cyan"].join(" ")} />
            {it.label}
          </button>
        );
      })}
    </div>
  );
};

// ============================================
// CASES PAGE
// ============================================

const Cases = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const reduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);

  // Hero parallax (igual Services)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 80]);

  const regions = useMemo(
    () => [
      { key: "global", icon: Globe, label: t("cases.regions.global", { defaultValue: "Global Clients" }), logos: clientLogos.global },
      { key: "portugal", icon: MapPin, label: t("cases.regions.portugal", { defaultValue: "Portugal" }), logos: clientLogos.portugal },
      { key: "europe", icon: Building2, label: t("cases.regions.europe", { defaultValue: "Europe" }), logos: clientLogos.europe },
      { key: "brazil", icon: MapPin, label: t("cases.regions.brazil", { defaultValue: "Brazil" }), logos: clientLogos.brazil },
    ],
    [t]
  );

  const [activeRegion, setActiveRegion] = useState<string>("global");
  const active = useMemo(() => regions.find((r) => r.key === activeRegion) ?? regions[0], [regions, activeRegion]);

  const [openId, setOpenId] = useState<string | null>("proof");
  const toggle = (id: string) => setOpenId((p) => (p === id ? null : id));

  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true, margin: "-120px" });

  return (
    <div ref={containerRef} className="bg-[#0a0a0f] min-h-screen pt-20 lg:pt-24">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
        <MorphingBlob className="w-[600px] h-[600px] -top-48 -right-48 blur-[100px]" color="#00d4ff" delay={0} />
        <MorphingBlob className="w-[500px] h-[500px] -bottom-32 -left-32 blur-[100px]" color="#ffb800" delay={0.25} />

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #fff 1px, transparent 1px),
              linear-gradient(180deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute top-1/2 -translate-y-1/2 w-full">
          <InfiniteScrollText text="CASES • GLOBAL DELIVERY • TRUST •" speed={42} />
        </div>

        <motion.div
          className="absolute top-8 left-8 w-20 h-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-NEXO-cyan to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-NEXO-cyan to-transparent" />
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-8 w-20 h-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-NEXO-cyan to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-NEXO-cyan to-transparent" />
        </motion.div>

        <motion.div className="relative z-10 container-custom px-4" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
                <span className="text-sm text-white/60 font-medium tracking-wider uppercase">
                  {t("cases.worldPresence", { defaultValue: "World Presence" })}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="hidden sm:flex items-center gap-2 text-sm text-white/40"
              >
                <Sparkles className="w-4 h-4 text-NEXO-gold" />
                <span className="font-mono">NEXO / Cases</span>
              </motion.div>
            </div>

            <div className="relative mb-12 md:mb-16">
              <motion.div className="w-24 md:w-32 mb-6 md:mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <AnimatedLine delay={0.35} />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1] tracking-tight">
                <AnimatedTitle
                  text={t("cases.title", { defaultValue: "They Trust Us" })}
                  className="block text-NEXO-cyan mb-2"
                  delay={0.45}
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="text-base md:text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl"
              >
                {t("cases.subtitle", { defaultValue: "Leading companies worldwide rely on our expertise." })}
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-end">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.15 }}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/${currentLang}/contact`}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-NEXO-cyan text-[#0a0a0f] font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
                  >
                    <span>{t("cta.button", { defaultValue: "Contact us" })}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#clients"
                    className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:border-NEXO-cyan hover:text-NEXO-cyan"
                  >
                    <span>{t("cases.clientsTrust", { defaultValue: "They Trust Us" })}</span>
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: ShieldCheck, title: t("stats.years", { defaultValue: "Years" }), value: "30+" },
                    { icon: Users, title: t("stats.professionals", { defaultValue: "Professionals" }), value: "300+" },
                    { icon: TrendingUp, title: t("stats.projects", { defaultValue: "Projects" }), value: "500+" },
                  ].map((p, idx) => {
                    const Icon = p.icon;
                    return (
                      <div key={idx} className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-NEXO-cyan" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-white">{p.value}</div>
                            <div className="text-xs text-white/40">{p.title}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.25 }}
                className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-NEXO-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-NEXO-cyan">
                      {t("cases.worldPresence", { defaultValue: "World Presence" })}
                    </p>
                    <p className="text-sm text-white/40">
                      {t("cases.worldPresenceSubtitle", { defaultValue: "We serve clients across multiple continents with excellence." })}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] p-2">
                  <img
                    src="/demo/visual.svg"
                    alt="World Presence"
                    className="w-full rounded-lg opacity-90"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="pt-3 grid grid-cols-2 gap-2">
                    {regions.map((r) => {
                      const Icon = r.icon;
                      return (
                        <div key={r.key} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-NEXO-cyan" />
                            <span className="text-xs font-semibold text-white/70">{r.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-[10px] text-white/30 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
              {t("cases.title", { defaultValue: "Cases" })}
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ==================== CLIENTS ==================== */}
      <section id="clients" ref={trustRef} className="relative py-24 md:py-32 overflow-hidden">
        <MorphingBlob className="w-[420px] h-[420px] top-0 left-0 blur-[110px]" color="#00d4ff" delay={0} />
        <MorphingBlob className="w-[520px] h-[520px] -bottom-56 -right-56 blur-[120px]" color="#ffb800" delay={0.2} />

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-NEXO-cyan mb-4">
                {t("cases.clientsTrust", { defaultValue: "They Trust Us" })}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t("cases.clientsTrust", { defaultValue: "They Trust Us" })}
              </h2>
              <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
                {t("cases.clientsTrustSubtitle", { defaultValue: "Leading companies worldwide rely on our expertise." })}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10"
            >
              <RegionPills
                active={activeRegion}
                setActive={setActiveRegion}
                items={regions.map((r) => ({ key: r.key, label: r.label, icon: r.icon }))}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-8"
              >
                <MarqueeLogos logos={active.logos} speed={reduceMotion ? 999 : 28} />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {active.logos.map((c) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={trustInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      <LogoCard client={c} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-14 grid lg:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-white/5 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-NEXO-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-NEXO-cyan">NEXO</p>
                    <p className="text-sm text-white/40">
                      {t("cases.worldPresenceSubtitle", { defaultValue: "We serve clients across multiple continents with excellence." })}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    t("cases.worldPresenceSubtitle", { defaultValue: "Multi-continent delivery with excellence." }),
                    t("cases.clientsTrustSubtitle", { defaultValue: "Trusted by global brands and institutions." }),
                    t("cta.subtitle", { defaultValue: "Tell us what you need — we'll propose the best solution." }),
                  ].map((x, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                      <CheckCircle className="w-4 h-4 text-NEXO-cyan flex-shrink-0 mt-0.5" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7 space-y-3"
              >
                {[
                  {
                    id: "proof",
                    title: t("cases.worldPresence", { defaultValue: "Consolidated World Presence" }),
                    text: t("cases.worldPresenceSubtitle", { defaultValue: "We serve clients across multiple continents with excellence." }),
                  },
                  {
                    id: "trust",
                    title: t("cases.clientsTrust", { defaultValue: "They Trust Us" }),
                    text: t("cases.clientsTrustSubtitle", { defaultValue: "Leading companies worldwide rely on our expertise." }),
                  },
                  {
                    id: "impact",
                    title: t("stats.projects", { defaultValue: "Projects Delivered" }),
                    text: t("cases.subtitle", { defaultValue: "A proven track record of delivery and outcomes." }),
                  },
                ].map((row) => {
                  const isOpen = openId === row.id;

                  return (
                    <div key={row.id} className="rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden">
                      <button
                        onClick={() => toggle(row.id)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <div>
                          <div className="text-sm font-bold text-white">{row.title}</div>
                          <div className="text-sm text-white/40 mt-1">{row.text}</div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-white/40 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                        )}
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-white/5 text-sm text-white/50 leading-relaxed">
                          {t("servicesPage.details.tipText", {
                            defaultValue:
                              "Open only what you need — the rest stays compact for faster scanning and clearer decisions.",
                          })}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ✅ TECH STACK (NEW SECTION) ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
          <InfiniteScrollText text="DATABASES • CLOUD • DATA •" speed={46} />
        </div>

        <MorphingBlob className="w-[420px] h-[420px] -top-44 -left-44 blur-[120px]" color="#00d4ff" delay={0} />
        <MorphingBlob className="w-[520px] h-[520px] -bottom-56 -right-56 blur-[130px]" color="#ffb800" delay={0.15} />

        <div className="container-custom px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-wider text-NEXO-cyan mb-4">
                {t("cases.tech.label", { defaultValue: "Technology" })}
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t("cases.tech.title", { defaultValue: "Database Platforms We Work With" })}
              </h2>

              <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
                {t("cases.tech.subtitle", { defaultValue: "From legacy to cloud-native — we support, tune, migrate and secure your data stack." })}
              </p>
            </motion.div>

            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-NEXO-cyan" />
              </div>
              <span className="text-sm text-white/50">
                {t("cases.tech.note", { defaultValue: "Selected platforms (expandable list)" })}
              </span>
            </div>

            <MarqueeLogos logos={techLogos} speed={reduceMotion ? 999 : 26} />

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techLogos.map((c) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <LogoCard client={c} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-12 rounded-2xl bg-white/[0.03] border border-white/5 p-6"
            >
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: t("cases.tech.p1", { defaultValue: "Performance Tuning" }),
                    text: t("cases.tech.p1d", { defaultValue: "Query optimization, indexing strategies, capacity planning." }),
                  },
                  {
                    title: t("cases.tech.p2", { defaultValue: "Reliability & DR" }),
                    text: t("cases.tech.p2d", { defaultValue: "Backups, replication, HA design, disaster recovery drills." }),
                  },
                  {
                    title: t("cases.tech.p3", { defaultValue: "Security" }),
                    text: t("cases.tech.p3d", { defaultValue: "Hardening, access controls, auditing, compliance-ready practices." }),
                  },
                ].map((b, i) => (
                  <div key={i} className="rounded-xl bg-white/[0.02] border border-white/5 p-5">
                    <div className="text-sm font-bold text-white">{b.title}</div>
                    <div className="mt-2 text-sm text-white/50">{b.text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
          <InfiniteScrollText text="TRUST • DELIVERY • PERFORMANCE •" speed={48} />
        </div>

        <div className="container-custom px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {[
                { value: 30, suffix: "+", label: t("stats.years", { defaultValue: "Years" }) },
                { value: 300, suffix: "+", label: t("stats.professionals", { defaultValue: "Professionals" }) },
                { value: 500, suffix: "+", label: t("stats.projects", { defaultValue: "Projects" }) },
                { value: 4, suffix: "", label: t("cases.countries", { defaultValue: "Countries" }) },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <CountUp target={s.value} suffix={s.suffix} duration={reduceMotion ? 0.01 : 1.8} />
                  </div>
                  <div className="text-xs md:text-sm text-white/40">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <MorphingBlob className="w-[460px] h-[460px] -top-44 -right-44 blur-[120px]" color="#00d4ff" delay={0} />

        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 mx-auto mb-8 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-NEXO-cyan" />
              </div>

              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t("cta.title", { defaultValue: "Let's build something solid" })}
              </h2>
              <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl mx-auto">
                {t("cta.subtitle", { defaultValue: "Tell us what you need — we'll propose the best solution." })}
              </p>

              <Link
                to={`/${currentLang}/contact`}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-NEXO-cyan text-[#0a0a0f] font-bold text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
              >
                <span>{t("cta.button", { defaultValue: "Contact us" })}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-NEXO-navy to-transparent pointer-events-none" />
      </section>
    </div>
  );
};

export default Cases;
