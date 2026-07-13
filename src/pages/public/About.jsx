import { Link } from "react-router-dom";
import ReviewSection from "../../components/common/ReviewSection";
import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";

import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  Target,
  Users,
  Code2,
  Laptop,
  GitBranch,
  Award,
} from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Our Values",
    description:
      "  Innovation through Practical Learning , Industry-First Approach ,Continuous Improvement , Learning by Building , Integrity and Transparency , Excellence in Execution , Student Success Above Everything , Professional Accountability , Collaboration and Teamwork , Lifelong Learning Mindset , Ethical Use of Technology , Quality Without Compromise.",
  },
  {
    icon: BookOpenCheck,
    title: "Plans",
    description:
"Design curriculum based on current industry requirements , Integrate AI and emerging technologies into every learning pathway , Deliver hands-on training through real industry projects , Focus on deployment-ready skills rather than theoretical knowledge , Provide structured internship opportunities , Conduct regular project evaluations and technical assessments."  },
  {
    icon: BriefcaseBusiness,
    title: "Stratergies",
    description:
      "Build professional portfolios through GitHub and live project documentation , Organize mock interviews and Interview Simulation Programs (ISP) , Offer resume optimization and career mentoring , Continuously update course content to match evolving technologies , Encourage collaborative problem-solving and innovation , Support students throughout their placement journey.",
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

const workSteps = [
  {
    icon: GraduationCap,
    title: "Technical Fundamentals",
    description:
      "Students first build strong programming concepts, logical thinking, and technology fundamentals before moving to advanced topics.",
  },
  {
    icon: Code2,
    title: "Assignments & Implementation",
    description:
      "Every module contains practical assignments, coding exercises, and guided implementation sessions for better understanding.",
  },
  {
    icon: Laptop,
    title: "Live Industry Projects",
    description:
      "Students develop real-world projects using modern technologies, frameworks, deployment platforms, and business workflows.",
  },
  {
    icon: GitBranch,
    title: "Industry Mentorship",
    description:
      "Our mentors continuously review projects, provide technical guidance, and teach professional software development practices.",
  },
  {
    icon: Award,
    title: "Career & Placement",
    description:
      "Portfolio development, GitHub optimisation, internship experience, resume building, mock interviews, HR preparation, and placement support.",
  },
];

const About = () => {
  return (
    <main>
      <SEO
        title="About IT Sparks Technologies"
        description="Learn about IT Sparks Technologies, its practical IT training approach, industry-led curriculum, and placement-focused student support."
        keywords="about IT Sparks, practical IT training, placement support, AI training institute"
        canonical="/about"
      />
      <PageBanner
        page="about"
        fallbackTitle="About IT Sparks Technologies"
        fallbackSubtitle="We provide practical IT training, career guidance, and project-based learning for students and professionals."
      />

      {/* Hero */}

      <section className="bg-gradient-to-br from-white via-lightBg to-white py-24">
        <div className="container-custom">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">

            <div>

              <span className="inline-flex bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
                About IT Sparks Technologies
              </span>

              <h1 className="text-4xl lg:text-6xl font-black leading-tight text-dark mt-6">
                Practical IT Training That Builds Real Careers
              </h1>

              <p className="mt-7 text-lg leading-8 text-textGray">
               IT Sparks Technologies is an IT training institute dedicated to building job-ready professionals
through practical learning, real-world implementation, and project-driven education. Apart from
traditional training institutes, we combine modern technologies with live industry projects to prepare
our students for real business challenges. 
 <p className="mt-7 text-lg leading-8 text-textGray">
We offer IT training courses such as Full Stack AI (Generative AI & Agentic AI), Data Analytics with
AI, Data Science with AI, AWS Cloud Computing & DevOps, and ETL Developer. We designed all
our IT training courses around the latest technologies, workflows, and development practices used
by today's leading technology companies.</p>

              </p>

              <p className="mt-5 text-lg leading-8 text-textGray">
                Our every student gets hands-on experience through industry-level projects, our expert mentorship
and guidance, internship opportunities, portfolio development, interview preparation, and structured
placement assistance. We focus on building practical skills that allow our students to confidently
design, develop, deploy, and handle all modern software and AI solutions in their field. 
<p className="mt-5 text-lg leading-8 text-textGray">
As we are experienced developers of AI-driven business tools, our technological framework plays an
important role in shaping our training processes. At IT Sparks Technologies our students not just
learn theoretical concepts but also work on real industry live projects, tackle actual business
challenges, and build their strong professional portfolios that showcase all their skills and talents.
              </p></p>

              <div className="flex flex-wrap gap-5 mt-10">

                <Link to="/courses" className="primary-btn">
                  Explore Courses
                  <ArrowRight className="ml-2" size={18} />
                </Link>

                <Link to="/contact" className="secondary-btn">
                  Contact Us
                </Link>

              </div>

            </div>

            <div>

              <div className="bg-dark rounded-[30px] p-8 shadow-card">

                <div className="bg-white/10 rounded-card p-7 border border-white/10">

                  <Users className="text-primary mb-5" size={42} />

                  <h3 className="text-white text-3xl font-black">
                    Learn. Build. Deploy. Grow.
                  </h3>

                  <p className="text-white/70 leading-8 mt-5">
                   No matter if you’re just starting out as a fresher, graduate, or experienced working professional, IT
Sparks Technologies provides the environment that turns your knowledge into practical expertise
and builds a successful technical career.

                  </p>

                </div>

                <div className="grid grid-cols-2 gap-5 mt-6">

                  {stats.map((item, index) => (

                    <div
                      key={index}
                      className="bg-white rounded-card p-6 text-center"
                    >
                      <h3 className="text-3xl font-black text-primary">
                        {item.number}
                      </h3>

                      <p className="text-textGray mt-2">
                        {item.label}
                      </p>
                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

        {/* Mission & Vision */}

      <section className="section-padding bg-white">

        <div className="container-custom">

          <div className="text-center max-w-3xl mx-auto mb-16">

            <span className="text-primary uppercase font-bold tracking-widest text-sm">
              Our Purpose
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-dark mt-5">
              Mission & Vision
            </h2>

            <p className="text-textGray leading-8 mt-6">
              Everything we do is focused on helping students become confident,
              skilled, and industry-ready professionals.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="bg-gradient-to-br from-white to-lightBg rounded-card border border-borderSoft shadow-card p-10">

              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="text-primary" size={32} />
              </div>

              <h3 className="text-3xl font-black text-dark">
                Our Mission
              </h3>

              <p className="text-textGray leading-8 mt-6">
               Our mission is to bridge the gap between academic theoretical education and current industry
requirements by providing live project based practical technology training. Through real-life
applications, receiving guidance from industry experienced mentors, AI-powered education, and
continuous skills development to achieve career growth, we equip our students to become confident
professionals having skills to design, develop, deploy and support modern technology solutions that
create significant impact for business.
              </p>

            </div>

            <div className="bg-gradient-to-br from-slate-900 to-primary rounded-card shadow-card p-10 text-white">

              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <BadgeCheck className="text-white" size={32} />
              </div>

              <h3 className="text-3xl font-black">
                Our Vision
              </h3>

              <p className="leading-8 mt-6 text-white/90">
               Our goal is to build a future where tech experts emerge from creativity, hands-on experience from
practical implementation, industry collaboration and teamwork with industry leaders. We aim to
become a globally recognised AI-focused training institute that teaches individuals to develop
intelligent solutions, solve real business problems, and lead digital transformation through
continuous learning, innovation, and practical application.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Highlights */}

      <section className="section-padding bg-white">

        <div className="container-custom">

          <div className="text-center max-w-3xl mx-auto">

            <span className="text-primary font-bold uppercase tracking-widest text-sm">
              Why Students Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-dark mt-5">
              Our Strategy
            </h2>

            <p className="text-textGray leading-8 mt-6">
              Our strategy is built around experiential learning rather than conventional teaching. We combine
modern technologies, real-world industry projects, AI-driven innovation, structured mentorship from
industry experience, practical internship opportunities, and career-oriented guidance to create
professionals who can immediately contribute value to employers. All of our training courses are
regularly updated to align with new technologies, current industry standards, and the evolving needs
of the job market.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {highlights.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="bg-white border border-borderSoft rounded-card p-8 shadow-card hover:-translate-y-2 duration-300"
                >

                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon size={30} className="text-primary" />
                  </div>

                  <h3 className="text-2xl font-black text-dark">
                    {item.title}
                  </h3>

                  <p className="leading-8 text-textGray mt-5">
                    {item.description}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* HOW WE WORK */}

      <section className="py-24 bg-lightBg">

        <div className="container-custom">

          
                    {/* Learning Beyond Classroom */}

          <div className="mt-20 rounded-[32px] overflow-hidden bg-gradient-to-r from-primary via-blue-700 to-slate-900 shadow-card">

            <div className="grid lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">

              <div>

                <span className="inline-flex bg-white/15 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Continuous Learning
                </span>

                <h2 className="text-4xl font-black text-white mt-6 leading-tight">
                  How We Work?
                </h2>

                <p className="text-white/85 leading-8 mt-6">
                 Our training method is based on a step-by-step implementation model that replicates the workflow of
today's leading technology companies.

                </p>

                <p className="text-white/85 leading-8 mt-6">
                 Initially, all students focus on building strong technical fundamentals. Then, they gradually move on
to practical assignments and guided implementation. Finally, as their skills develop and improve,
students start working on real industry live projects where they apply concepts to solve business
challenges using the most recent tools, frameworks, and deployment practices
                </p>

              </div>

              <div className="space-y-5">

                <div className="bg-white/10 backdrop-blur rounded-card p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white">
                    
                  </h4>

                  <p className="text-white/80 mt-3 leading-7">
                   Also, during the entire duration of the program, students are continuously mentored by professionals
from the industry. These mentors continuously review their project works, give them technical
guidance, and also share with them the best practices being followed in professional environments.
Such continuous feedback not only helps students to enhance their technical skills but also develops
their analytical thinking, communication, and problem-solving skills.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-card p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white">
                  
                  </h4>

                  <p className="text-white/80 mt-3 leading-7">
                   After the completion of the projects, students get involved in gaining internship experience. They
also work on portfolio development, GitHub optimisation, resume building and undergo interview
simulation sessions so as to equip themselves for the recruitment procedures. Our placement
support team still directs the students through their technical interviews, HR preparation, career
counseling, and job openings until they get ready to confidently begin their professional careers.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-card p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white">
                   
                  </h4>

                  <p className="text-white/80 mt-3 leading-7">
                  Here, at IT Sparks Technologies, education is not just theoretical learning. It is a continuous process
of building, creating, deploying, and growing, because real careers are built through real experience.
                  </p>
                </div>

              </div>

            </div>

            <div className="border-t border-white/10 px-10 lg:px-16 py-8">

              <blockquote className="text-center text-white text-xl md:text-2xl font-bold italic leading-10">
                "At IT Sparks Technologies, education is not just theoretical
                learning. It is a continuous journey of learning, building,
                creating, deploying and growing because real careers are built
                through real experience."
              </blockquote>

            </div>

          </div>

        </div>

      </section>

    

      <ReviewSection />

    </main>
  );
};

export default About;