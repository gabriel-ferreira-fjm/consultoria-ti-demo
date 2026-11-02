import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  suffix: string;
  isInView: boolean;
}

const Counter = ({ end, suffix, isInView }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 30, suffix: '+', label: t('stats.years') },
    { value: 300, suffix: '+', label: t('stats.professionals') },
    { value: 500, suffix: '+', label: t('stats.projects') },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-radial-cyan opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="bg-gradient-to-br from-NEXO-navy to-NEXO-navy-light rounded-3xl p-10 md:p-16 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="stat-number mb-4">
                  <Counter end={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <div className="text-white/70 text-lg font-medium">{stat.label}</div>
                
                {/* Decorative line */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

