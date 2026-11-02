import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Star, Linkedin, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { languages } from "./LanguageSelector";

const Footer = () => {
  const { t } = useTranslation();
  const { currentLang, getLocalizedPath, changeLanguage } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* ===============================
     Google Maps (coordenadas exatas)
     =============================== */

  // Brazil – Serra/ES
  const BRAZIL_LAT = 0;
  const BRAZIL_LNG = 0;

  // Portugal – Montijo
  const PORTUGAL_LAT = 0;
  const PORTUGAL_LNG = 0;

  const brazilMapsUrl = `#demo-contact`;
  const portugalMapsUrl = `#demo-contact`;

  const quickLinks = [
    { path: "", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/cases", label: t("nav.cases") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const services = [
    t("services.remote.title"),
    t("services.backup.title"),
    t("services.performance.title"),
    t("services.security.title"),
    t("services.migration.title"),
  ];

  return (
    <footer className="bg-NEXO-navy text-white relative">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Company Info */}
          <div>
            <div className="bg-white rounded-lg p-3 inline-block mb-6">
              <img
                src="/demo/visual.svg"
                alt="Nexo Data"
                className="h-12 w-auto"
              />
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>

            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex text-NEXO-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-white/80">
                {t("footer.starsRating")}
              </span>
            </div>

            {/* Language Selector */}
            <div className="mt-6">
              <span className="text-white/60 text-sm mb-3 block">
                {t("footer.language") || "Language"}
              </span>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`p-2 rounded-lg transition-all ${
                      currentLang === lang.code
                        ? "bg-NEXO-cyan/20 ring-2 ring-NEXO-cyan"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                    title={lang.name}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      className="w-6 h-auto rounded-sm"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-NEXO-cyan">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-white/70 hover:text-NEXO-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-NEXO-cyan">
              {t("footer.ourServices")}
            </h4>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    to={getLocalizedPath("/services")}
                    className="text-white/70 hover:text-NEXO-cyan transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-NEXO-cyan">
              {t("footer.contactUs")}
            </h4>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="#demo-contact"
                className="flex items-start gap-3 text-white/70 hover:text-NEXO-cyan transition-colors"
              >
                <Mail className="w-5 h-5 mt-0.5" />
                <span className="text-sm">contacto@example.invalid</span>
              </a>

              {/* Brazil */}
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 mt-0.5 text-NEXO-cyan" />
                <div className="text-sm">
                  <p className="font-medium text-white mb-1 flex items-center gap-2">
                    <img src="https://flagcdn.com/w20/br.png" alt="BR" />
                    {t("contact.info.brazil")}
                  </p>

                  {/* Endereço – 2 linhas, 1 link */}
                  <a
                    href={brazilMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-NEXO-cyan transition-colors"
                    aria-label="Abrir endereço do Brasil no Google Maps"
                  >
                    <span className="block">Morada fictícia — Brasil</span>
                    <span className="block">
                      Localização de demonstração
                    </span>
                  </a>

                  {/* Telefone */}
                  <a
                    href="#demo-contact"
                    className="flex items-center gap-1 mt-1 hover:text-NEXO-cyan transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    000 000 000
                  </a>
                </div>
              </div>

              {/* Portugal */}
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 mt-0.5 text-NEXO-cyan" />
                <div className="text-sm">
                  <p className="font-medium text-white mb-1 flex items-center gap-2">
                    <img src="https://flagcdn.com/w20/pt.png" alt="PT" />
                    {t("contact.info.portugal")}
                  </p>

                  {/* Endereço – 2 linhas, 1 link */}
                  <a
                    href={portugalMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-NEXO-cyan transition-colors"
                    aria-label="Abrir endereço de Portugal no Google Maps"
                  >
                    <span className="block">
                      Morada fictícia — Portugal
                    </span>
                    <span className="block">
                      Montijo, CP: 2870-091
                    </span>
                  </a>

                  {/* Telefone */}
                  <a
                    href="#demo-contact"
                    className="flex items-center gap-1 mt-1 hover:text-NEXO-cyan transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    000 000 000
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="#demo-contact"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-NEXO-cyan transition-all"
              >
                <Linkedin className="w-5 h-5 text-white/70 group-hover:text-NEXO-navy" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            {t("footer.copyright")}
          </p>
          <Link
            to={getLocalizedPath("/privacy-policy")}
            className="text-white/60 hover:text-NEXO-cyan transition-colors text-sm"
          >
            {t("footer.privacy")}
          </Link>
        </div>
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-NEXO-cyan text-NEXO-navy flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
