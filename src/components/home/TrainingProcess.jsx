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

const getTextLines = (text = "") =>
  text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);

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
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Training Process
          </span>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 text-textGray">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const lines = getTextLines(step.text);

            return (
              <div
                key={`${step.title}-${index}`}
                className="relative rounded-card bg-lightBg p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-5xl font-extrabold text-primary/15">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-extrabold text-dark">
                  {step.title}
                </h3>

                <div className="mt-4 space-y-2">
                  {lines.length > 0 ? (
                    lines.map((line, lineIndex) => (
                      <div key={`${step.title}-${lineIndex}`} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <p className="text-sm leading-7 text-textGray">
                          {line.replace(/^[-•*]\s*/, "")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-textGray">{step.text}</p>
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

export default TrainingProcess;