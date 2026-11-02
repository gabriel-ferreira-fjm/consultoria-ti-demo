import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe, Award, Target, Heart, Lightbulb, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// ============================================
// VIDEO DE FUNDO - video-sobre-nos.mp4
// Coloque o ficheiro video-sobre-nos.mp4 na pasta public/
// ============================================

// ============================================
// SHARED COMPONENTS - Simplified animations
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

// Simple Animated Title - Word by word (no letter animation to avoid tremor)
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
          <span key={i} className="inline-block mx-8 text-[8rem] font-bold text-white/[0.015] select-none">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// Simple Card with hover effect (no 3D tilt to avoid tremor)
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
      className="h-[2px] bg-gradient-to-r from-NEXO-cyan via-NEXO-cyan to-NEXO-cyan/50"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    />
  );
};

// ============================================
// ABOUT PAGE COMPONENT
// ============================================

const About = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 80]);

  const values = [
    { icon: Award, key: 'excellence', color: 'from-NEXO-cyan to-cyan-400' },
    { icon: Heart, key: 'integrity', color: 'from-rose-400 to-pink-500' },
    { icon: Lightbulb, key: 'innovation', color: 'from-amber-400 to-orange-500' },
    { icon: Handshake, key: 'partnership', color: 'from-emerald-400 to-green-500' },
  ];

  const timeline = [
    { year: '1996', key: 'founded' },
    { year: '2010', key: 'expansion' },
    { year: '2020', key: 'projects' },
    { year: '2026', key: 'anniversary' },
  ];

  return (
    <div ref={containerRef} className="bg-[#0a0a0f] min-h-screen">
      {/* ==================== HERO SECTION WITH VIDEO BACKGROUND ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* === VIDEO BACKGROUND === */}
        <div className="absolute inset-0 z-0">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-cyan-100" />

          {/* Dark overlay for readability - multiple layers for depth */}
          <div className="absolute inset-0 bg-[#0a0a0f]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/50 via-transparent to-[#0a0a0f]/50" />

          {/* Watermark cover - bottom-right corner */}
          <div 
            className="absolute bottom-0 right-0 z-10 pointer-events-none"
            style={{
              width: '220px',
              height: '80px',
              background: 'linear-gradient(135deg, transparent 0%, rgba(10,10,15,0.6) 30%, rgba(10,10,15,0.95) 70%, #0a0a0f 100%)',
            }}
          />
          {/* Extra watermark cover blending into bottom gradient */}
          <div 
            className="absolute bottom-0 right-0 z-10 pointer-events-none"
            style={{
              width: '300px',
              height: '120px',
              background: 'radial-gradient(ellipse at bottom right, #0a0a0f 0%, rgba(10,10,15,0.8) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Morphing Blobs - above video overlay */}
        <MorphingBlob 
          className="z-[1] w-[600px] h-[600px] -top-48 -left-48 blur-[100px]" 
          color="#00d4ff" 
          delay={0}
        />
        <MorphingBlob 
          className="z-[1] w-[500px] h-[500px] -bottom-32 -right-32 blur-[100px]" 
          color="#ffb800" 
          delay={0.3}
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #fff 1px, transparent 1px),
              linear-gradient(180deg, #fff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Infinite Scroll Background Text */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full z-[1]">
          <InfiniteScrollText text="ABOUT • NEXO • CONSULTING •" />
        </div>

        {/* Decorative Corners */}
        <motion.div 
          className="absolute top-8 left-8 w-20 h-20 pointer-events-none z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-NEXO-cyan to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-NEXO-cyan to-transparent" />
        </motion.div>
        <motion.div 
          className="absolute bottom-8 right-8 w-20 h-20 pointer-events-none z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-NEXO-cyan to-transparent" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-NEXO-cyan to-transparent" />
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 container-custom px-4"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-12 md:mb-16">
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
                <span className="text-sm text-white/60 font-medium tracking-wider uppercase">
                  {t('nav.about')}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm text-white/40 font-mono"
              >
              </motion.div>
            </div>

            {/* Title */}
            <div className="relative mb-12 md:mb-16">
              <motion.div 
                className="w-24 md:w-32 mb-6 md:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatedLine delay={0.4} />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1] tracking-tight">
                <AnimatedTitle 
                  text={t('about.title').replace('Nexo Data', '').trim()} 
                  className="block text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  delay={0.5}
                />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="block text-NEXO-cyan drop-shadow-[0_2px_15px_rgba(0,212,255,0.3)]"
                >
                  Nexo Data
                </motion.span>
              </h1>
            </div>

            {/* Subtitle & Stats */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {t('about.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex flex-wrap gap-6 lg:gap-8 lg:justify-end"
              >
                {[
                  { value: 30, suffix: '+', label: t('stats.years') },
                  { value: 15, suffix: '+', label: t('about.stats.countries') },
                  { value: 300, suffix: '+', label: t('about.stats.professionals') },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-white/50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Gradient - stronger to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none z-[2]" />

        {/* Side Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block z-[2]"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-[10px] text-white/30 tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
              {t('nav.about')}
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ==================== HISTORY SECTION ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 mb-6">
                  <AnimatedLine delay={0.1} />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {t('about.history.title')}
                </h2>
                <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
                  {t('about.history.description')}
                </p>
                <Link
                  to={`/${currentLang}/contact`}
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-[#0a0a0f] font-semibold rounded-full hover:bg-NEXO-cyan transition-colors duration-300"
                >
                  <span>{t('cta.button')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Right - Visual */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Decorative circles */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-NEXO-cyan/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-8 rounded-full border border-NEXO-gold/15"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-16 rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl md:text-8xl font-bold text-NEXO-cyan">
                        30+
                      </div>
                      <div className="text-white/50 text-base mt-2">
                        {t('stats.years')}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <MorphingBlob 
          className="w-[400px] h-[400px] top-0 right-0 blur-[100px]" 
          color="#00d4ff" 
          delay={0}
        />

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Mission */}
              <HoverCard className="group relative p-8 md:p-10 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-NEXO-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-NEXO-cyan" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('about.mission.title')}</h3>
                  <p className="text-white/50 leading-relaxed">{t('about.mission.description')}</p>
                </div>
              </HoverCard>

              {/* Vision */}
              <HoverCard className="group relative p-8 md:p-10 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 hover:border-NEXO-gold/20 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-NEXO-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-NEXO-gold/10 flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-NEXO-gold" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('about.vision.title')}</h3>
                  <p className="text-white/50 leading-relaxed">{t('about.vision.description')}</p>
                </div>
              </HoverCard>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
          <InfiniteScrollText text="VALUES • EXCELLENCE • INTEGRITY •" speed={45} />
        </div>

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t('about.values.title')}
              </h2>
            </motion.div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <HoverCard className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/5 text-center h-full hover:border-white/10 transition-colors">
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                      {t(`about.values.${value.key}`)}
                    </p>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <MorphingBlob 
          className="w-[500px] h-[500px] -bottom-48 -left-48 blur-[100px]" 
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
              className="text-center mb-16"
            >
              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t('about.journey.title')}
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line - Desktop only */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-NEXO-cyan via-white/10 to-NEXO-gold hidden md:block" />

              <div className="space-y-8 md:space-y-16">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <HoverCard className="inline-block p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors w-full md:w-auto">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {t(`about.timeline.${item.key}.title`)}
                        </h3>
                        <p className="text-white/50 text-sm md:text-base">
                          {t(`about.timeline.${item.key}.description`)}
                        </p>
                      </HoverCard>
                    </div>

                    {/* Year */}
                    <div className="relative flex-shrink-0 order-first md:order-none">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-NEXO-cyan flex items-center justify-center shadow-lg shadow-NEXO-cyan/20">
                        <span className="text-[#0a0a0f] font-bold text-sm md:text-base">{item.year}</span>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl mx-auto">
                {t('cta.subtitle')}
              </p>
              <Link
                to={`/${currentLang}/contact`}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-NEXO-cyan text-[#0a0a0f] font-semibold rounded-full hover:shadow-lg hover:shadow-NEXO-cyan/25 transition-all duration-300"
              >
                <span>{t('cta.button')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-NEXO-navy to-transparent pointer-events-none" />
      </section>
    </div>
  );
};

export default About;
