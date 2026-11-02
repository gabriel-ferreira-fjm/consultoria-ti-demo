import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Award, Lightbulb, Target } from 'lucide-react';

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const cards = [
    {
      icon: Award,
      title: t('whyUs.certified.title'),
      description: t('whyUs.certified.description'),
      color: 'NEXO-cyan',
    },
    {
      icon: Lightbulb,
      title: t('whyUs.innovation.title'),
      description: t('whyUs.innovation.description'),
      color: 'NEXO-gold',
    },
    {
      icon: Target,
      title: t('whyUs.excellence.title'),
      description: t('whyUs.excellence.description'),
      color: 'NEXO-cyan',
    },
  ];

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
            {t('whyUs.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('whyUs.subtitle')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-NEXO-cyan/20 relative overflow-hidden">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-NEXO-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  card.color === 'NEXO-gold' 
                    ? 'bg-NEXO-gold/10 group-hover:bg-NEXO-gold/20' 
                    : 'bg-NEXO-cyan/10 group-hover:bg-NEXO-cyan/20'
                }`}>
                  <card.icon className={`w-8 h-8 ${
                    card.color === 'NEXO-gold' ? 'text-NEXO-gold' : 'text-NEXO-cyan'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-NEXO-navy mb-4 group-hover:text-NEXO-navy-light transition-colors">
                  {card.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

