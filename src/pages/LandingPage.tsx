import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trusted from "../components/Trusted";
import Features from "../components/Features";
import AiDemo from "../components/AiDemo";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Features />
      <AiDemo />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}