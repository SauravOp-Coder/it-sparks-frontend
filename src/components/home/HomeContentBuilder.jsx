import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { getHomeContentApi } from "../../api/homeApi";
import FaqSection from "../common/FaqSection";
import EnquireSection from "../common/EnquireSection";

const splitParagraphs = (text = "") =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

const HomeContentBuilder = () => {
  const [home, setHome] = useState(null);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHomeContentApi();
        setHome(data.homeContent || {});
      } catch (error) {
        console.error("Failed to load home content:", error);
      }
    };

    loadHome();
  }, []);

  const sections = home?.homeSections || [];

  const renderSection = (section, index) => {
    const textClass =
      section.textCase === "uppercase"
        ? "uppercase"
        : section.textCase === "lowercase"
        ? "lowercase"
        : section.textCase === "capitalize"
        ? "capitalize"
        : "";

    switch (section.type) {
            case "heading":
        return (
          <div
            key={index}
            className="rounded-3xl bg-primary/5 border-l-4 border-primary p-8"
          >
            <h2
              className={`text-4xl md:text-5xl font-black text-dark leading-tight ${textClass}`}
            >
              {section.title}
            </h2>
          </div>
        );

      case "subheading":
        return (
          <div key={index} className="mt-2">
            <h3
              className={`text-lg md:text-xl font-bold text-dark ${textClass}`}
            >
              {section.title || section.content}
            </h3>
          </div>
        );
       

      case "paragraph":
        return (
          <div key={index}>
            {section.title && (
              <h2
                className={`text-3xl font-black text-dark mb-4 ${textClass}`}
              >
                {section.title}
              </h2>
            )}

            <div className="space-y-3">
              {splitParagraphs(section.content).map((para, i) => (
                <p
                  key={i}
                  className={`leading-8 text-textGray whitespace-pre-line ${textClass}`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        );

      case "highlight":
        return (
          <div key={index} className="rounded-3xl bg-primary text-white p-8">
            {section.title && (
              <h2
                className={`text-3xl font-black ${textClass}`}
              >
                {section.title}
              </h2>
            )}

            {section.content && (
              <p
                className={`mt-4 whitespace-pre-line leading-8 ${textClass}`}
              >
                {section.content}
              </p>
            )}
          </div>
        );

      case "bulletList":
        return (
          <div key={index}>
            {section.title && (
              <h2
                className={`text-3xl font-black mb-5 text-dark ${textClass}`}
              >
                {section.title}
              </h2>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {(section.items || []).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CircleCheckBig
                    className="text-primary mt-1 shrink-0"
                    size={20}
                  />

                  <span className={`leading-7 ${textClass}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "numberedList":
        return (
          <div key={index}>
            {section.title && (
              <h2
                className={`text-3xl font-black mb-5 text-dark ${textClass}`}
              >
                {section.title}
              </h2>
            )}

            <ol className="list-decimal pl-6 space-y-3">
              {(section.items || []).map((item, i) => (
                <li key={i} className={`leading-7 ${textClass}`}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-12 bg-white w-full">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* ========================= */}
        {/* Dynamic Home Sections */}
        {/* ========================= */}

        {sections.length > 0 ? (
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {sections.map((section, index) => (
              <div
                key={section._id || index}
                className={
                  section.layout === "split"
                    ? "grid md:grid-cols-2 gap-8 items-center"
                    : "w-full"
                }
              >
                {renderSection(section, index)}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xl mx-auto rounded-2xl border-2 border-dashed border-gray-300 py-12 px-6 text-center">
            <h3 className="text-xl font-bold text-gray-600">
              No Home Content Found
            </h3>

            <p className="mt-2 text-sm text-textGray">
              Please add sections from the Admin Panel.
            </p>
          </div>
        )}

              {/* ========================= */}
      {/* Enquire Section */}
      {/* ========================= */}
      <EnquireSection />

      

        {/* ========================= */}
        {/* FAQs */}
        {/* ========================= */}


        <FaqSection />

        {/* ========================= */}
        {/* CTA Section */}
        {/* ========================= */}

        {home?.ctaTitle && (
          <div className="mt-20 w-full">
            <div className="rounded-3xl bg-primary p-8 md:p-12 text-center text-white shadow-lg max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {home.ctaTitle}
              </h2>

              {home.ctaSubtitle && (
                <p className="mt-3 max-w-2xl mx-auto text-base md:text-lg opacity-90 leading-relaxed">
                  {home.ctaSubtitle}
                </p>
              )}

              {home.ctaButtonText && (
                <a
                  href={home.ctaButtonLink || "/contact"}
                  className="inline-block mt-6 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-primary transition hover:scale-105 shadow-sm"
                >
                  {home.ctaButtonText}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeContentBuilder;