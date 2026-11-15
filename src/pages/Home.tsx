import { Layout } from "../components/Layout";
import { Hero } from "../components/home/Hero";
import { SignalStrip } from "../components/home/SignalStrip";
import { Services } from "../components/home/Services";
import { HowWeEngage } from "../components/home/HowWeEngage";
import { ExampleSystem } from "../components/home/ExampleSystem";
import { Process } from "../components/home/Process";
import { About } from "../components/home/About";
import { Commitments } from "../components/home/Commitments";
import { Faq } from "../components/home/Faq";
import { ContactSection } from "../components/home/ContactSection";

export function Home() {
  return (
    <Layout
      title="Summit Ridge Digital | AI Automation for Service Businesses"
      description="Summit Ridge Digital builds practical AI automation and lead-response systems for service businesses."
    >
      <Hero />
      <SignalStrip />
      <Services />
      <HowWeEngage />
      <ExampleSystem />
      <Process />
      <About />
      <Commitments />
      <Faq />
      <ContactSection />
    </Layout>
  );
}
