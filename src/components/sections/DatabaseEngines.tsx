import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const databaseEngines = [
  { name: 'Oracle', logo: '/demo/visual.svg' },
  { name: 'Microsoft SQL Server', logo: '/demo/visual.svg' },
  { name: 'MySQL', logo: '/demo/visual.svg' },
  { name: 'PostgreSQL', logo: '/demo/visual.svg' },
  { name: 'MongoDB', logo: '/demo/visual.svg' },
  { name: 'Redis', logo: '/demo/visual.svg' },
  { name: 'Amazon Aurora', logo: '/demo/visual.svg' },
  { name: 'DynamoDB', logo: '/demo/visual.svg' },
];

const DatabaseEngines = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-NEXO-gray relative">
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
            {t('engines.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('engines.subtitle')}
          </p>
        </motion.div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {databaseEngines.map((engine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 h-24 flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-NEXO-cyan/20">
                <div className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <img
                    src={engine.logo}
                    alt={engine.name}
                    className="h-10 w-auto max-w-[140px] object-contain"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DatabaseEngines;

