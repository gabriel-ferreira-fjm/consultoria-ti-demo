import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Clock, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

const PackagesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const coverageOptions = [
    { icon: Clock, label: t('packages.coverage.8x5') },
    { icon: Clock, label: t('packages.coverage.24x7') },
    { icon: CheckCircle, label: t('packages.coverage.custom') },
  ];

  const contractTypes = [
    { icon: Clock, label: t('packages.contract.hourly') },
    { icon: Calendar, label: t('packages.contract.annual') },
    { icon: CheckCircle, label: t('packages.contract.scheduled') },
    { icon: AlertTriangle, label: t('packages.contract.emergency') },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="h-1 w-16 bg-gradient-to-r from-NEXO-cyan to-NEXO-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-NEXO-navy mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Coverage Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-NEXO-navy rounded-2xl p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-6">
                {t('packages.coverage.title')}
              </h3>
              <div className="space-y-4">
                {coverageOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-NEXO-cyan/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-NEXO-cyan/10 flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-NEXO-cyan" />
                    </div>
                    <span className="text-white/90 font-medium">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contract Types */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-NEXO-cyan to-blue-400 rounded-2xl p-8 h-full">
              <h3 className="text-xl font-bold text-NEXO-navy mb-6">
                {t('packages.contract.title')}
              </h3>
              <div className="space-y-4">
                {contractTypes.map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-NEXO-navy/20 flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-NEXO-navy" />
                    </div>
                    <span className="text-NEXO-navy font-medium">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;

