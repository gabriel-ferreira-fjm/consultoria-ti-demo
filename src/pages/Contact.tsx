import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// Flag Component usando imagens da CDN do Twemoji
const FlagEmoji = ({ countryCode }: { countryCode: string }) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 0x1F1E6 - 65 + char.charCodeAt(0))
    .map(code => code.toString(16))
    .join('-');
  
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${codePoints}.svg`}
      alt={`${countryCode} flag`}
      className="w-5 h-5 inline-block"
      loading="lazy"
    />
  );
};

// WhatsApp Logo Component
const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 32 32" 
    className="w-8 h-8"
    fill="currentColor"
  >
    <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.050-13.485 13.485-13.485s13.485 6.050 13.485 13.485c0 7.435-6.050 13.485-13.485 13.485zM21.960 18.653c-0.322-0.161-1.905-0.939-2.201-1.047s-0.511-0.161-0.726 0.161c-0.215 0.322-0.833 1.047-1.020 1.262s-0.376 0.241-0.698 0.080c-0.322-0.161-1.359-0.501-2.588-1.596-0.957-0.853-1.603-1.907-1.790-2.229s-0.020-0.496 0.141-0.657c0.145-0.145 0.322-0.376 0.483-0.564s0.215-0.322 0.322-0.537c0.107-0.215 0.054-0.403-0.027-0.564s-0.726-1.748-0.995-2.393c-0.262-0.628-0.527-0.543-0.726-0.553-0.188-0.009-0.403-0.011-0.618-0.011s-0.564 0.080-0.860 0.403c-0.295 0.322-1.127 1.102-1.127 2.688s1.154 3.118 1.315 3.333c0.161 0.215 2.275 3.472 5.510 4.87 0.770 0.333 1.371 0.532 1.840 0.681 0.773 0.246 1.476 0.211 2.032 0.128 0.620-0.093 1.905-0.779 2.174-1.531s0.269-1.398 0.188-1.531c-0.080-0.134-0.295-0.215-0.618-0.376z"/>
  </svg>
);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const getWhatsAppMessage = () => {
    const messages = {
      en: 'Hello! I came through the Nexo Data website and would like to learn more about your database administration services. Can you help me?',
      pt: 'Olá! Vim pelo site da Nexo Data e gostaria de saber mais sobre os serviços de administração de base de dados. Podem ajudar-me?',
      'pt-BR': 'Olá! Vim pelo site da Nexo Data e gostaria de saber mais sobre os serviços de administração de banco de dados. Podem me ajudar?',
      es: '¡Hola! Vine a través del sitio web de Nexo Data y me gustaría saber más sobre los servicios de administración de bases de datos. ¿Pueden ayudarme?'
    };
    
    const currentLang = i18n.language as keyof typeof messages;
    return messages[currentLang] || messages.pt;
  };

  const whatsappNumber = '000 000 000';
  const whatsappMessage = encodeURIComponent(getWhatsAppMessage());
  const whatsappUrl = `#demo-contact`;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success(t('contact.form.success'));
    reset();
    setIsSubmitting(false);
  };

  const subjects = [
    { value: 'general', label: t('contact.subjects.general') },
    { value: 'quote', label: t('contact.subjects.quote') },
    { value: 'support', label: t('contact.subjects.support') },
    { value: 'partnership', label: t('contact.subjects.partnership') },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-NEXO-navy">
        <div className="absolute inset-0 bg-gradient-radial-cyan opacity-30" />
        
        <div className="container-custom relative z-10 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-16 bg-gradient-to-r from-NEXO-cyan to-NEXO-gold mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-NEXO-navy mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      {...register('name', { required: true })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-NEXO-gray focus:outline-none focus:ring-2 focus:ring-NEXO-cyan focus:border-transparent transition-all"
                      placeholder={t('contact.form.placeholders.name')}
                    />
                    {errors.name && (
                      <span className="text-destructive text-sm mt-1">{t('contact.form.errors.required')}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-NEXO-navy mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-NEXO-gray focus:outline-none focus:ring-2 focus:ring-NEXO-cyan focus:border-transparent transition-all"
                      placeholder={t('contact.form.placeholders.email')}
                    />
                    {errors.email && (
                      <span className="text-destructive text-sm mt-1">{t('contact.form.errors.emailInvalid')}</span>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-NEXO-navy mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-NEXO-gray focus:outline-none focus:ring-2 focus:ring-NEXO-cyan focus:border-transparent transition-all"
                      placeholder={t('contact.form.placeholders.phone')}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-NEXO-navy mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      {...register('company')}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-NEXO-gray focus:outline-none focus:ring-2 focus:ring-NEXO-cyan focus:border-transparent transition-all"
                      placeholder={t('contact.form.placeholders.company')}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-NEXO-navy mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <select
                    {...register('subject', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-NEXO-gray focus:outline-none focus:ring-2 focus:ring-NEXO-cyan focus:border-transparent transition-all"
                  >
                    <option value="">{t('contact.form.placeholders.subject')}</option>
                    {subjects.map((subject) => (
                      <option key={subject.value} value={subject.value}>
                        {subject.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-NEXO-navy mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    {...register('message', { required: true })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-NEXO-gray focus:outline-none focus:ring-2 focus:ring-NEXO-cyan focus:border-transparent transition-all resize-none"
                    placeholder={t('contact.form.placeholders.message')}
                  />
                  {errors.message && (
                    <span className="text-destructive text-sm mt-1">{t('contact.form.errors.required')}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-NEXO-cyan text-NEXO-navy font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-NEXO-navy/30 border-t-NEXO-navy rounded-full animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-NEXO-navy mb-6">
                  {t('contact.info.title')}
                </h3>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-6 bg-NEXO-gray rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-NEXO-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold text-NEXO-navy mb-1">{t('contact.info.email')}</h4>
                  <a
                    href="#demo-contact"
                    className="text-muted-foreground hover:text-NEXO-cyan transition-colors"
                  >
                    contacto@example.invalid
                  </a>
                </div>
              </div>

              {/* Brazil Office */}
              <div className="flex items-start gap-4 p-6 bg-NEXO-gray rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-NEXO-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold text-NEXO-navy mb-1 flex items-center gap-2">
                    <FlagEmoji countryCode="BR" />
                    {t('contact.info.brazil')}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Morada fictícia — Brasil<br />
                    Localização de demonstração
                  </p>
                  <a
                    href="#demo-contact"
                    className="flex items-center gap-2 text-NEXO-cyan hover:underline"
                  >
                    <Phone className="w-4 h-4" /> 000 000 000
                  </a>
                </div>
              </div>

              {/* Portugal Office */}
              <div className="flex items-start gap-4 p-6 bg-NEXO-gray rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-NEXO-cyan/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-NEXO-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold text-NEXO-navy mb-1 flex items-center gap-2">
                    <FlagEmoji countryCode="PT" />
                    {t('contact.info.portugal')}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">
                    Morada fictícia — Portugal<br />
                    Montijo, CP: 2870-091
                  </p>
                  <a
                    href="#demo-contact"
                    className="flex items-center gap-2 text-NEXO-cyan hover:underline"
                  >
                    <Phone className="w-4 h-4" /> 000 000 000
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all hover:scale-[1.02] shadow-lg"
              >
                <div className="flex-shrink-0">
                  <WhatsAppIcon />
                </div>
                <div>
                  <div className="font-bold text-lg">{t('contact.whatsapp.title')}</div>
                  <div className="text-white/90 text-sm">{t('contact.whatsapp.description')}</div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-NEXO-gray">
        <div className="flex h-full min-h-[400px] items-center justify-center bg-slate-100 p-8 text-center text-slate-700">Mapa de demonstração · Localização fictícia</div>
      </section>
    </>
  );
};

export default Contact;
