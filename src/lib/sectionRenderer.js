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

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const { type, props } = section || {};
        const key = `${type || "section"}-${idx}`;

        switch (type) {
          // ADD:
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

          case "hero":
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
