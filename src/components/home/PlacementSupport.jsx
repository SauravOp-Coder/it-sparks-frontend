import { ArrowRight, FileCheck2, Mic, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHomeContentApi } from "../../api/homeApi";

const defaultSupportItems = [
  {
    title: "Resume Building",
    text: "We help students prepare clean and job-focused resumes.",
  },
  {
    title: "Mock Interviews",
    text: "Practice technical and HR interview questions with guidance.",
  },
  {
    title: "Career Guidance",
    text: "Get direction for choosing the right career path in IT.",
  },
];

const icons = [FileCheck2, Mic, UsersRound];

const getTextLines = (text = "") =>
  text
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const PlacementSupport = () => {
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

  const supportItems =
    home?.placementSupportCards?.length > 0
      ? home.placementSupportCards
      : defaultSupportItems;

  const title =
    home?.placementTitle || "Placement-focused training and career support";

  const subtitle =
    home?.placementSubtitle ||
    "Our training approach focuses on skills, project practice, resume preparation, interview confidence, and career guidance.";

  return (
    <section className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Placement Support
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark md:text-4xl">
              {title}
            </h2>

            <p className="mt-5 text-base leading-8 text-textGray">{subtitle}</p>

            <Link to="/placements" className="primary-btn mt-7">
              View Placement Support <ArrowRight size={19} className="ml-2" />
            </Link>
          </div>

          <div className="grid gap-6">
            {supportItems.map((item, index) => {
              const Icon = icons[index % icons.length];
              const lines = getTextLines(item.text);

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="flex gap-5 rounded-card bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-dark">
                      {item.title}
                    </h3>

                    <div className="mt-3 space-y-2">
                      {lines.length > 0 ? (
                        lines.map((line, lineIndex) => (
                          <p key={`${item.title}-${lineIndex}`} className="text-sm leading-7 text-textGray">
                            {line.replace(/^[-•*]\s*/, "")}
                          </p>
                        ))
                      ) : (
                        <p className="text-sm leading-7 text-textGray">{item.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementSupport;