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
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-wide text-sm">
              Placement Support
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
              {title}
            </h2>

            <p className="text-textGray leading-8 mt-5">{subtitle}</p>

            <Link to="/placements" className="primary-btn mt-7">
              View Placement Support <ArrowRight size={19} className="ml-2" />
            </Link>
          </div>

          <div className="grid gap-5">
            {supportItems.map((item, index) => {
              const Icon = icons[index % icons.length];

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="bg-white border border-borderSoft rounded-card p-6 shadow-card card-hover flex gap-5"
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-dark">
                      {item.title}
                    </h3>
                    <p className="text-textGray leading-7 mt-2">{item.text}</p>
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