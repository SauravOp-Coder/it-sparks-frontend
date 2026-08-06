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
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Recruiters
          </span>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 text-textGray">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recruiters.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-card bg-lightBg p-6 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Hiring Partner
              </div>
              <h3 className="text-lg font-extrabold text-dark">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recruiters;