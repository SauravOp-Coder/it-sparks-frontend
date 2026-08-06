import { Link } from "react-router-dom";
import ReviewSection from "../../components/common/ReviewSection";
import Recruiters from "../../components/home/Recruiters";
import { useEffect, useState } from "react";
import { getPlacementsApi } from "../../api/placementApi";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  Target,
} from "lucide-react";
import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";

const support = [
  {
    icon: FileText,
    title: "Resume Preparation",
    description:
      "Guidance to create a professional resume with skills, projects, education, and training details.",
  },
  {
    icon: MessageSquareText,
    title: "Mock Interview Practice",
    description:
      "Practice common technical and HR interview questions to improve confidence.",
  },
  {
    icon: ClipboardCheck,
    title: "Project Explanation Support",
    description:
      "Learn how to explain your projects clearly during technical interviews.",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description:
      "Get guidance on job roles, required skills, preparation strategy, and career direction.",
  },
];

const Placements = () => {
  const [placements, setPlacements] = useState([]);
const [loading, setLoading] = useState(true);

const fetchPlacements = async () => {
  try {
    setLoading(true);
    const data = await getPlacementsApi();
    setPlacements(data.placements || []);
  } catch (error) {
    setPlacements([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchPlacements();
}, []);
  return (
    <main>
      <SEO
        title="Placement Support"
        description="Get placement-focused career guidance, interview preparation, resume support, and project guidance from IT Sparks Technologies."
        keywords="placement support, interview preparation, job guidance, career support, IT placement"
        canonical="/placements"
      />
      <PageBanner
  page="placements"
  fallbackTitle="Placement Support"
  fallbackSubtitle="We help students with resume building, interview preparation, career guidance, and placement-focused training."
/>
      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wide text-sm">
                Placement Support
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-dark mt-4 leading-tight">
                Career preparation support for IT students
              </h1>

              <p className="text-textGray leading-8 mt-6">
                IT Sparks Technologies provides placement-oriented support to
                help students prepare for interviews, improve resumes, explain
                projects, and build confidence for career opportunities.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="primary-btn">
                  Get Placement Guidance{" "}
                  <ArrowRight size={19} className="ml-2" />
                </Link>

                <Link to="/courses" className="secondary-btn">
                  View Courses
                </Link>
              </div>
            </div>

            <div className="bg-dark rounded-[28px] p-7 shadow-soft">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-card p-6">
                  <BriefcaseBusiness className="text-primary mb-4" size={34} />
                  <h3 className="text-3xl font-extrabold text-dark">100%</h3>
                  <p className="text-textGray mt-1">Career Guidance</p>
                </div>

                <div className="bg-white rounded-card p-6">
                  <BadgeCheck className="text-primary mb-4" size={34} />
                  <h3 className="text-3xl font-extrabold text-dark">Live</h3>
                  <p className="text-textGray mt-1">Project Practice</p>
                </div>

                <div className="col-span-2 bg-primary text-white rounded-card p-6">
                  <h3 className="text-2xl font-extrabold">
                    Interview-focused learning
                  </h3>
                  <p className="text-white/80 leading-7 mt-2">
                    Training is designed to help students explain concepts,
                    build projects, and prepare for technical discussions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
  <div className="container-custom">
    <div className="text-center max-w-3xl mx-auto">
      <span className="text-primary font-bold uppercase tracking-wide text-sm">
        Placement Records
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
        Student placement highlights
      </h2>

      <p className="text-textGray leading-7 mt-4">
        Placement records and student success stories are managed from the admin panel.
      </p>
    </div>

    {loading ? (
      <div className="text-center text-textGray mt-12">
        Loading placements...
      </div>
    ) : placements.length === 0 ? (
      <div className="text-center text-textGray mt-12">
        Placement records will be updated soon.
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {placements.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-borderSoft rounded-card shadow-card p-6 card-hover"
          >
            <div className="flex items-center gap-4">
              {item.image?.url ? (
                <img
                  src={item.image.url}
                  alt={item.studentName}
                  className="h-16 w-16 rounded-full object-cover border border-borderSoft"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xl">
                  {item.studentName?.charAt(0)}
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold text-dark">
                  {item.studentName}
                </h3>
                <p className="text-primary font-semibold text-sm">
                  {item.course}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <p className="flex justify-between gap-3">
                <span className="text-textGray">Company</span>
                <span className="font-bold text-dark">{item.company}</span>
              </p>

              <p className="flex justify-between gap-3">
                <span className="text-textGray">Role</span>
                <span className="font-bold text-dark">{item.role}</span>
              </p>

              <p className="flex justify-between gap-3">
                <span className="text-textGray">Package</span>
                <span className="font-bold text-primary">{item.package}</span>
              </p>

              <p className="flex justify-between gap-3">
                <span className="text-textGray">Year</span>
                <span className="font-bold text-dark">{item.year}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-wide text-sm">
              How We Support Students
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
              Placement preparation beyond classroom training
            </h2>

            <p className="text-textGray leading-7 mt-4">
              Students get support in important career preparation areas so they
              can approach interviews with better confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {support.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white border border-borderSoft rounded-card p-7 shadow-card card-hover"
                >
                  <div className="h-[52px] w-[52px] rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="text-primary" size={27} />
                  </div>

                  <h3 className="text-xl font-extrabold text-dark">
                    {item.title}
                  </h3>

                  <p className="text-textGray leading-7 mt-3">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Recruiters />

      <section className="py-16 bg-dark text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold">
                Start your career preparation with the right course
              </h2>
              <p className="text-white/70 leading-7 mt-3">
                Talk to our team and choose a practical training path based on
                your career goal.
              </p>
            </div>

            <Link to="/contact" className="primary-btn">
              Contact Now
            </Link>
          </div>
        </div>
      </section>

      <ReviewSection />
    </main>
  );
};

export default Placements;