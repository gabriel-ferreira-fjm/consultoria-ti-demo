import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";

// Magnetic effect hook
const useMagnetic = (strength: number = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, xSpring, ySpring, handleMouseMove, handleMouseLeave };
};

// Premium Nav Link with glow effect
const NavLink = ({ 
  to, 
  isActive, 
  children,
}: { 
  to: string; 
  isActive: boolean; 
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-4 py-2.5 group"
    >
      {/* Background glow on hover */}
      <motion.span
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-NEXO-cyan/10 to-cyan-400/10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Active indicator dot */}
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-NEXO-cyan"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}

      <span className={`relative z-10 text-sm font-medium tracking-wide transition-all duration-300 ${
        isActive 
          ? "text-NEXO-cyan" 
          : "text-NEXO-navy/70 group-hover:text-NEXO-navy"
      }`}>
        {children}
      </span>
    </Link>
  );
};

// Premium CTA Button with multiple effects
const CTAButton = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const magnetic = useMagnetic(0.15);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={magnetic.ref}
      style={{ x: magnetic.xSpring, y: magnetic.ySpring }}
      onMouseMove={magnetic.handleMouseMove}
      onMouseLeave={() => {
        magnetic.handleMouseLeave();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-NEXO-cyan/40 to-cyan-400/40 rounded-2xl blur-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <Link
        to={to}
        className="relative group inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-xl"
      >
        {/* Base gradient */}
        <span className="absolute inset-0 bg-gradient-to-r from-NEXO-cyan to-cyan-400" />
        
        {/* Animated gradient overlay */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-NEXO-cyan to-cyan-300"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        {/* Shine effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
          initial={{ x: "-200%" }}
          animate={{ x: isHovered ? "200%" : "-200%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        
        {/* Border glow */}
        <span className="absolute inset-0 rounded-xl border border-white/20" />
        
        {/* Text */}
        <span className="relative z-10 text-sm font-semibold text-NEXO-navy">
          {children}
        </span>
        
        {/* Arrow */}
        <motion.span
          className="relative z-10"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4 text-NEXO-navy" />
        </motion.span>
      </Link>
    </motion.div>
  );
};

// Mobile Menu Item with slide animation
const MobileMenuItem = ({ 
  to, 
  isActive, 
  children, 
  index, 
  onClick 
}: { 
  to: string; 
  isActive: boolean; 
  children: React.ReactNode;
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Link
        to={to}
        onClick={onClick}
        className="group flex items-center justify-between py-5 border-b border-white/10 hover:border-NEXO-cyan/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Active indicator */}
          <motion.div
            className={`w-2 h-2 rounded-full ${isActive ? "bg-NEXO-cyan" : "bg-white/20 group-hover:bg-NEXO-cyan/50"}`}
            animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          />
          <span className={`text-2xl sm:text-3xl font-light tracking-tight transition-colors ${
            isActive ? "text-NEXO-cyan" : "text-white group-hover:text-NEXO-cyan"
          }`}>
            {children}
          </span>
        </div>
        <motion.span
          className="text-white/20 group-hover:text-NEXO-cyan transition-colors"
          whileHover={{ x: 5 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.span>
      </Link>
    </motion.div>
  );
};

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentLang, getLocalizedPath } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: "", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/cases", label: t("nav.cases") },
    { path: "/blog", label: t("nav.blog") },
  ];

  const isActivePath = (path: string) => {
    const currentPath = location.pathname.replace(`/${currentLang}`, "") || "/";
    return (path || "/") === currentPath;
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md"
      >
        {/* Gradient border at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-NEXO-cyan/50 to-transparent" />

        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            {/* Logo */}
            <Link to={getLocalizedPath("")} className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative group"
              >
                {/* Logo glow on hover */}
                <motion.div 
                  className="absolute -inset-3 bg-NEXO-cyan/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                />
                <div className="relative bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/40 shadow-lg shadow-NEXO-cyan/5 group-hover:border-NEXO-cyan/30 transition-all duration-300">
                  <img
                    src="/demo/visual.svg"
                    alt="Nexo Data"
                    className="h-8 md:h-10 w-auto"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center" aria-label="Primary">
              <div className="relative group">
                {/* Glow effect behind nav container */}
                <div className="absolute -inset-2 bg-gradient-to-r from-NEXO-cyan/20 via-cyan-400/20 to-NEXO-cyan/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700" />
                
                {/* Main nav container with glassmorphism */}
                <div className="relative flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl shadow-NEXO-navy/5">
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-NEXO-cyan/5" />
                  
                  {/* Nav items */}
                  <div className="relative flex items-center gap-1">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={getLocalizedPath(item.path)}
                        isActive={isActivePath(item.path)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language selector with premium style */}
              <div className="relative">
                <div className="absolute -inset-2 bg-NEXO-cyan/10 rounded-2xl opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500" />
                <div className="relative bg-white/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/40 shadow-lg shadow-NEXO-cyan/5">
                  <LanguageSelector variant="desktop" />
                </div>
              </div>
              
              <CTAButton to={getLocalizedPath("/contact")}>
                {t("nav.contact")}
              </CTAButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[60] w-12 h-12 flex items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg transition-all hover:shadow-xl hover:border-NEXO-cyan/30"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="relative w-6 h-5">
                {/* Hamburger lines */}
                <motion.span
                  className={`absolute left-0 right-0 h-0.5 rounded-full transition-colors duration-300 ${
                    isMobileMenuOpen ? "bg-white" : "bg-NEXO-navy"
                  }`}
                  animate={{
                    top: isMobileMenuOpen ? "50%" : "0%",
                    rotate: isMobileMenuOpen ? 45 : 0,
                    translateY: isMobileMenuOpen ? "-50%" : "0%",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full transition-colors duration-300 ${
                    isMobileMenuOpen ? "bg-white" : "bg-NEXO-navy"
                  }`}
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scaleX: isMobileMenuOpen ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={`absolute left-0 right-0 h-0.5 rounded-full transition-colors duration-300 ${
                    isMobileMenuOpen ? "bg-white" : "bg-NEXO-navy"
                  }`}
                  animate={{
                    bottom: isMobileMenuOpen ? "50%" : "0%",
                    rotate: isMobileMenuOpen ? -45 : 0,
                    translateY: isMobileMenuOpen ? "50%" : "0%",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-NEXO-navy via-NEXO-navy to-slate-900"
            />

            {/* Decorative orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6 }}
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-NEXO-cyan blur-[100px]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-NEXO-gold blur-[100px]"
              />
            </div>

            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col px-6 pt-28 pb-10 overflow-y-auto">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-8"
              >
                <Sparkles className="w-4 h-4 text-NEXO-cyan" />
                <span className="text-white/40 text-sm tracking-wider uppercase">Menu</span>
              </motion.div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1">
                {navItems.map((item, index) => (
                  <MobileMenuItem
                    key={item.path}
                    to={getLocalizedPath(item.path)}
                    isActive={isActivePath(item.path)}
                    index={index}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </MobileMenuItem>
                ))}
              </nav>

              {/* Footer section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 pt-8"
              >
                {/* Language */}
                <div className="flex items-center justify-between py-4 border-t border-white/10">
                  <span className="text-white/40 text-sm uppercase tracking-wider">
                    {t("footer.language")}
                  </span>
                  <LanguageSelector
                    variant="mobile"
                    onLanguageChange={() => setIsMobileMenuOpen(false)}
                  />
                </div>

                {/* CTA */}
                <Link
                  to={getLocalizedPath("/contact")}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center justify-center gap-3 w-full py-5 rounded-2xl overflow-hidden"
                >
                  {/* Button background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-NEXO-cyan to-cyan-400" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-NEXO-cyan"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  <span className="relative z-10 text-NEXO-navy font-bold text-lg">
                    {t("nav.contact")}
                  </span>
                  <ArrowRight className="relative z-10 w-5 h-5 text-NEXO-navy group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Copyright */}
                <p className="text-center text-white/20 text-xs pt-4">
                  © 2026 Nexo Data. All rights reserved.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
