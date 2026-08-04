import { useMeta } from '../hooks/useMeta';
import HeroBrand from '../components/HeroBrand';
import OurStory from '../components/OurStory';
import OurReach from '../components/OurReach';
import ProgramShowcase from '../components/ProgramShowcase';
import ServicesSection from '../components/ServicesSection';
import ContactCTA from '../components/ContactCTA';

export default function HomePage() {
  useMeta('home');
  return (
    <>
      <HeroBrand />
      <OurStory />
      <OurReach />
      <ProgramShowcase />
      <ServicesSection />
      <ContactCTA />
    </>
  );
}
