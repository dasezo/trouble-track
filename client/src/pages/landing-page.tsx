import { Cta } from '@/components/landing-page/cta';
import { FAQ } from '@/components/landing-page/faq';
import Features from '@/components/landing-page/features';
import { Footer } from '@/components/landing-page/footer';
import { Hero } from '@/components/landing-page/hero';
import { Navbar } from '@/components/landing-page/navbar';
import { Pricing } from '@/components/landing-page/pricing';
import { ScrollToTop } from '@/components/landing-page/scroll-to-top';
import { Testimonials } from '@/components/landing-page/testimonials';
function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Cta />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default LandingPage;
