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
    title: "Practical Learning",
    text: "Learn concepts with hands-on assignments, projects, and real examples.",
  },
  {
    title: "Expert Trainers",
    text: "Get guidance from trainers with practical industry knowledge.",
  },
  {
    title: "Career Support",
    text: "Resume guidance, interview preparation, and placement-focused learning.",
  },
  {
    title: "Job-ready Skills",
    text: "Build strong technical skills that help you become career-ready.",
  },
];

const icons = [BookOpenCheck, GraduationCap, BriefcaseBusiness, CheckCircle2];

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
    "We focus on practical learning, real-world projects, career guidance, and continuous support for students.";

  return (
    <section className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wide text-sm">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
            {title}
          </h2>

          <p className="text-textGray leading-7 mt-4">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={`${item.title}-${index}`}
                className="bg-white border border-borderSoft rounded-card p-7 shadow-card card-hover"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-extrabold text-dark mt-5">
                  {item.title}
                </h3>

                <p className="text-textGray leading-7 mt-3">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;