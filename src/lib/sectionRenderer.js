<<<<<<< HEAD
import Hero from "@/components/blocks/Hero";
import ImageText from "@/components/blocks/ImageText";
import JourneyCards from "@/components/blocks/JourneyCards";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Insights from "@/components/blocks/Insights";
import RecognizedBy from "@/components/blocks/RecognizedBy";
import FAQAccordion from "@/components/blocks/FAQAccordion";
import CtaBanner from "@/components/blocks/CtaBanner";

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const { type, props } = section || {};
        const key = `${type || "section"}-${idx}`;

        switch (type) {
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
=======
import Hero from "@/components/blocks/Hero";
import ImageText from "@/components/blocks/ImageText";
import JourneyCards from "@/components/blocks/JourneyCards";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import Insights from "@/components/blocks/Insights";
import RecognizedBy from "@/components/blocks/RecognizedBy";
import FAQAccordion from "@/components/blocks/FAQAccordion";
import CtaBanner from "@/components/blocks/CtaBanner";

export default function SectionRenderer({ sections = [] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const { type, props } = section || {};
        const key = `${type || "section"}-${idx}`;

        switch (type) {
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
>>>>>>> origin/main
