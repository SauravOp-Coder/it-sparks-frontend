import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, CircleCheckBig } from "lucide-react";
import { getHomeContentApi } from "../../api/homeApi";

const defaultContentSections = [
  {
    type: "heading",
    title: "Best IT Training Institute in Pune – IT Sparks Technologies",
    layout: "full",
    content: "",
  },
  {
    type: "paragraph",
    title: "Practical IT Training that Builds Careers",
    layout: "full",
    content:
      "Searching for the best IT training institute in Pune that goes beyond traditional classroom learning? Welcome to IT Sparks Technologies, where learning begins with real industry execution. Unlike traditional IT classes in Pune, we help students build AI-powered applications, enterprise solutions, cloud infrastructure, analytics dashboards, and data engineering projects used in real business environments.",
  },
  {
    type: "highlight",
    title: "Transform Your Career with Real Industry Live Projects",
    layout: "full",
    content:
      "Our students work on live industry projects in Artificial Intelligence, Data Analytics, Data Science, Cloud Computing, DevOps, and ETL Development. This practical learning approach helps learners move confidently from theory to real-world implementation.",
  },
  {
    type: "bulletList",
    title: "Why IT Sparks Technologies is the Best IT Institute in Pune",
    layout: "split",
    items: [
      "Real Industry Live Projects",
      "AI-Driven Learning Environment",
      "Product-Based Practical Training",
      "Industry Expert Trainers",
      "10+ Industry-Level Projects",
      "Internship Experience",
      "Resume & GitHub Optimization",
      "Interview Simulation Program (ISP)",
      "Placement Assistance",
      "Personal Mentorship",
    ],
  },
  {
    type: "bulletList",
    title: "Our Career-Oriented IT Courses in Pune",
    layout: "split",
    items: [
      "Full Stack AI (Generative AI & Agentic AI)",
      "Data Analytics with AI",
      "Data Science with AI",
      "AWS Cloud Computing & DevOps",
      "ETL Developer Professional Program",
    ],
  },
  {
    type: "paragraph",
    title: "Learn from Industry Expert Trainers",
    layout: "full",
    content:
      "Technology changes rapidly, so learning from trainers who actively work on real projects is essential. Our teachers bring practical industry knowledge, modern development workflows, deployment strategies, and AI implementation experience directly into every session.",
  },
  {
    type: "bulletList",
    title: "100% Placement Assistance & Career Support",
    layout: "full",
    items: [
      "Professional Resume Building",
      "GitHub & Portfolio Development",
      "Mock Technical Interviews",
      "HR Interview Preparation",
      "Interview Simulation Program (ISP)",
      "Internship Experience",
      "Career Guidance",
      "Job Opportunity Assistance",
    ],
  },
  {
    type: "paragraph",
    title: "Affordable IT Course Fees in Pune",
    layout: "full",
    content:
      "We believe ambitious students deserve quality education at a fair price. Our courses combine practical exposure, live projects, mentorship, and placement support so learners can focus on real value rather than just the price tag.",
  },
];

const HomeContentBuilder = () => {
  const [home, setHome] = useState(null);
  const [openFaqs, setOpenFaqs] = useState({});

 useEffect(() => {
  const fetchHome = async () => {
    try {
      const data = await getHomeContentApi();

      console.log("FULL RESPONSE:", data);
      console.log("HOME CONTENT:", data.homeContent);
      console.log("HOME FAQS:", data.homeContent?.faqs);

      setHome(data.homeContent);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  fetchHome();
}, []);

  const sections =
    Array.isArray(home?.homeSections) && home.homeSections.length > 0
      ? home.homeSections
      : defaultContentSections;
  const faqs = Array.isArray(home?.faqs) ? home.faqs : [];

  console.log("Rendered FAQs:", faqs);
console.log("FAQ Count:", faqs.length);

  const renderSection = (section, index) => {
    const textCaseClass =
      section.textCase === "uppercase"
        ? "uppercase"
        : section.textCase === "lowercase"
        ? "lowercase"
        : section.textCase === "capitalize"
        ? "capitalize"
        : "";

    const isSplit = section.layout === "split";
    const shellClass = "py-6 md:py-8";

    if (section.type === "heading") {
      return (
        <div key={section._id || index} className={`mt-8 first:mt-0 ${isSplit ? "md:col-span-2" : ""}`}>
          <div className="rounded-[24px] bg-primary/5 px-6 py-8 md:px-8 md:py-10">
            <h2 className={`text-3xl font-black leading-tight text-dark ${textCaseClass}`}>
              {section.title || section.content}
            </h2>
          </div>
        </div>
      );
    }

    if (section.type === "paragraph") {
      return (
        <div key={section._id || index} className={`mt-8 first:mt-0 ${isSplit ? "md:col-span-2" : ""}`}>
          <div className={shellClass}>
            {section.title && (
              <h3 className={`text-2xl font-extrabold text-dark ${textCaseClass}`}>
                {section.title}
              </h3>
            )}
            <p className={`mt-3 whitespace-pre-line text-base leading-8 text-textGray ${textCaseClass}`}>
              {section.content}
            </p>
          </div>
        </div>
      );
    }

    if (section.type === "bulletList") {
      return (
        <div key={section._id || index} className={`mt-8 first:mt-0 ${isSplit ? "md:col-span-2" : ""}`}>
          <div className={shellClass}>
            {section.title && (
              <h3 className={`text-2xl font-extrabold text-dark ${textCaseClass}`}>
                {section.title}
              </h3>
            )}
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {(section.items || []).map((item, itemIndex) => (
                <li key={`${section._id || index}-${itemIndex}`} className="flex gap-3 text-base leading-7 text-textGray">
                  <CircleCheckBig size={20} className="mt-1 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (section.type === "numberedList") {
      return (
        <div key={section._id || index} className={`mt-8 first:mt-0 ${isSplit ? "md:col-span-2" : ""}`}>
          <div className={shellClass}>
            {section.title && (
              <h3 className={`text-2xl font-extrabold text-dark ${textCaseClass}`}>
                {section.title}
              </h3>
            )}
            <ol className="mt-4 list-decimal space-y-3 pl-6 text-base leading-7 text-textGray">
              {(section.items || []).map((item, itemIndex) => (
                <li key={`${section._id || index}-${itemIndex}`}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      );
    }

    if (section.type === "highlight") {
      return (
        <div key={section._id || index} className={`mt-8 first:mt-0 ${isSplit ? "md:col-span-2" : ""}`}>
          <div className="rounded-[24px] bg-primary/5 px-6 py-6 md:px-8 md:py-8">
            {section.title && (
              <h3 className={`text-2xl font-extrabold text-primary ${textCaseClass}`}>
                {section.title}
              </h3>
            )}
            <p className={`mt-3 whitespace-pre-line text-base leading-8 text-dark ${textCaseClass}`}>
              {section.content}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {sections.length > 0 ? (
          <div className={sections.some((section) => section.layout === "split") ? "grid gap-8 md:grid-cols-2" : "space-y-8"}>
            {sections.map((section, index) => renderSection(section, index))}
          </div>
        ) : (
          <div className="rounded-[24px] bg-lightBg p-8 text-center text-textGray">
            Add custom home sections from the admin panel to display your PDF-style content here.
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mt-14 pt-8">
            <h2 className="text-3xl font-black text-dark">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = Boolean(openFaqs[index]);

                return (
                  <div key={`${faq.question}-${index}`} className="rounded-[20px] bg-lightBg/70 px-5 py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }))}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-lg font-extrabold text-dark">{faq.question}</span>
                      {isOpen ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
                    </button>
                    {isOpen && (
                      <p className="mt-4 whitespace-pre-line text-base leading-8 text-textGray">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeContentBuilder;
