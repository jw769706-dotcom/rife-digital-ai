import PricingHero from "./pricing/PricingHero";
import PricingCard from "./pricing/PricingCard";
import PricingGuarantee from "./pricing/PricingGuarantee";
import PricingFAQ from "./pricing/PricingFAQ";
import PricingCTA from "./pricing/PricingCTA";

export default function Pricing() {
  return (
    <>
      <PricingHero />
      <PricingCard />
      <PricingGuarantee />
      <PricingFAQ />
      <PricingCTA />
    </>
  );
}