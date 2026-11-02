import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoBackground } from "@/components/VideoBackground";
const databaseVideo = "/demo/visual.svg";
import { useEffect, useState, useRef, useMemo } from "react";
import type { ReactNode } from "react";

// =====================
// Morphing Blob Shape
// =====================
const MorphingBlob = ({
  className,
  color,
  delay = 0,
}: {
  className?: string;
  color: string;
  delay?: number;
}) => {
  // evita IDs inválidos no SVG (ex: "#00d4ff")
  const safeId = useMemo(() => color.replace(/[^a-zA-Z0-9_-]/g, ""), [color]);

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient
            id={`gradient-${safeId}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          fill={`url(#gradient-${safeId})`}
          animate={{
            d: [
              "M 100 0 C 150 0 200 50 200 100 C 200 150 150 200 100 200 C 50 200 0 150 0 100 C 0 50 50 0 100 0",
              "M 100 10 C 140 0 200 60 190 100 C 180 140 140 200 100 190 C 60 180 0 140 10 100 C 20 60 60 20 100 10",
              "M 100 5 C 155 15 195 55 195 100 C 195 145 155 185 100 195 C 45 185 5 145 5 100 C 5 55 45 15 100 5",
              "M 100 0 C 150 0 200 50 200 100 C 200 150 150 200 100 200 C 50 200 0 150 0 100 C 0 50 50 0 100 0",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

// =====================
// Animated Text Reveal - Letter by Letter
// =====================
const AnimatedTitle = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block mr-[0.25em] whitespace-nowrap"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -75 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.55,
                delay: delay + wordIndex * 0.09 + charIndex * 0.028,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

// =====================
// Magnetic Button Effect (desliga no touch / reduced motion)
// =====================
const MagneticButton = ({
  children,
  className,
  to,
}: {
  children: ReactNode;
  className?: string;
  to: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { damping: 16, stiffness: 170 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const enabled = !shouldReduceMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={enabled ? { x: xSpring, y: ySpring } : undefined}>
      <Link
        ref={ref}
        to={to}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    </motion.div>
  );
};

// =====================
// Counting Animation
// =====================
const CountUp = ({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) => {
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
      { threshold: 0.4 }
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

// =====================
// Horizontal Infinite Scroll Text
// =====================
const InfiniteScrollText = ({
  text,
  speed = 30,
}: {
  text: string;
  speed?: number;
}) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="
              inline-block mx-6 select-none
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
              font-bold text-white/[0.02]
            "
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// =====================
// 3D Card Tilt Effect (desliga em touch / reduced motion)
// =====================
const TiltCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const enabled = !shouldReduceMotion && !isTouch;

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        enabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={enabled ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {children}
    </motion.div>
  );
};

// =====================
// Animated Line
// =====================
const AnimatedLine = ({
  delay = 0,
  vertical = false,
}: {
  delay?: number;
  vertical?: boolean;
}) => {
  return (
    <motion.div
      className={vertical ? "w-px h-full" : "h-px w-full"}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0, originY: 0 }}
      aria-hidden="true"
    >
      <div
        className={`${
          vertical ? "w-full h-full" : "w-full h-full"
        } bg-gradient-to-r from-NEXO-cyan/50 via-NEXO-cyan to-NEXO-cyan/50`}
      />
    </motion.div>
  );
};

// =====================
// Main Hero Section
// =====================
const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 90]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const title = t("hero.title") || "Database Administration";
  const titleWords = useMemo(() => title.split(" "), [title]);
  const lastWord = titleWords[titleWords.length - 1] ?? "";
  const firstWords = titleWords.slice(0, -1).join(" ");

  return (
    <section
      ref={containerRef}
      className="
        relative min-h-[100dvh]
        pt-16 lg:pt-20
        flex flex-col justify-center
        overflow-hidden
        bg-[#0a0a0f]
      "
    >
      {/* Video Background */}
      <VideoBackground
        videoSrc={databaseVideo}
        opacity={0.4}
        overlay={true}
        overlayColor="from-[#0a0a0f]/90 via-[#0a0a0f]/70 to-[#0a0a0f]/90"
        overlayOpacity={0.6}
        playbackRate={0.6}
      />

      {/* Morphing Blobs */}
      <MorphingBlob
        className="
          w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] lg:w-[600px] lg:h-[600px]
          -top-32 -left-32 sm:-top-40 sm:-left-40
          blur-3xl
        "
        color="#00d4ff"
        delay={0}
      />
      <MorphingBlob
        className="
          w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px]
          -bottom-24 -right-24 sm:-bottom-20 sm:-right-20
          blur-3xl
        "
        color="#ffb800"
        delay={0.5}
      />
      <MorphingBlob
        className="
          w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px]
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          blur-3xl
        "
        color="#8b5cf6"
        delay={1}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #fff 1px, transparent 1px),
            linear-gradient(180deg, #fff 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        aria-hidden="true"
      />

      {/* Infinite Scroll Background Text */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
        <InfiniteScrollText text="DATABASE • ADMINISTRATION • CONSULTING •" />
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-28 lg:top-32 left-6 w-20 h-20 pointer-events-none hidden sm:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-NEXO-cyan to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-NEXO-cyan to-transparent" />
        </motion.div>
      </div>
      <div className="absolute bottom-6 right-6 w-20 h-20 pointer-events-none hidden sm:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-NEXO-cyan to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-NEXO-cyan to-transparent" />
        </motion.div>
      </div>

      {/* Main Content (REMOVIDO mt-16 lg:mt-20 => isso causava overflow/scroll) */}
      <motion.div
        className="relative z-10 container-custom px-4 py-6 lg:py-8"
        style={{ opacity, scale, y }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-4 sm:gap-0
              mb-6 sm:mb-8 lg:mb-10
              text-center sm:text-left
            "
          >
            {/* Left - Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center sm:justify-start gap-3"
            >
              <div className="relative">
                <motion.div
                  className="w-3 h-3 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xs sm:text-sm text-white/60 font-medium tracking-wider uppercase">
                {t("hero.badge") || "Enterprise Solutions"}
              </span>
            </motion.div>

            {/* Right - (mantém mas sem ocupar layout) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm text-white/40 font-mono hidden sm:block"
            />
          </div>

          {/* Main Title Section */}
          <div className="relative mb-6 sm:mb-8 lg:mb-10">
            <div className="w-24 sm:w-32 mb-4 sm:mb-5">
              <AnimatedLine delay={0.5} />
            </div>

            <h1
              className="
                font-bold tracking-tighter
                leading-[0.92]
                text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl
              "
            >
              <div className="overflow-hidden">
                <AnimatedTitle
                  text={firstWords}
                  className="block text-white"
                  delay={0.6}
                />
              </div>

              <div className="overflow-hidden mt-2">
                <motion.span
                  initial={{ opacity: 0, y: 90 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="block"
                >
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-NEXO-cyan via-cyan-300 to-NEXO-gold bg-clip-text text-transparent">
                      {lastWord}
                    </span>
                    <motion.span
                      className="absolute -inset-x-3 sm:-inset-x-4 -inset-y-2 bg-NEXO-cyan/10 rounded-lg -z-0"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                      style={{ originX: 0 }}
                      aria-hidden="true"
                    />
                  </span>
                </motion.span>
              </div>
            </h1>
          </div>

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start md:items-end">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-center md:text-left"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/50 leading-relaxed mb-5 sm:mb-6 max-w-xl mx-auto md:mx-0">
                {t("hero.subtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center md:justify-start">
                <MagneticButton
                  to={`/${currentLang}/contact`}
                  className="
                    group relative inline-flex items-center justify-center gap-3
                    w-full sm:w-auto
                    px-6 sm:px-7 py-3 sm:py-3.5
                    bg-white text-[#0a0a0f] font-semibold rounded-full
                    overflow-hidden transition-all duration-300
                  "
                >
                  <span className="relative z-10">{t("hero.cta")}</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-NEXO-cyan"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />
                </MagneticButton>

                <MagneticButton
                  to={`/${currentLang}/services`}
                  className="
                    group relative inline-flex items-center justify-center gap-3
                    w-full sm:w-auto
                    px-6 sm:px-7 py-3 sm:py-3.5
                    text-white font-semibold rounded-full
                    border border-white/20 hover:border-white/40
                    transition-all duration-300
                  "
                >
                  <span>{t("welcome.learnMore")}</span>
                </MagneticButton>
              </div>
            </motion.div>

            {/* Right Column - Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="w-full max-w-xl md:max-w-none mx-auto md:mx-0"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: 30, suffix: "+", label: t("stats.years") },
                  { value: 300, suffix: "+", label: t("stats.professionals") },
                  { value: 500, suffix: "+", label: t("stats.projects") },
                ].map((stat, index) => (
                  <TiltCard
                    key={index}
                    className="relative p-3 sm:p-4 md:p-5 rounded-2xl"
                  >
                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs sm:text-sm text-white/40 leading-snug">
                        {stat.label}
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 rounded-2xl border border-white/5"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-NEXO-cyan/5 to-transparent opacity-100"
                      aria-hidden="true"
                    />
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={scrollToContent}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 group cursor-pointer"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            className="text-[10px] sm:text-xs text-white/30 tracking-[0.3em] uppercase"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t("hero.scroll") || "Scroll"}
          </motion.span>
          <motion.div
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5 sm:p-2"
            whileHover={{ borderColor: "rgba(0, 212, 255, 0.5)" }}
          >
            <motion.div
              className="w-1 h-1.5 sm:h-2 rounded-full bg-white/50"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Side Text (only xl) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-xs text-white/30 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
            Nexo Data
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
