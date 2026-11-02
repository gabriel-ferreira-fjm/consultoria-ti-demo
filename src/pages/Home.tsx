import HeroSection from '@/components/sections/HeroSection';
import WelcomeSection from '@/components/sections/WelcomeSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import DatabaseEngines from '@/components/sections/DatabaseEngines';
import PackagesSection from '@/components/sections/PackagesSection';
import CTASection from '@/components/sections/CTASection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <WhyChooseUs />
      <ServicesSection />
      <StatsSection />
      <DatabaseEngines />
      <PackagesSection />
      <CTASection />
    </>
  );
};

export default Home;

