import { useEffect, useState } from "react";
import { getHomeContentApi } from "../../api/homeApi";

const defaultRecruiters = [
  "TCS",
  "Infosys",
  "Wipro",
  "Capgemini",
  "Accenture",
  "Cognizant",
  "Tech Mahindra",
  "HCL",
];

const Recruiters = () => {
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

  const recruiters =
    home?.recruiters?.length > 0 ? home.recruiters : defaultRecruiters;

  const title = home?.recruiterTitle || "Companies our students prepare for";

  const subtitle =
    home?.recruiterSubtitle ||
    "We help students build skills required for interviews, internships, and job opportunities in IT companies.";

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wide text-sm">
            Recruiters
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
            {title}
          </h2>

          <p className="text-textGray leading-7 mt-4">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {recruiters.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="bg-lightBg border border-borderSoft rounded-card p-6 text-center font-extrabold text-dark card-hover"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recruiters;