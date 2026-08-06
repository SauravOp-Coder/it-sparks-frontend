import {
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getHomeContentApi } from "../../api/homeApi";

const defaultFeatures = [
  {
    title: "Practical Industry Training",
    text: "Learn with live projects, internship experience, and hands-on implementation.",
  },
  {
    title: "Expert Mentorship",
    text: "Get guidance from experienced trainers and career mentors.",
  },
  {
    title: "Placement-Focused Learning",
    text: "Build resumes, improve GitHub profiles, and prepare for interviews.",
  },
  {
    title: "AI-Powered Curriculum",
    text: "Gain modern skills in AI, analytics, cloud, and development.",
  },
];

const icons = [BookOpenCheck, GraduationCap, BriefcaseBusiness, CheckCircle2];

const getTextLines = (text = "") =>
  text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const WhyChooseUs = () => {
  const [home, setHome] = useState(null);

  const fetchHome = async () => {
    try {
      const data = await getHomeContentApi();
      setHome(data.homeContent);
    } catch (error) {
      setHome(null);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  const features =
    home?.whyChooseCards?.length > 0 ? home.whyChooseCards : defaultFeatures;

  const title =
    home?.whyChooseTitle || "Why students choose IT Sparks Technologies";

  const subtitle =
    home?.whyChooseSubtitle ||
    "We focus on practical learning, real-world projects, internship experience, expert mentorship, and placement support.";

  return (
    <section className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 text-textGray">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => {
            const Icon = icons[index % icons.length];
            const lines = getTextLines(item.text);

            return (
              <div
                key={`${item.title}-${index}`}
                className="group h-full rounded-card bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-dark">
                  {item.title}
                </h3>

                <div className="mt-4 space-y-3">
                  {lines.length > 0 ? (
                    lines.map((line, lineIndex) => (
                      <div key={`${item.title}-${lineIndex}`} className="flex gap-2">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                        <p className="text-sm leading-7 text-textGray">
                          {line.replace(/^[-•*]\s*/, "")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-textGray">{item.text}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;