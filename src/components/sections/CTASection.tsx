import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const currentLang = i18n.language;

  return (
    <section ref={ref} className="py-20 md:py-32 bg-NEXO-navy relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-cyan-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-NEXO-navy via-NEXO-navy/95 to-NEXO-navy" />
      </div>

      {/* Animated Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="w-[600px] h-[600px] rounded-full border border-NEXO-cyan/20"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="h-1 w-16 bg-gradient-to-r from-NEXO-cyan to-NEXO-gold mx-auto mb-8" />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 mb-10">
            {t('cta.subtitle')}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to={`/${currentLang}/contact`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-NEXO-cyan text-NEXO-navy font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

