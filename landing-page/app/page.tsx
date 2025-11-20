import Hero from '@/components/hero'
import Features from '@/components/features'
import Screenshot from '@/components/screenshot'
import WhyOrphelix from '@/components/why-orphelix'
import CTASection from '@/components/cta-section'
import Footer from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <main>
      <ThemeToggle />
      <Hero />
      <Features />
      <Screenshot />
      <WhyOrphelix />
      <CTASection />
      <Footer />
    </main>
  )
}
