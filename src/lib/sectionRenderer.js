import Hero from "@/components/blocks/Hero";
import ImageText from "@/components/blocks/ImageText";
import JourneyCards from "@/components/blocks/JourneyCards";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Insights from "@/components/blocks/Insights";
import RecognizedBy from "@/components/blocks/RecognizedBy";
import FAQAccordion from "@/components/blocks/FAQAccordion";
import CtaBanner from "@/components/blocks/CtaBanner";

import PageHero from "@/components/blocks/PageHero";
import ContactDetails from "@/components/blocks/ContactDetails";
import LocationsGrid from "@/components/blocks/LocationsGrid";
import PositionsOpen from "@/components/blocks/PositionsOpen";

import AdmissionsIntro from "@/components/blocks/AdmissionsIntro";
import AdmissionsJourney from "@/components/blocks/AdmissionsJourney";

import ParentsBooks from "@/components/parents/ParentsBooks";
import InsightsCarousel from "@/components/parents/InsightsCarousel";
import TabbedFaq from "@/components/parents/TabbedFaq";

import ResearchHero from "@/components/research/ResearchHero";
import ResearchMission from "@/components/research/ResearchMission";
import PhilosophyCards from "@/components/research/PhilosophyCards";
import MethodFramework from "@/components/research/MethodFramework";
import ResearchStats from "@/components/research/ResearchStats";
import OutcomesPatents from "@/components/research/OutcomesPatents";
import PublicationsGrid from "@/components/research/PublicationsGrid";
import PartnersStrip from "@/components/research/PartnersStrip";
import CouncilCarousel from "@/components/research/CouncilCarousel";
import EthicsGovernance from "@/components/research/EthicsGovernance";

import InnovationMediaHero from "@/components/innovations/InnovationMediaHero";
import InnovationAgeCards from "@/components/innovations/InnovationAgeCards";
import InnovationLogoStrip from "@/components/innovations/InnovationLogoStrip";
import InnovationHabitSplit from "@/components/innovations/InnovationHabitSplit";
import MontessoriToMars from "@/components/innovations/MontessoriToMars";
import BillionYears from "@/components/innovations/BillionYears";
import HighStakes from "@/components/innovations/HighStakes";
import InnovationGallery from "@/components/innovations/InnovationGallery";
import InnovationCtaDrone from "@/components/innovations/InnovationCtaDrone";
import InnovationContactSplit from "@/components/innovations/InnovationContactSplit";

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const { type, props } = section || {};
        const key = `${type || "section"}-${idx}`;

        switch (type) {
          // ADD:
          // INNOVATION
          case "innovationMediaHero":
            return <InnovationMediaHero key={key} {...props} />;
          case "innovationAgeCards":
            return <InnovationAgeCards key={key} {...props} />;
          case "innovationLogoStrip":
            return <InnovationLogoStrip key={key} {...props} />;
          case "innovationHabitSplit":
            return <InnovationHabitSplit key={key} {...props} />;
          case "montessoriToMars":
            return <MontessoriToMars key={key} {...props} />;
          case "billionYears":
            return <BillionYears key={key} {...props} />;
          case "highStakes":
            return <HighStakes key={key} {...props} />;
          case "innovationGallery":
            return <InnovationGallery key={key} {...props} />;
          case "innovationCtaDrone":
            return <InnovationCtaDrone key={key} {...props} />;
          case "innovationContactSplit":
            return <InnovationContactSplit key={key} {...props} />;

          case "researchHero":
            return <ResearchHero key={key} {...props} />;
          case "researchMission":
            return <ResearchMission key={key} {...props} />;
          case "philosophyCards":
            return <PhilosophyCards key={key} {...props} />;
          case "methodFramework":
            return <MethodFramework key={key} {...props} />;
          case "researchStats":
            return <ResearchStats key={key} {...props} />;
          case "outcomesPatents":
            return <OutcomesPatents key={key} {...props} />;
          case "publicationsGrid":
            return <PublicationsGrid key={key} {...props} />;
          case "partnersStrip":
            return <PartnersStrip key={key} {...props} />;
          case "councilCarousel":
            return <CouncilCarousel key={key} {...props} />;
          case "ethicsGovernance":
            return <EthicsGovernance key={key} {...props} />;
            
          case "hero":
            return <PageHero key={key} {...props} />;
          case "books":
            return <ParentsBooks key={key} {...props} />;
          case "insightsCarousel":
            return <InsightsCarousel key={key} {...props} />;

          case "tabbedFaq":
            return <TabbedFaq key={key} {...props} />;

          case "admissionsIntro":
            return <AdmissionsIntro key={key} {...props} />;
          case "admissionsJourney":
            return <AdmissionsJourney key={key} {...props} />;
            
          case "pageHero":
            return <PageHero key={key} {...props} />;
          case "contactDetails":
            return <ContactDetails key={key} {...props} />;
          case "locationsGrid":
            return <LocationsGrid key={key} {...props} />;
          case "positionsOpen":
            return <PositionsOpen key={key} {...props} />;

          case "homeHero":
            return <Hero key={key} {...props} />;
          case "imageText":
            return <ImageText key={key} {...props} />;
          case "journeyCards":
            return <JourneyCards key={key} {...props} />;
          case "featureGrid":
            return <FeatureGrid key={key} {...props} />;
          case "insights":
            return <Insights key={key} {...props} />;
          case "recognizedBy":
            return <RecognizedBy key={key} {...props} />;
          case "faq":
            return <FAQAccordion key={key} {...props} />;
          case "ctaBanner":
            return <CtaBanner key={key} {...props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
