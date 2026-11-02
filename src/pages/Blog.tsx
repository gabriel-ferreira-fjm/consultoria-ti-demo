import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  BookOpen,
  Sparkles,
  Tag,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useEffect } from "react";

// ============================================
// SHARED COMPONENTS - Matching site-wide style
// ============================================

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
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};

const AnimatedTitle = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = (text || "").split(" ");
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + wordIndex * 0.08, ease: "easeOut" }}
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

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const InfiniteScrollText = ({ text, speed = 35 }: { text: string; speed?: number }) => (
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

const HoverCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="h-[2px] bg-NEXO-cyan"
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
  />
);

// ============================================
// BLOG DATA
// ============================================

const blogPosts = [
  {
    id: 1,
    slug: "database-optimization-best-practices",
    titleKey: "blog.posts.optimization.title",
    excerptKey: "blog.posts.optimization.excerpt",
    category: "Performance",
    readTime: "8 min",
    image: "#demo-contact",
    featured: true,
  },
  {
    id: 2,
    slug: "cloud-migration-strategies",
    titleKey: "blog.posts.migration.title",
    excerptKey: "blog.posts.migration.excerpt",
    category: "Migration",
    readTime: "12 min",
    image: "#demo-contact",
    featured: true,
  },
  {
    id: 3,
    slug: "database-security-trends",
    titleKey: "blog.posts.security.title",
    excerptKey: "blog.posts.security.excerpt",
    category: "Security",
    readTime: "10 min",
    image: "#demo-contact",
    featured: false,
  },
  {
    id: 4,
    slug: "postgresql-vs-mysql",
    titleKey: "blog.posts.comparison.title",
    excerptKey: "blog.posts.comparison.excerpt",
    category: "Comparison",
    readTime: "15 min",
    image: "#demo-contact",
    featured: false,
  },
  {
    id: 5,
    slug: "backup-disaster-recovery",
    titleKey: "blog.posts.backup.title",
    excerptKey: "blog.posts.backup.excerpt",
    category: "Reliability",
    readTime: "9 min",
    image: "#demo-contact",
    featured: false,
  },
  {
    id: 6,
    slug: "oracle-performance-tuning",
    titleKey: "blog.posts.oracle.title",
    excerptKey: "blog.posts.oracle.excerpt",
    category: "Performance",
    readTime: "11 min",
    image: "#demo-contact",
    featured: false,
  },
];

const categories = ["All", "Performance", "Migration", "Security", "Comparison", "Reliability"];

// ============================================
// BLOG PAGE
// ============================================

const Blog = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 80]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const title = t(post.titleKey, { defaultValue: post.titleKey });
      const excerpt = t(post.excerptKey, { defaultValue: post.excerptKey });
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, t]);

  const featuredPosts = useMemo(() => blogPosts.filter((p) => p.featured), []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0f] min-h-screen pt-20 lg:pt-24">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
        <MorphingBlob className="w-[600px] h-[600px] -top-48 -right-48 blur-[100px]" color="#00d4ff" delay={0} />
        <MorphingBlob className="w-[500px] h-[500px] -bottom-32 -left-32 blur-[100px]" color="#ffb800" delay={0.3} />

        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(180deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute top-1/2 -translate-y-1/2 w-full">
          <InfiniteScrollText text="BLOG • INSIGHTS • DATABASE •" />
        </div>

        <motion.div
          className="absolute top-8 left-8 w-20 h-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-NEXO-cyan to-transparent" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-NEXO-cyan to-transparent" />
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-8 w-20 h-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
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
                  {t("blog.badge", { defaultValue: "Insights & Articles" })}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="hidden sm:flex items-center gap-2 text-sm text-white/40"
              >
                <Sparkles className="w-4 h-4 text-NEXO-gold" />
                <span className="font-mono">NEXO / Blog</span>
              </motion.div>
            </div>

            <div className="relative mb-12 md:mb-16">
              <motion.div className="w-24 md:w-32 mb-6 md:mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <AnimatedLine delay={0.4} />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1] tracking-tight">
                <AnimatedTitle text={t("blog.title", { defaultValue: "Blog & Insights" })} className="block text-NEXO-cyan mb-2" delay={0.5} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="text-base md:text-lg lg:text-xl text-white/50 leading-relaxed max-w-2xl mt-6"
              >
                {t("blog.subtitle", { defaultValue: "Expert articles on database administration, performance optimization, and industry best practices." })}
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-end">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.15 }}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#articles"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-NEXO-cyan text-[#0a0a0f] font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
                  >
                    <span>{t("blog.exploreBtn", { defaultValue: "Explore Articles" })}</span>
                    <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </a>
                  <Link
                    to={`/${currentLang}/contact`}
                    className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:border-NEXO-cyan hover:text-NEXO-cyan"
                  >
                    <span>{t("cta.button", { defaultValue: "Contact Us" })}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.25 }}
                className="flex flex-wrap gap-6 lg:gap-8 lg:justify-end"
              >
                {[
                  { value: blogPosts.length, suffix: "+", label: t("blog.stats.articles", { defaultValue: "Articles" }) },
                  { value: 4, suffix: "", label: t("blog.stats.categories", { defaultValue: "Categories" }) },
                  { value: 30, suffix: "+", label: t("blog.stats.years", { defaultValue: "Years Exp." }) },
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-white/40">{stat.label}</div>
                  </div>
                ))}
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
              {t("nav.blog", { defaultValue: "Blog" })}
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ==================== FEATURED POSTS ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <MorphingBlob className="w-[400px] h-[400px] top-0 left-0 blur-[100px]" color="#00d4ff" delay={0} />

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
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
              <p className="text-sm font-semibold uppercase tracking-wider text-NEXO-cyan mb-4">
                {t("blog.featured.label", { defaultValue: "Featured" })}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {t("blog.featured.title", { defaultValue: "Latest Insights" })}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <HoverCard className="h-full">
                    <Link
                      to={`/${currentLang}/blog/${post.slug}`}
                      className="group block h-full rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors overflow-hidden"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={t(post.titleKey, { defaultValue: "" })}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-NEXO-cyan/90 text-[#0a0a0f] text-xs font-semibold rounded-full">
                            <Tag className="w-3 h-3" />
                            {t(`blog.categories.${post.category.toLowerCase()}`, { defaultValue: post.category })}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white group-hover:text-NEXO-cyan transition-colors line-clamp-2">
                            {t(post.titleKey, { defaultValue: post.slug })}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                          {t(post.excerptKey, { defaultValue: "" })}
                        </p>
                        <div className="flex items-center text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ALL ARTICLES ==================== */}
      <section id="articles" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 w-full pointer-events-none">
          <InfiniteScrollText text="PERFORMANCE • SECURITY • MIGRATION •" speed={45} />
        </div>

        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="w-16 mx-auto mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t("blog.all.title", { defaultValue: "All Articles" })}
              </h2>
              <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto">
                {t("blog.all.subtitle", { defaultValue: "Browse our complete collection of database insights and tutorials." })}
              </p>
            </motion.div>

            {/* Search & Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder={t("blog.searchPlaceholder", { defaultValue: "Search articles..." })}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder-white/40 focus:outline-none focus:border-NEXO-cyan/50 transition-colors"
                  />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-3 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === category
                          ? "bg-NEXO-cyan text-[#0a0a0f] shadow-lg shadow-NEXO-cyan/15"
                          : "bg-white/[0.03] text-white/70 border border-white/5 hover:border-white/10 hover:text-white"
                      }`}
                    >
                      {t(`blog.categories.${category.toLowerCase()}`, { defaultValue: category })}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <HoverCard className="h-full">
                    <Link
                      to={`/${currentLang}/blog/${post.slug}`}
                      className="group block h-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors"
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt={t(post.titleKey, { defaultValue: "" })}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            <Tag className="w-3 h-3 text-NEXO-cyan" />
                            {t(`blog.categories.${post.category.toLowerCase()}`, { defaultValue: post.category })}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-NEXO-cyan transition-colors line-clamp-2">
                        {t(post.titleKey, { defaultValue: post.slug })}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                        {t(post.excerptKey, { defaultValue: "" })}
                      </p>

                      <div className="flex items-center text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </Link>
                  </HoverCard>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 text-lg">
                  {t("blog.noResults", { defaultValue: "No articles found matching your criteria." })}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <MorphingBlob className="w-[460px] h-[460px] -top-44 -right-44 blur-[120px]" color="#00d4ff" delay={0} />

        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
                <span>{t("cta.button", { defaultValue: "Contact Us" })}</span>
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

export default Blog;
