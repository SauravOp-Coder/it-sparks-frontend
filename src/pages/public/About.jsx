import {
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  GitBranch,
  GraduationCap,
  Target,
} from "lucide-react";

import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";

const values = [
  "Innovation through Practical Learning",
  "Industry-First Approach",
  "Continuous Improvement",
  "Learning by Building",
  "Integrity and Transparency",
  "Excellence in Execution",
  "Student Success Above Everything",
  "Professional Accountability",
  "Collaboration and Teamwork",
  "Lifelong Learning Mindset",
  "Ethical Use of Technology",
  "Quality Without Compromise",
];

const actionPlanLeft = [
  "Design curriculum based on current industry requirements",
  "Integrate AI and emerging technologies into every learning pathway",
  "Deliver hands-on training through real industry projects",
  "Focus on deployment-ready skills rather than theoretical knowledge",
  "Provide structured internship opportunities",
  "Conduct regular project evaluations and technical assessments",
];

const actionPlanRight = [
  "Build professional portfolios through GitHub and live project documentation",
  "Organize mock interviews and Interview Simulation Programs (ISP)",
  "Offer resume optimization and career mentoring",
  "Continuously update course content to match evolving technologies",
  "Encourage collaborative problem-solving and innovation",
  "Support students throughout their placement journey",
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

      {/* BANNER UNCHANGED */}
      <PageBanner
        page="about"
        fallbackTitle="About IT Sparks Technologies"
        fallbackSubtitle="We provide practical IT training, career guidance, and project-based learning for students and professionals."
      />

      {/* ABOUT IT SPARKS TECHNOLOGIES */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="text-primary" size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-dark mt-6">
              About IT Sparks Technologies
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-lightBg border border-borderSoft rounded-card p-8 md:p-10">
              <div className="space-y-6 text-textGray leading-8">
                <p>
                  IT Sparks Technologies is an IT training institute dedicated
                  to building job-ready professionals through practical
                  learning, real-world implementation, and project-driven
                  education. Apart from traditional training institutes, we
                  combine modern technologies with live industry projects to
                  prepare our students for real business challenges.
                </p>

                <p>
                  We offer IT training courses such as Full Stack AI (Generative
                  AI & Agentic AI), Data Analytics with AI, Data Science with
                  AI, AWS Cloud Computing & DevOps, and ETL Developer. We
                  designed all our IT training courses around the latest
                  technologies, workflows, and development practices used by
                  today's leading technology companies.
                </p>

                <p>
                  Our every student gets hands-on experience through
                  industry-level projects, our expert mentorship and guidance,
                  internship opportunities, portfolio development, interview
                  preparation, and structured placement assistance. We focus on
                  building practical skills that allow our students to
                  confidently design, develop, deploy, and handle all modern
                  software and AI solutions in their field.
                </p>
              </div>
            </div>

            <div className="bg-white border border-borderSoft rounded-card p-8 md:p-10 shadow-card">
              <div className="space-y-6 text-textGray leading-8">
                <p>
                  As we are experienced developers of AI-driven business tools,
                  our technological framework plays an important role in
                  shaping our training processes. At IT Sparks Technologies our
                  students not just learn theoretical concepts but also work on
                  real industry live projects, tackle actual business
                  challenges, and build their strong professional portfolios
                  that showcase all their skills and talents.
                </p>

                <p>
                  No matter if you’re just starting out as a fresher, graduate,
                  or experienced working professional, IT Sparks Technologies
                  provides the environment that turns your knowledge into
                  practical expertise and builds a successful technical career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="py-20 md:py-24 bg-lightBg">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-dark rounded-card p-8 md:p-10 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <BadgeCheck className="text-white" size={30} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white mt-6">
                Our Vision
              </h2>

              <p className="text-white/80 leading-8 mt-6">
                Our goal is to build a future where tech experts emerge from
                creativity, hands-on experience from practical implementation,
                industry collaboration and teamwork with industry leaders. We
                aim to become a globally recognised AI-focused training
                institute that teaches individuals to develop intelligent
                solutions, solve real business problems, and lead digital
                transformation through continuous learning, innovation, and
                practical application.
              </p>
            </div>

            <div className="bg-white border border-borderSoft rounded-card p-8 md:p-10 shadow-card h-full">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Target className="text-primary" size={30} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-dark mt-6">
                Our Mission
              </h2>

              <p className="text-textGray leading-8 mt-6">
                Our mission is to bridge the gap between academic theoretical
                education and current industry requirements by providing live
                project based practical technology training. Through real-life
                applications, receiving guidance from industry experienced
                mentors, AI-powered education, and continuous skills
                development to achieve career growth, we equip our students to
                become confident professionals having skills to design,
                develop, deploy and support modern technology solutions that
                create significant impact for business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STRATEGY */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom">
          <div className="bg-lightBg border border-borderSoft rounded-card p-8 md:p-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <GitBranch className="text-primary" size={30} />
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-dark mt-6">
                  Our Strategy
                </h2>
              </div>

              <p className="text-textGray leading-8">
                Our strategy is built around experiential learning rather than
                conventional teaching. We combine modern technologies,
                real-world industry projects, AI-driven innovation, structured
                mentorship from industry experience, practical internship
                opportunities, and career-oriented guidance to create
                professionals who can immediately contribute value to
                employers. All of our training courses are regularly updated
                to align with new technologies, current industry standards, and
                the evolving needs of the job market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-20 md:py-24 bg-lightBg">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="text-primary" size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-dark mt-6">
              Our Values
            </h2>
          </div>

          <div className="bg-white border border-borderSoft rounded-card shadow-card p-8 md:p-10">
            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-5">
              {values.map((value, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-textGray leading-7"
                >
                  <CheckCircle2
                    size={20}
                    className="text-primary shrink-0 mt-1"
                  />

                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STRATEGY & ACTION PLAN */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpenCheck className="text-primary" size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-dark mt-6">
              Strategy & Action Plan
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-lightBg border border-borderSoft rounded-card p-8 md:p-10">
              <ul className="space-y-5">
                {actionPlanLeft.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-textGray leading-7"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-primary shrink-0 mt-1"
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-lightBg border border-borderSoft rounded-card p-8 md:p-10">
              <ul className="space-y-5">
                {actionPlanRight.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-textGray leading-7"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-primary shrink-0 mt-1"
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK? */}
      <section className="py-20 md:py-24 bg-dark">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary flex items-center justify-center">
              <GraduationCap className="text-white" size={30} />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mt-6">
              How We Work?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white/5 border border-white/10 rounded-card p-8 md:p-10">
              <div className="space-y-7">
                <p className="text-white/80 leading-8">
                  Our training method is based on a step-by-step implementation
                  model that replicates the workflow of today's leading
                  technology companies.
                </p>

                <p className="text-white/80 leading-8">
                  Initially, all students focus on building strong technical
                  fundamentals. Then, they gradually move on to practical
                  assignments and guided implementation. Finally, as their
                  skills develop and improve, students start working on real
                  industry live projects where they apply concepts to solve
                  business challenges using the most recent tools, frameworks,
                  and deployment practices.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-card p-8 md:p-10">
              <div className="space-y-7">
                <p className="text-white/80 leading-8">
                  Also, during the entire duration of the program, students are
                  continuously mentored by professionals from the industry.
                  These mentors continuously review their project works, give
                  them technical guidance, and also share with them the best
                  practices being followed in professional environments. Such
                  continuous feedback not only helps students to enhance their
                  technical skills but also develops their analytical thinking,
                  communication, and problem-solving skills.
                </p>

                <p className="text-white/80 leading-8">
                  After the completion of the projects, students get involved
                  in gaining internship experience. They also work on portfolio
                  development, GitHub optimisation, resume building and undergo
                  interview simulation sessions so as to equip themselves for
                  the recruitment procedures. Our placement support team still
                  directs the students through their technical interviews, HR
                  preparation, career counseling, and job openings until they
                  get ready to confidently begin their professional careers.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-primary rounded-card p-8 md:p-10">
            <p className="text-white text-center font-bold text-lg leading-8 max-w-5xl mx-auto">
              Here, at IT Sparks Technologies, education is not just
              theoretical learning. It is a continuous process of building,
              creating, deploying, and growing, because real careers are built
              through real experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;