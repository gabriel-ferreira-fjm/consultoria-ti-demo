import React, { useMemo, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Monitor,
  Shield,
  Zap,
  Lock,
  ArrowRightLeft,
  Users,
  CheckCircle,
  ArrowRight,
  Database,
  UserCheck,
  Handshake,
  Headset,
  Clock,
  Server,
  RefreshCw,
  HardDrive,
  Wrench,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Target,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect } from "react";

// ============================================
// SHARED COMPONENTS - Matching About page style
// ============================================

// Morphing Blob Shape
const MorphingBlob = ({ className, color, delay = 0 }: { className?: string; color: string; delay?: number }) => {
  const id = useRef(`gradient-${color}-${Math.random().toString(36).substr(2, 9)}`);
  
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
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
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </motion.div>
  );
};

// Animated Title - Word by word
const AnimatedTitle = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + (wordIndex * 0.08),
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Count Up Animation
const CountUp = ({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) => {
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

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// Infinite Scroll Text
const InfiniteScrollText = ({ text, speed = 35 }: { text: string; speed?: number }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap pointer-events-none">
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1500] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="inline-block mx-8 text-6xl md:text-7xl lg:text-[8rem] font-bold text-white/[0.015] select-none">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Hover Card
const HoverCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Animated Line
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
// SERVICE TYPES
// ============================================

type Service = {
  id: string;
  icon: any;
  subtitle: string;
  title: string;
  description: string;
  sideText: string;
  features: string[];
  category: "Operations" | "Reliability" | "Performance" | "Security" | "Delivery" | "Strategy";
};

// ============================================
// SERVICES PAGE
// ============================================

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const containerRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 80]);

  // Accordion
  const [openId, setOpenId] = useState<string | null>(null);
  const openToggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // =====================
  // Data
  // =====================
  const featuredServices = useMemo(
    () => [
      {
        icon: Database,
        title: t("servicesPage.featured.dba.title"),
        description: t("servicesPage.featured.dba.description"),
        link: `/${currentLang}/services#remote-admin`,
      },
      {
        icon: UserCheck,
        title: t("servicesPage.featured.expert.title"),
        description: t("servicesPage.featured.expert.description"),
        link: `/${currentLang}/services#dba-support`,
      },
      {
        icon: Handshake,
        title: t("servicesPage.featured.consulting.title"),
        description: t("servicesPage.featured.consulting.description"),
        link: `/${currentLang}/services#strategic-planning`,
      },
      {
        icon: Headset,
        title: t("servicesPage.featured.support.title"),
        description: t("servicesPage.featured.support.description"),
        link: `/${currentLang}/services#dba-support`,
      },
    ],
    [currentLang, t]
  );

  const detailedServices: Service[] = useMemo(
    () => [
      {
        id: "remote-admin",
        icon: Monitor,
        subtitle: t("servicesPage.details.remote.subtitle"),
        title: t("servicesPage.details.remote.title"),
        description: t("servicesPage.details.remote.description"),
        sideText: t("servicesPage.details.remote.sideText"),
        features: [
          t("servicesPage.details.remote.features.monitoring"),
          t("servicesPage.details.remote.features.maintenance"),
          t("servicesPage.details.remote.features.optimization"),
          t("servicesPage.details.remote.features.resolution"),
          t("servicesPage.details.remote.features.scalability"),
          t("servicesPage.details.remote.features.security"),
          t("servicesPage.details.remote.features.collaboration"),
        ],
        category: "Operations",
      },
      {
        id: "backup-recovery",
        icon: Shield,
        subtitle: t("servicesPage.details.backup.subtitle"),
        title: t("servicesPage.details.backup.title"),
        description: t("servicesPage.details.backup.description"),
        sideText: t("servicesPage.details.backup.sideText"),
        features: [
          t("servicesPage.details.backup.features.strategies"),
          t("servicesPage.details.backup.features.disaster"),
          t("servicesPage.details.backup.features.storage"),
          t("servicesPage.details.backup.features.rapid"),
          t("servicesPage.details.backup.features.testing"),
          t("servicesPage.details.backup.features.cyber"),
          t("servicesPage.details.backup.features.scalable"),
        ],
        category: "Reliability",
      },
      {
        id: "monitoring",
        icon: Clock,
        subtitle: t("servicesPage.details.monitoring.subtitle"),
        title: t("servicesPage.details.monitoring.title"),
        description: t("servicesPage.details.monitoring.description"),
        sideText: t("servicesPage.details.monitoring.sideText"),
        features: [],
        category: "Operations",
      },
      {
        id: "dba-support",
        icon: Headset,
        subtitle: t("servicesPage.details.support.subtitle"),
        title: t("servicesPage.details.support.title"),
        description: t("servicesPage.details.support.description"),
        sideText: t("servicesPage.details.support.sideText"),
        features: [],
        category: "Operations",
      },
      {
        id: "migration",
        icon: ArrowRightLeft,
        subtitle: t("servicesPage.details.migration.subtitle"),
        title: t("servicesPage.details.migration.title"),
        description: t("servicesPage.details.migration.description"),
        sideText: t("servicesPage.details.migration.sideText"),
        features: [],
        category: "Delivery",
      },
      {
        id: "replication",
        icon: RefreshCw,
        subtitle: t("servicesPage.details.replication.subtitle"),
        title: t("servicesPage.details.replication.title"),
        description: t("servicesPage.details.replication.description"),
        sideText: t("servicesPage.details.replication.sideText"),
        features: [],
        category: "Reliability",
      },
      {
        id: "upgrades",
        icon: HardDrive,
        subtitle: t("servicesPage.details.upgrades.subtitle"),
        title: t("servicesPage.details.upgrades.title"),
        description: t("servicesPage.details.upgrades.description"),
        sideText: t("servicesPage.details.upgrades.sideText"),
        features: [],
        category: "Delivery",
      },
      {
        id: "patch-management",
        icon: Wrench,
        subtitle: t("servicesPage.details.patch.subtitle"),
        title: t("servicesPage.details.patch.title"),
        description: t("servicesPage.details.patch.description"),
        sideText: t("servicesPage.details.patch.sideText"),
        features: [],
        category: "Security",
      },
      {
        id: "performance",
        icon: BarChart3,
        subtitle: t("servicesPage.details.performance.subtitle"),
        title: t("servicesPage.details.performance.title"),
        description: t("servicesPage.details.performance.description"),
        sideText: t("servicesPage.details.performance.sideText"),
        features: [],
        category: "Performance",
      },
      {
        id: "security",
        icon: ShieldCheck,
        subtitle: t("servicesPage.details.security.subtitle"),
        title: t("servicesPage.details.security.title"),
        description: t("servicesPage.details.security.description"),
        sideText: t("servicesPage.details.security.sideText"),
        features: [],
        category: "Security",
      },
      {
        id: "resource-management",
        icon: TrendingUp,
        subtitle: t("servicesPage.details.resource.subtitle"),
        title: t("servicesPage.details.resource.title"),
        description: t("servicesPage.details.resource.description"),
        sideText: t("servicesPage.details.resource.sideText"),
        features: [],
        category: "Performance",
      },
      {
        id: "strategic-planning",
        icon: Target,
        subtitle: t("servicesPage.details.strategic.subtitle"),
        title: t("servicesPage.details.strategic.title"),
        description: t("servicesPage.details.strategic.description"),
        sideText: t("servicesPage.details.strategic.sideText"),
        features: [],
        category: "Strategy",
      },
    ],
    [t]
  );

  const overviewServices = useMemo(
    () => [
      {
        icon: Monitor,
        title: t("services.remote.title"),
        description: t("services.remote.description"),
        features: [
          t("servicesPage.overview.remote.f1"),
          t("servicesPage.overview.remote.f2"),
          t("servicesPage.overview.remote.f3"),
          t("servicesPage.overview.remote.f4"),
        ],
      },
      {
        icon: Shield,
        title: t("services.backup.title"),
        description: t("services.backup.description"),
        features: [
          t("servicesPage.overview.backup.f1"),
          t("servicesPage.overview.backup.f2"),
          t("servicesPage.overview.backup.f3"),
          t("servicesPage.overview.backup.f4"),
        ],
      },
      {
        icon: Zap,
        title: t("services.performance.title"),
        description: t("services.performance.description"),
        features: [
          t("servicesPage.overview.performance.f1"),
          t("servicesPage.overview.performance.f2"),
          t("servicesPage.overview.performance.f3"),
          t("servicesPage.overview.performance.f4"),
        ],
      },
      {
        icon: Lock,
        title: t("services.security.title"),
        description: t("services.security.description"),
        features: [
          t("servicesPage.overview.security.f1"),
          t("servicesPage.overview.security.f2"),
          t("servicesPage.overview.security.f3"),
          t("servicesPage.overview.security.f4"),
        ],
      },
      {
        icon: ArrowRightLeft,
        title: t("services.migration.title"),
        description: t("services.migration.description"),
        features: [
          t("servicesPage.overview.migration.f1"),
          t("servicesPage.overview.migration.f2"),
          t("servicesPage.overview.migration.f3"),
          t("servicesPage.overview.migration.f4"),
        ],
      },
      {
        icon: Users,
        title: t("services.consulting.title"),
        description: t("services.consulting.description"),
        features: [
          t("servicesPage.overview.consulting.f1"),
          t("servicesPage.overview.consulting.f2"),
          t("servicesPage.overview.consulting.f3"),
          t("servicesPage.overview.consulting.f4"),
        ],
      },
    ],
    [t]
  );

  const categories = useMemo(() => {
    const order: Service["category"][] = [
      "Operations",
      "Reliability",
      "Performance",
      "Security",
      "Delivery",
      "Strategy",
    ];

    const labelMap: Record<Service["category"], string> = {
      Operations: t("servicesPage.categories.operations", { defaultValue: "Operations" }),
      Reliability: t("servicesPage.categories.reliability", { defaultValue: "Reliability" }),
      Performance: t("servicesPage.categories.performance", { defaultValue: "Performance" }),
      Security: t("servicesPage.categories.security", { defaultValue: "Security" }),
      Delivery: t("servicesPage.categories.delivery", { defaultValue: "Delivery" }),
      Strategy: t("servicesPage.categories.strategy", { defaultValue: "Strategy" }),
    };

    return order
      .map((cat) => ({
        key: cat,
        label: labelMap[cat],
        items: detailedServices.filter((s) => s.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, [detailedServices, t]);

  return (
    <div ref={containerRef} className="bg-[#0a0a0f] min-h-[100dvh] pt-16 lg:pt-20">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[calc(100dvh-4rem)] lg:min-h-[calc(100dvh-5rem)] flex items-center justify-center overflow-x-hidden">
        {/* Morphing Blobs */}
        <MorphingBlob 
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] -top-32 -right-32 md:-top-48 md:-right-48 blur-[80px] lg:blur-[100px]" 
          color="#00d4ff" 
          delay={0}
        />
        <MorphingBlob 
          className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] -bottom-24 -left-24 md:-bottom-32 md:-left-32 blur-[80px] lg:blur-[100px]" 
          color="#ffb800" 
          delay={0.3}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #fff 1px, transparent 1px),
              linear-gradient(180deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Infinite Scroll Background Text */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full">
          <InfiniteScrollText text="SERVICES • DATABASE • CONSULTING •" />
        </div>

        {/* Decorative Corners */}
        <motion.div 
          className="absolute top-6 left-6 lg:top-8 lg:left-8 w-16 h-16 lg:w-20 lg:h-20 pointer-events-none hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-NEXO-cyan to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-NEXO-cyan to-transparent" />
        </motion.div>
        <motion.div 
          className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-16 h-16 lg:w-20 lg:h-20 pointer-events-none hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-NEXO-cyan to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-NEXO-cyan to-transparent" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 container-custom px-4 py-6 lg:py-8"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                </span>
                <span className="text-xs sm:text-sm text-white/60 font-medium tracking-wider uppercase">
                  {t("servicesPage.hero.tagline")}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm text-white/40 font-mono hidden sm:block"
              >
              </motion.div>
            </div>

            {/* Title */}
            <div className="relative mb-8 md:mb-12">
              <motion.div 
                className="w-20 md:w-28 lg:w-32 mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatedLine delay={0.4} />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
                <AnimatedTitle 
                  text={t("servicesPage.hero.headline")} 
                  className="block text-NEXO-cyan mb-2"
                  delay={0.5}
                />
              </h1>
            </div>

            {/* Subtitle & Stats */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <p className="text-sm md:text-base lg:text-lg text-white/50 leading-relaxed max-w-lg mb-6">
                  {t("servicesPage.hero.subtitle")}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Link
                    to={`/${currentLang}/contact`}
                    className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 bg-NEXO-cyan text-[#0a0a0f] font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
                  >
                    <span>{t("cta.button")}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="#overview"
                    className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:border-NEXO-cyan hover:text-NEXO-cyan"
                  >
                    <span>{t("servicesPage.hero.exploreBtn")}</span>
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex flex-wrap gap-4 lg:gap-6 lg:justify-end"
              >
                {[
                  { value: 24, suffix: '/7', label: t("servicesPage.hero.stat1") },
                  { value: 99, suffix: '%', label: t("servicesPage.hero.stat2") },
                  { value: 500, suffix: '+', label: t("servicesPage.hero.stat3") },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 lg:h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />

        {/* Side Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-[10px] text-white/30 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
              {t("nav.services")}
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ==================== FEATURED SERVICES ==================== */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-x-hidden">
        <MorphingBlob 
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-0 left-0 blur-[80px] lg:blur-[100px]" 
          color="#00d4ff" 
          delay={0}
        />

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="w-16 mx-auto mb-4 md:mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-NEXO-cyan mb-3 md:mb-4">
                {t("servicesPage.featured.label")}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t("servicesPage.featured.title")}
              </h2>
            </motion.div>

            {/* Featured Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <HoverCard className="h-full">
                    <a
                      href={service.link}
                      className="group block h-full p-5 md:p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center group-hover:bg-NEXO-cyan/20 transition-colors">
                          <service.icon className="w-5 h-5 md:w-6 md:h-6 text-NEXO-cyan" />
                        </div>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-NEXO-cyan group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-NEXO-cyan transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                        {service.description}
                      </p>
                    </a>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OVERVIEW GRID ==================== */}
      <section id="overview" className="relative py-16 md:py-24 lg:py-32 overflow-x-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
          <InfiniteScrollText text="MONITORING • BACKUP • SECURITY •" speed={45} />
        </div>

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-16"
            >
              <div className="w-16 mx-auto mb-4 md:mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                {t("services.title")}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-white/50 max-w-2xl mx-auto">
                {t("services.subtitle")}
              </p>
            </motion.div>

            {/* Overview Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {overviewServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <HoverCard className="group h-full p-5 md:p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center group-hover:bg-NEXO-cyan/20 transition-colors">
                        <service.icon className="w-5 h-5 md:w-6 md:h-6 text-NEXO-cyan" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-white">{service.title}</h3>
                        <p className="text-xs md:text-sm text-white/40">{service.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 md:space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-white/50">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-NEXO-cyan flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DETAILS ACCORDION ==================== */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-x-hidden">
        <MorphingBlob 
          className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] -bottom-32 -right-32 md:-bottom-48 md:-right-48 blur-[80px] lg:blur-[100px]" 
          color="#ffb800" 
          delay={0}
        />

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-12"
            >
              <div className="w-16 mb-4 md:mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                {t("servicesPage.details.title")}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-white/50 max-w-2xl">
                {t("servicesPage.details.subtitle")}
              </p>
            </motion.div>

            {/* Accordion by Category */}
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-4"
              >
                <div className="sticky top-20 lg:top-24 p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">
                    {t("servicesPage.details.navTitle")}
                  </p>
                  <div className="space-y-1 md:space-y-2">
                    {categories.map((cat) => (
                      <a
                        key={cat.key}
                        href={`#cat-${cat.key}`}
                        className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-xl text-xs md:text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span>{cat.label}</span>
                        <span className="text-[10px] md:text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                          {cat.items.length}
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs md:text-sm font-semibold text-white mb-2">
                      {t("servicesPage.details.tipTitle")}
                    </p>
                    <p className="text-xs md:text-sm text-white/40">
                      {t("servicesPage.details.tipText")}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Accordion Items */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-8 space-y-8 md:space-y-10"
              >
                {categories.map((cat) => (
                  <div key={cat.key} id={`cat-${cat.key}`} className="scroll-mt-24 lg:scroll-mt-28">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      <div className="h-1 w-8 md:w-10 rounded-full bg-NEXO-cyan" />
                      <h3 className="text-lg md:text-xl font-bold text-white">{cat.label}</h3>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      {cat.items.map((service) => {
                        const isOpen = openId === service.id;
                        const Icon = service.icon;

                        return (
                          <div
                            key={service.id}
                            id={service.id}
                            className="scroll-mt-24 lg:scroll-mt-28 rounded-2xl bg-white/[0.03] border border-white/5 overflow-hidden"
                          >
                            <button
                              onClick={() => openToggle(service.id)}
                              className="flex w-full items-start justify-between gap-3 md:gap-4 p-4 md:p-6 text-left hover:bg-white/[0.02] transition-colors"
                            >
                              <div className="flex items-start gap-3 md:gap-4">
                                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-NEXO-cyan" />
                                </div>
                                <div>
                                  <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-NEXO-cyan mb-1">
                                    {service.subtitle}
                                  </p>
                                  <h4 className="text-base md:text-lg font-bold text-white">
                                    {service.title}
                                  </h4>
                                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-white/50">
                                    {service.description}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="hidden sm:inline text-[10px] md:text-xs font-medium text-white/40">
                                  {isOpen ? t("servicesPage.hideDetails") : t("servicesPage.showDetails")}
                                </span>
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-white/40" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white/40" />
                                )}
                              </div>
                            </button>

                            <motion.div
                              initial={false}
                              animate={{
                                height: isOpen ? "auto" : 0,
                                opacity: isOpen ? 1 : 0,
                              }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="grid gap-4 md:gap-6 border-t border-white/5 p-4 md:p-6 md:grid-cols-2">
                                <div className="p-4 md:p-5 rounded-xl bg-white/[0.02] border border-white/5">
                                  <p className="text-xs md:text-sm font-semibold text-white mb-2">
                                    {t("servicesPage.details.sideTitle")}
                                  </p>
                                  <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                                    {service.sideText}
                                  </p>
                                </div>

                                {service.features?.length ? (
                                  <div className="p-4 md:p-5 rounded-xl bg-white/[0.02] border border-white/5">
                                    <p className="text-xs md:text-sm font-semibold text-white mb-2 md:mb-3">
                                      {t("servicesPage.details.featuresTitle")}
                                    </p>
                                    <ul className="space-y-1.5 md:space-y-2">
                                      {service.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-white/50">
                                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-NEXO-cyan flex-shrink-0 mt-0.5" />
                                          <span>{f}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : (
                                  <div className="p-4 md:p-5 rounded-xl bg-white/[0.02] border border-white/5">
                                    <p className="text-xs md:text-sm font-semibold text-white mb-2">
                                      {t("servicesPage.details.noteTitle")}
                                    </p>
                                    <p className="text-xs md:text-sm text-white/50">
                                      {t("servicesPage.details.noteText")}
                                    </p>
                                  </div>
                                )}

                                <div className="md:col-span-2">
                                  <Link
                                    to={`/${currentLang}/contact`}
                                    className="group inline-flex items-center gap-3 px-5 md:px-7 py-3 md:py-4 bg-white text-[#0a0a0f] font-semibold rounded-full hover:bg-NEXO-cyan transition-colors"
                                  >
                                    <span className="text-sm md:text-base">{t("servicesPage.details.cta")}</span>
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CUSTOM DB DEV ==================== */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-x-hidden">
        <MorphingBlob 
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] top-0 right-0 blur-[80px] lg:blur-[100px]" 
          color="#00d4ff" 
          delay={0}
        />

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-NEXO-cyan" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-NEXO-cyan">
                    {t("servicesPage.custom.subtitle")}
                  </p>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {t("servicesPage.custom.title")}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-white/50 leading-relaxed mb-6 md:mb-8">
                  {t("servicesPage.custom.description")}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
                  <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/70">
                    <Database className="w-3.5 h-3.5 md:w-4 md:h-4 text-NEXO-cyan" />
                    {t("servicesPage.custom.pill1")}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/70">
                    <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-NEXO-gold" />
                    {t("servicesPage.custom.pill2")}
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/70">
                    <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-NEXO-cyan" />
                    {t("servicesPage.custom.pill3")}
                  </span>
                </div>

                <Link
                  to={`/${currentLang}/contact`}
                  className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-NEXO-cyan text-[#0a0a0f] font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
                >
                  <span className="text-sm md:text-base">{t("servicesPage.custom.cta")}</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Right - Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] p-1.5 md:p-2">
                  <img
                    src="/demo/visual.svg"
                    alt={t("servicesPage.custom.title")}
                    className="w-full rounded-xl object-cover max-h-[320px] md:max-h-[380px] lg:max-h-[420px]"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-x-hidden">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 md:mb-8 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
                <Server className="w-6 h-6 md:w-8 md:h-8 text-NEXO-cyan" />
              </div>

              <div className="w-16 mx-auto mb-4 md:mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-white/50 mb-8 md:mb-10 max-w-xl mx-auto">
                {t("cta.subtitle")}
              </p>
              
              <Link
                to={`/${currentLang}/contact`}
                className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-NEXO-cyan text-[#0a0a0f] font-bold text-base md:text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
              >
                <span>{t("cta.button")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-NEXO-navy to-transparent pointer-events-none" />
      </section>
    </div>
  );
};

export default Services;
