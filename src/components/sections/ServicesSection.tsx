import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { 
  Monitor, 
  Shield, 
  Zap, 
  Lock, 
  ArrowRightLeft, 
  Users 
} from 'lucide-react';

const ServicesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Monitor,
      title: t('services.remote.title'),
      description: t('services.remote.description'),
    },
    {
      icon: Shield,
      title: t('services.backup.title'),
      description: t('services.backup.description'),
    },
    {
      icon: Zap,
      title: t('services.performance.title'),
      description: t('services.performance.description'),
    },
    {
      icon: Lock,
      title: t('services.security.title'),
      description: t('services.security.description'),
    },
    {
      icon: ArrowRightLeft,
      title: t('services.migration.title'),
      description: t('services.migration.description'),
    },
    {
      icon: Users,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-NEXO-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="h-1 w-16 bg-gradient-to-r from-NEXO-cyan to-NEXO-gold mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-NEXO-cyan/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-NEXO-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center mb-6 group-hover:bg-NEXO-cyan/20 transition-colors">
                  <service.icon className="w-7 h-7 text-NEXO-cyan" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-NEXO-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="relative text-white/60 leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-NEXO-cyan/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

