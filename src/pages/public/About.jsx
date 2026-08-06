import { Link } from "react-router-dom";
import ReviewSection from "../../components/common/ReviewSection";
import PageBanner from "../../components/common/PageBanner";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  Target,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Student-focused Training",
    description:
      "We guide students from basic concepts to practical implementation with a clear learning path.",
  },
  {
    icon: BookOpenCheck,
    title: "Practical Curriculum",
    description:
      "Our courses include assignments, project work, real examples, and interview-focused preparation.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career Support",
    description:
      "Students receive resume guidance, interview preparation, and placement-oriented support.",
  },
];

const stats = [
  {
    number: "500+",
    label: "Students Trained",
  },
  {
    number: "20+",
    label: "Courses",
  },
  {
    number: "100%",
    label: "Practical Focus",
  },
  {
    number: "Online + Offline",
    label: "Training Mode",
  },
];

const About = () => {
  return (
    <main>
      <PageBanner
  page="about"
  fallbackTitle="About IT Sparks Technologies"
  fallbackSubtitle="We provide practical IT training, career guidance, and project-based learning for students and professionals."
/>
      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wide text-sm">
                About IT Sparks Technologies
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-dark mt-4 leading-tight">
                Practical IT training for students who want to build a strong
                career
              </h1>

              <p className="text-textGray leading-8 mt-6">
                IT Sparks Technologies is an IT training institute focused on
                helping students and professionals learn industry-relevant
                skills through practical sessions, live-style projects, and
                career-oriented guidance.
              </p>

              <p className="text-textGray leading-8 mt-4">
                Our goal is to make technical learning simple, structured, and
                useful for real career growth. We focus on concept clarity,
                project practice, confidence building, and interview readiness.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/courses" className="primary-btn">
                  Explore Courses <ArrowRight size={19} className="ml-2" />
                </Link>

                <Link to="/contact" className="secondary-btn">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-dark rounded-[28px] p-7 shadow-soft">
                <div className="bg-white/10 border border-white/10 rounded-card p-6 mb-5">
                  <Users className="text-primary mb-4" size={34} />
                  <h3 className="text-white text-2xl font-extrabold">
                    Learn. Practice. Build. Grow.
                  </h3>
                  <p className="text-white/70 leading-7 mt-3">
                    A training environment designed for practical skill
                    development and career confidence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-card p-5 text-center"
                    >
                      <h4 className="text-xl font-extrabold text-primary">
                        {item.number}
                      </h4>
                      <p className="text-sm text-textGray mt-1">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 hidden sm:block bg-white border border-borderSoft shadow-soft rounded-card px-5 py-4">
                <p className="text-sm text-textGray">Focused On</p>
                <p className="font-extrabold text-dark">
                  Job-ready IT Skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-wide text-sm">
              What Makes Us Different
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
              Training designed with practical career outcomes
            </h2>

            <p className="text-textGray leading-7 mt-4">
              We combine technical learning, project practice, and career
              preparation to create a complete learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {highlights.map((item, index) => {
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

      <section className="section-padding bg-lightBg">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white border border-borderSoft rounded-card shadow-card p-8">
              <Target className="text-primary mb-5" size={38} />
              <h2 className="text-3xl font-extrabold text-dark">
                Our Mission
              </h2>
              <p className="text-textGray leading-8 mt-4">
                To provide practical and affordable IT training that helps
                students build confidence, understand real-world technologies,
                and prepare for career opportunities in the technology industry.
              </p>
            </div>

            <div className="bg-dark text-white rounded-card shadow-soft p-8">
              <BadgeCheck className="text-primary mb-5" size={38} />
              <h2 className="text-3xl font-extrabold">Our Vision</h2>
              <p className="text-white/70 leading-8 mt-4">
                To become a trusted IT training institute known for practical
                education, student success, and career-focused learning
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />
    </main>
  );
};

export default About;