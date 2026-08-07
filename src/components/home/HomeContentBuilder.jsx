import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
} from "lucide-react";
import { getHomeContentApi } from "../../api/homeApi";

const HomeContentBuilder = () => {
  const [home, setHome] = useState(null);
  const [openFaqs, setOpenFaqs] = useState({});

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHomeContentApi();
        setHome(data.homeContent || {});
      } catch (error) {
        console.error(error);
      }
    };

    loadHome();
  }, []);

  const sections = home?.homeSections || [];
  const faqs = home?.faqs || [];

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
            className="rounded-3xl bg-primary/5 p-8"
          >
            <h2
              className={`text-3xl md:text-4xl font-black text-dark ${textClass}`}
            >
              {section.title}
            </h2>
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

            <p
              className={`leading-8 text-textGray whitespace-pre-line ${textClass}`}
            >
              {section.content}
            </p>
          </div>
        );

      case "highlight":
        return (
          <div
            key={index}
            className="rounded-3xl bg-primary text-white p-8"
          >
            <h2 className="text-3xl font-black">
              {section.title}
            </h2>

            <p className="mt-4 whitespace-pre-line leading-8">
              {section.content}
            </p>
          </div>
        );
              case "bulletList":
        return (
          <div key={index}>
            <h2 className="text-3xl font-black mb-5">
              {section.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <CircleCheckBig
                    className="text-primary mt-1"
                    size={20}
                  />

                  <span className="leading-7">
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
            <h2 className="text-3xl font-black mb-5">
              {section.title}
            </h2>

            <ol className="list-decimal pl-6 space-y-3">
              {section.items.map((item, i) => (
                <li key={i}>
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
    <section className="py-16 bg-white">

      <div className="container">

        {/* ========================= */}
        {/* Dynamic Home Sections */}
        {/* ========================= */}

        {sections.length > 0 ? (

          <div className="space-y-12">

            {sections.map((section, index) => (

              <div
                key={section._id || index}
                className={
                  section.layout === "split"
                    ? "grid md:grid-cols-2 gap-10 items-start"
                    : ""
                }
              >
                {renderSection(section, index)}
              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-3xl border-2 border-dashed border-gray-300 py-20 text-center">

            <h3 className="text-2xl font-bold text-gray-600">
              No Home Content Found
            </h3>

            <p className="mt-3 text-textGray">
              Please add sections from the Admin Panel.
            </p>

          </div>

        )}

        {/* ========================= */}
        {/* FAQs */}
        {/* ========================= */}

        {faqs.length > 0 && (

          <div className="mt-20">

            <h2 className="text-4xl font-black text-center text-dark">

              Frequently Asked Questions

            </h2>

            <div className="mt-10 space-y-5">

              {faqs.map((faq, index) => {

                const open = openFaqs[index];

                return (

                  <div
                    key={index}
                    className="rounded-2xl border border-gray-200 overflow-hidden"
                  >

                    <button
                      onClick={() =>
                        setOpenFaqs((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                      className="flex w-full items-center justify-between p-6 text-left"
                    >

                      <span className="font-bold text-lg text-dark">

                        {faq.question}

                      </span>

                      {open ? (
                        <ChevronUp className="text-primary" />
                      ) : (
                        <ChevronDown className="text-primary" />
                      )}

                    </button>

                    {open && (

                      <div className="px-6 pb-6">

                        <p className="leading-8 whitespace-pre-line text-textGray">

                          {faq.answer}

                        </p>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </div>

        )}

        {/* ========================= */}
        {/* CTA */}
        {/* ========================= */}

        {home?.ctaTitle && (

          <div className="mt-24">

            <div className="rounded-3xl bg-primary p-10 text-center text-white">

              <h2 className="text-4xl font-black">

                {home.ctaTitle}

              </h2>

              {home.ctaSubtitle && (

                <p className="mt-5 max-w-3xl mx-auto text-lg opacity-90">

                  {home.ctaSubtitle}

                </p>

              )}

              {home.ctaButtonText && (

                <a
                  href={home.ctaButtonLink || "/contact"}
                  className="inline-block mt-8 rounded-xl bg-white px-8 py-4 font-bold text-primary transition hover:scale-105"
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
