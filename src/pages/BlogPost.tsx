import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Tag,
  Share2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Shield,
  Zap,
  Code2,
  BookOpen,
  Target,
  Award,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
} from "lucide-react";

// Blog data (same source of truth as Blog.tsx)
const blogPosts = [
  {
    id: 1,
    slug: "database-optimization-best-practices",
    titleKey: "blog.posts.optimization.title",
    excerptKey: "blog.posts.optimization.excerpt",
    contentKey: "blog.posts.optimization.content",
    category: "Performance",
    readTime: "8 min",
    image: "#demo-contact",
  },
  {
    id: 2,
    slug: "cloud-migration-strategies",
    titleKey: "blog.posts.migration.title",
    excerptKey: "blog.posts.migration.excerpt",
    contentKey: "blog.posts.migration.content",
    category: "Migration",
    readTime: "12 min",
    image: "#demo-contact",
  },
  {
    id: 3,
    slug: "database-security-trends",
    titleKey: "blog.posts.security.title",
    excerptKey: "blog.posts.security.excerpt",
    contentKey: "blog.posts.security.content",
    category: "Security",
    readTime: "10 min",
    image: "#demo-contact",
  },
  {
    id: 4,
    slug: "postgresql-vs-mysql",
    titleKey: "blog.posts.comparison.title",
    excerptKey: "blog.posts.comparison.excerpt",
    contentKey: "blog.posts.comparison.content",
    category: "Comparison",
    readTime: "15 min",
    image: "#demo-contact",
  },
  {
    id: 5,
    slug: "backup-disaster-recovery",
    titleKey: "blog.posts.backup.title",
    excerptKey: "blog.posts.backup.excerpt",
    contentKey: "blog.posts.backup.content",
    category: "Reliability",
    readTime: "9 min",
    image: "#demo-contact",
  },
  {
    id: 6,
    slug: "oracle-performance-tuning",
    titleKey: "blog.posts.oracle.title",
    excerptKey: "blog.posts.oracle.excerpt",
    contentKey: "blog.posts.oracle.content",
    category: "Performance",
    readTime: "11 min",
    image: "#demo-contact",
  },
];

const AnimatedLine = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="h-[2px] bg-NEXO-cyan"
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
  />
);

// Rich content component renderers
const KeyTakeaway = ({ items }: { items: string[] }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-8 rounded-2xl bg-NEXO-cyan/5 border border-NEXO-cyan/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-NEXO-cyan" />
        </div>
        <h3 className="text-xl font-bold text-white">
          {t("blog.keyTakeaways", { defaultValue: "Key Takeaways" })}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-NEXO-cyan flex-shrink-0 mt-0.5" />
            <p className="text-white/70">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const CodeBlock = ({ code, language = "sql" }: { code: string; language?: string }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 rounded-2xl bg-[#1a1a2e] border border-white/10 overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-NEXO-cyan" />
          <span className="text-xs text-white/40 uppercase font-mono">{language}</span>
        </div>
        <button className="text-xs text-NEXO-cyan hover:text-NEXO-cyan/80 transition-colors">
          {t("blog.copyCode", { defaultValue: "Copy" })}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto">
        <code className="text-sm text-white/80 font-mono">{code}</code>
      </pre>
    </motion.div>
  );
};

const StatCard = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
  >
    <div className="w-12 h-12 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-NEXO-cyan" />
    </div>
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className="text-sm text-white/50">{label}</div>
  </motion.div>
);

const Alert = ({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) => {
  const config = {
    info: { icon: Lightbulb, bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    warning: { icon: AlertTriangle, bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400" },
    tip: { icon: Sparkles, bg: "bg-NEXO-cyan/10", border: "border-NEXO-cyan/20", text: "text-NEXO-cyan" },
  };

  const { icon: Icon, bg, border, text } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`my-8 p-6 rounded-2xl ${bg} border ${border}`}
    >
      <div className="flex items-start gap-4">
        <Icon className={`w-6 h-6 ${text} flex-shrink-0 mt-1`} />
        <div className="text-white/70">{children}</div>
      </div>
    </motion.div>
  );
};

const ComparisonTable = ({ data }: { data: { feature: string; option1: string; option2: string }[] }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 overflow-hidden rounded-2xl border border-white/10"
    >
      <table className="w-full">
        <thead>
          <tr className="bg-white/[0.03]">
            <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
              {t("blog.table.feature", { defaultValue: "Feature" })}
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
              {t("blog.table.option1", { defaultValue: "Option 1" })}
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white/70">
              {t("blog.table.option2", { defaultValue: "Option 2" })}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-t border-white/5"
            >
              <td className="px-6 py-4 text-sm text-white/90">{row.feature}</td>
              <td className="px-6 py-4 text-sm text-white/60">{row.option1}</td>
              <td className="px-6 py-4 text-sm text-white/60">{row.option2}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

const BestPracticesList = ({ items }: { items: string[] }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-8 rounded-2xl bg-gradient-to-br from-NEXO-cyan/5 to-transparent border border-NEXO-cyan/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center">
          <Award className="w-5 h-5 text-NEXO-cyan" />
        </div>
        <h3 className="text-xl font-bold text-white">
          {t("blog.bestPractices", { defaultValue: "Best Practices" })}
        </h3>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <Zap className="w-5 h-5 text-NEXO-cyan flex-shrink-0 mt-0.5" />
            <p className="text-white/70">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      setShowOptions(!showOptions);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy");
    }
  };

  const shareOnTwitter = () => {
    window.alert("Demonstração: nenhum contacto é enviado.");
  };

  const shareOnLinkedIn = () => {
    window.alert("Demonstração: nenhum contacto é enviado.");
  };

  const shareOnFacebook = () => {
    window.alert("Demonstração: nenhum contacto é enviado.");
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-3 text-sm text-white/40 hover:text-NEXO-cyan transition-colors"
      >
        <Share2 className="w-4 h-4" />
        {t("blog.shareArticle", { defaultValue: "Share this article" })}
      </button>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full mt-2 p-3 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl z-10 min-w-[200px]"
        >
          <div className="space-y-2">
            <button
              onClick={shareOnTwitter}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span className="text-sm">Twitter</span>
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </button>
            <button
              onClick={shareOnFacebook}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span className="text-sm">Facebook</span>
            </button>
            <div className="border-t border-white/10 my-2" />
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-NEXO-cyan" />
                  <span className="text-sm text-NEXO-cyan">
                    {t("blog.linkCopied", { defaultValue: "Link copied!" })}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">
                    {t("blog.copyLink", { defaultValue: "Copy link" })}
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const currentLang = i18n.language;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to={`/${currentLang}/blog`} replace />;
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  // Get rich content structure
  const contentData = t(post.contentKey, { returnObjects: true, defaultValue: {} }) as any;

  // Generate share URL
  const shareUrl = window.location.href;
  const shareTitle = t(post.titleKey);

  const renderContent = (section: any, index: number) => {
    switch (section.type) {
      case "heading":
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4"
          >
            {section.text}
          </motion.h2>
        );

      case "paragraph":
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-white/60 leading-relaxed mb-6"
          >
            {section.text}
          </motion.p>
        );

      case "keyTakeaways":
        return <KeyTakeaway key={index} items={section.items} />;

      case "code":
        return <CodeBlock key={index} code={section.code} language={section.language} />;

      case "stats":
        return (
          <div key={index} className="grid md:grid-cols-3 gap-6 my-12">
            {section.items.map((stat: any, i: number) => (
              <StatCard key={i} {...stat} icon={TrendingUp} />
            ))}
          </div>
        );

      case "alert":
        return (
          <Alert key={index} type={section.alertType}>
            {section.text}
          </Alert>
        );

      case "bestPractices":
        return <BestPracticesList key={index} items={section.items} />;

      case "table":
        return <ComparisonTable key={index} data={section.data} />;

      case "quote":
        return (
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="my-8 pl-6 border-l-4 border-NEXO-cyan"
          >
            <p className="text-xl text-white/80 italic">{section.text}</p>
            {section.author && (
              <cite className="block mt-4 text-sm text-white/40">— {section.author}</cite>
            )}
          </motion.blockquote>
        );

      case "list":
        return (
          <motion.ul
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="my-6 space-y-3"
          >
            {section.items.map((item: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-white/60"
              >
                <CheckCircle2 className="w-5 h-5 text-NEXO-cyan flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0a0a0f] min-h-screen pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={post.image}
            alt={t(post.titleKey)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
        </div>

        <div className="container-custom px-4 relative z-10 -mt-40 md:-mt-48">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/${currentLang}/blog`}
                className="inline-flex items-center gap-2 text-sm text-NEXO-cyan hover:text-NEXO-cyan/80 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("blog.backToBlog", { defaultValue: "Back to Blog" })}
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-NEXO-cyan/90 text-[#0a0a0f] text-xs font-semibold rounded-full">
                  <Tag className="w-3 h-3" />
                  {t(`blog.categories.${post.category.toLowerCase()}`, { defaultValue: post.category })}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t(post.titleKey)}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24" ref={contentRef}>
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Excerpt as intro */}
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-10 font-light">
                {t(post.excerptKey)}
              </p>

              <div className="w-24 mb-10">
                <AnimatedLine delay={0.3} />
              </div>

              {/* Render rich content sections */}
              {contentData.sections && contentData.sections.map((section: any, index: number) => 
                renderContent(section, index)
              )}
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between"
            >
              <ShareButtons title={shareTitle} url={shareUrl} />
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full border border-white/10">
                  <Tag className="w-3 h-3" />
                  {t(`blog.categories.${post.category.toLowerCase()}`, { defaultValue: post.category })}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation prev/next */}
      <section className="py-12 border-t border-white/5">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                to={`/${currentLang}/blog/${prevPost.slug}`}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors"
              >
                <span className="text-xs text-white/40 flex items-center gap-1 mb-2">
                  <ArrowLeft className="w-3 h-3" />
                  {t("blog.prevArticle", { defaultValue: "Previous" })}
                </span>
                <span className="text-white font-semibold group-hover:text-NEXO-cyan transition-colors line-clamp-2">
                  {t(prevPost.titleKey)}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                to={`/${currentLang}/blog/${nextPost.slug}`}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors text-right"
              >
                <span className="text-xs text-white/40 flex items-center gap-1 justify-end mb-2">
                  {t("blog.nextArticle", { defaultValue: "Next" })}
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-white font-semibold group-hover:text-NEXO-cyan transition-colors line-clamp-2">
                  {t(nextPost.titleKey)}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 mb-6">
                <AnimatedLine delay={0.1} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
                {t("blog.relatedArticles", { defaultValue: "Related Articles" })}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <motion.div
                    key={rp.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/${currentLang}/blog/${rp.slug}`}
                      className="group block p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-NEXO-cyan/20 transition-colors"
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                        <img
                          src={rp.image}
                          alt={t(rp.titleKey)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-NEXO-cyan transition-colors">
                        {t(rp.titleKey)}
                      </h3>
                      <p className="text-sm text-white/50 line-clamp-2">{t(rp.excerptKey)}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
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
                {t("cta.title")}
              </h2>
              <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl mx-auto">
                {t("cta.subtitle")}
              </p>
              <Link
                to={`/${currentLang}/contact`}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-NEXO-cyan text-[#0a0a0f] font-bold text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-NEXO-cyan/25"
              >
                <span>{t("cta.button")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
