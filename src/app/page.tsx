import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { ServicesOverview } from "@/components/marketing/ServicesOverview";
import { WhyEduHub } from "@/components/marketing/WhyEduHub";
import { ContactCta } from "@/components/marketing/ContactCta";
import { TrustBar } from "@/components/trust/TrustBar";
import { TrackRecord } from "@/components/trust/TrackRecord";
import { HowItWorks } from "@/components/trust/HowItWorks";
import { FounderPromise } from "@/components/trust/FounderPromise";
import { LogoStrip } from "@/components/trust/LogoStrip";
import { Guarantees } from "@/components/trust/Guarantees";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <TrackRecord />
      <ServicesOverview />
      <HowItWorks />
      <WhyEduHub />
      <FounderPromise />
      <LogoStrip />
      <Guarantees />
      <ContactCta />
    </>
  );
}
