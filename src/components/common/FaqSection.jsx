import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getHomeContentApi } from "../../api/homeApi";

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFaqs, setOpenFaqs] = useState({});

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const data = await getHomeContentApi();
        setFaqs(data.homeContent?.faqs || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadFaqs();
  }, []);

  if (faqs.length === 0) return null;

  return (
    <div className="mt-16 w-full">
      <h2 className="text-3xl font-extrabold text-center text-dark tracking-tight mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3 max-w-4xl mx-auto">
        {faqs.map((faq, index) => {
          const open = openFaqs[index];

          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                aria-expanded={Boolean(open)}
                onClick={() =>
                  setOpenFaqs((prev) => ({
                    ...prev,
                    [index]: !prev[index],
                  }))
                }
                className="flex w-full items-center justify-between p-5 text-left transition hover:bg-gray-50/50"
              >
                <span className="font-bold text-base md:text-lg text-dark pr-4">
                  {faq.question}
                </span>
                {open ? (
                  <ChevronUp className="text-primary shrink-0 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-primary shrink-0 w-5 h-5" />
                )}
              </button>

              {open && (
                <div className="px-5 pb-5 pt-1 text-gray-600 border-t border-gray-100">
                  <p className="leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;