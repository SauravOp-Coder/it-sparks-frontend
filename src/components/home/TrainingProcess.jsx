import { useEffect, useState } from "react";
import { getHomeContentApi } from "../../api/homeApi";

const defaultSteps = [
  {
    number: "01",
    title: "Counselling & Course Selection",
    text: "We understand your background and help you choose the right course.",
  },
  {
    number: "02",
    title: "Concept + Practical Training",
    text: "You learn every topic with examples, assignments, and practical tasks.",
  },
  {
    number: "03",
    title: "Project Development",
    text: "You work on real-world projects to build confidence and portfolio.",
  },
  {
    number: "04",
    title: "Interview & Placement Support",
    text: "You get resume, interview, and career guidance support.",
  },
];

const TrainingProcess = () => {
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

  const steps =
    home?.trainingSteps?.length > 0 ? home.trainingSteps : defaultSteps;

  const title = home?.trainingTitle || "Our practical training process";

  const subtitle =
    home?.trainingSubtitle ||
    "Our process is designed to help students learn step by step and become confident with real project work.";

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wide text-sm">
            Training Process
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
            {title}
          </h2>

          <p className="text-textGray leading-7 mt-4">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="relative bg-lightBg border border-borderSoft rounded-card p-7 card-hover"
            >
              <span className="text-5xl font-extrabold text-primary/15">
                {step.number}
              </span>

              <h3 className="text-xl font-extrabold text-dark mt-4">
                {step.title}
              </h3>

              <p className="text-textGray leading-7 mt-3">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingProcess;