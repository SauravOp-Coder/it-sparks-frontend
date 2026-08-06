import { useEffect, useState } from "react";
import { getHomeContentApi } from "../../api/homeApi";

import ReviewSection from "../../components/common/ReviewSection";
import HomeBannerSlider from "../../components/home/HomeBannerSlider";
import PopularCourses from "../../components/home/PopularCourses";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import TrainingProcess from "../../components/home/TrainingProcess";
import PlacementSupport from "../../components/home/PlacementSupport";
import Recruiters from "../../components/home/Recruiters";

const Home = () => {
  const [content, setContent] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getHomeContentApi();
        if (data?.homeContent) {
          setContent(data.homeContent);
        }
      } catch (err) {
        console.error("Failed to load home page content", err);
      }
    };
    fetchContent();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sectionsList = content?.sections && content.sections.length > 0
    ? [...content.sections].sort((a, b) => a.order - b.order)
    : [
        { key: "hero", enabled: true },
        { key: "courses", enabled: true },
        { key: "whyChoose", enabled: true },
        { key: "training", enabled: true },
        { key: "placement", enabled: true },
        { key: "recruiters", enabled: true },
        { key: "reviews", enabled: true },
        { key: "faqs", enabled: true },
        { key: "cta", enabled: true },
      ];

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case "hero":
        return (
          <section key="hero" className="py-6 md:py-8">
            <HomeBannerSlider data={content} />
          </section>
        );

      case "courses":
        return (
          <section key="courses" className="py-12 md:py-16">
            <PopularCourses data={content} />
          </section>
        );

      case "whyChoose":
        return (
          <section key="whyChoose" className="py-12 md:py-16 bg-gray-50">
            <WhyChooseUs data={content} />
          </section>
        );

      case "training":
        return (
          <section key="training" className="py-12 md:py-16">
            <TrainingProcess data={content} />
          </section>
        );

      case "placement":
        return (
          <section key="placement" className="py-12 md:py-16 bg-gray-50">
            <PlacementSupport data={content} />
          </section>
        );

      case "recruiters":
        return (
          <section key="recruiters" className="py-12 md:py-16">
            <Recruiters data={content} />
          </section>
        );

      case "reviews":
        return (
          <section key="reviews" className="py-12 md:py-16 bg-gray-50">
            <ReviewSection />
          </section>
        );

      case "faqs":
        if (!content?.faqs || content.faqs.length === 0) return null;
        return (
          <section key="faqs" className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-dark">
                  {content.faqTitle || "Frequently Asked Questions"}
                </h2>
                <p className="text-textGray mt-2">
                  {content.faqSubtitle || "Find answers to common questions about our programs."}
                </p>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq, index) => (
                  <div
                    key={faq._id || index}
                    className="border border-borderSoft rounded-card overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-4 font-bold text-dark flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <span className="text-primary text-xl font-extrabold ml-4">
                        {openFaq === index ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-5 pt-1 text-textGray border-t border-borderSoft/50 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section key="cta" className="py-12 md:py-16 bg-primary text-white">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl font-extrabold">{content?.ctaTitle || "Start your IT learning journey today"}</h2>
              <p className="mt-3 opacity-90 max-w-2xl mx-auto">
                {content?.ctaSubtitle || "Book a free demo and get course guidance from our team."}
              </p>
              <a
                href={content?.ctaButtonLink || "/contact"}
                className="inline-block mt-6 px-8 py-3 bg-white text-primary font-bold rounded-button shadow hover:bg-gray-100 transition-colors"
              >
                {content?.ctaButtonText || "Book Free Demo"}
              </a>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {sectionsList
        .filter((sec) => sec.enabled)
        .map((sec) => renderSection(sec.key))}
    </main>
  );
};

export default Home;