import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const currentLang = i18n.language;

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial-cyan opacity-30 pointer-events-none" />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-16 bg-gradient-to-r from-NEXO-cyan to-NEXO-gold mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-NEXO-navy mb-6 leading-tight">
              {t('welcome.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('welcome.description')}
            </p>
            <Link
              to={`/${currentLang}/about`}
              className="inline-flex items-center gap-2 text-NEXO-cyan font-semibold hover:gap-4 transition-all group"
            >
              {t('welcome.learnMore')}
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/demo/visual.svg"
                alt="Data Center Professional"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-border max-w-[200px]"
            >
              <div className="text-4xl font-bold text-NEXO-cyan mb-2">30+</div>
              <div className="text-sm text-muted-foreground">{t('stats.years')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
