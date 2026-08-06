import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getHomeContentApi } from "../../api/homeApi";

const HeroSection = () => {
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

  const heroBadge = home?.heroBadge || "IT Training Institute";
  const heroHeading =
    home?.heroHeading || "Build Your Career With Practical IT Training";
  const heroSubheading =
    home?.heroSubheading ||
    "Learn industry-focused skills with practical training, real projects, expert guidance, and placement support.";
  const primaryButtonText = home?.primaryButtonText || "Explore Courses";
  const primaryButtonLink = home?.primaryButtonLink || "/courses";
  const secondaryButtonText = home?.secondaryButtonText || "Book Free Demo";
  const secondaryButtonLink = home?.secondaryButtonLink || "/contact";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-lightBg to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,230,0.14),transparent_35%)]" />

      <div className="container-custom relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-full">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {heroBadge}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-dark leading-tight mt-6">
              {heroHeading}
            </h1>

            <p className="text-textGray text-lg leading-8 mt-6 max-w-2xl">
              {heroSubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to={primaryButtonLink} className="primary-btn">
                {primaryButtonText} <ArrowRight size={19} className="ml-2" />
              </Link>

              <Link to={secondaryButtonLink} className="secondary-btn">
                <PlayCircle size={19} className="mr-2" />
                {secondaryButtonText}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
              <div className="bg-white rounded-card p-5 shadow-card">
                <h3 className="text-2xl font-extrabold text-dark">20+</h3>
                <p className="text-sm text-textGray mt-1">Courses</p>
              </div>

              <div className="bg-white rounded-card p-5 shadow-card">
                <h3 className="text-2xl font-extrabold text-dark">500+</h3>
                <p className="text-sm text-textGray mt-1">Students</p>
              </div>

              <div className="bg-white rounded-card p-5 shadow-card">
                <h3 className="text-2xl font-extrabold text-dark">100%</h3>
                <p className="text-sm text-textGray mt-1">Practical</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-[40px] blur-2xl" />

            <div className="relative bg-dark rounded-[34px] p-5 shadow-soft overflow-hidden">
              {home?.heroImage?.url ? (
                <img
                  src={home.heroImage.url}
                  alt="IT Sparks Technologies"
                  className="h-[460px] w-full object-cover rounded-[26px]"
                />
              ) : (
                <div className="h-[460px] rounded-[26px] bg-gradient-to-br from-primary via-deepBlue to-dark flex items-center justify-center text-white text-center p-8">
                  <div>
                    <h3 className="text-4xl font-extrabold">
                      IT Sparks Technologies
                    </h3>
                    <p className="text-white/75 mt-4 leading-7">
                      Practical training. Real projects. Career growth.
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur rounded-card p-5 shadow-card">
                <p className="text-sm font-bold text-primary">Live Training</p>
                <h3 className="text-xl font-extrabold text-dark mt-1">
                  Project-based learning approach
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;