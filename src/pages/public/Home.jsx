import SEO from "../../components/common/SEO";
import ReviewSection from "../../components/common/ReviewSection";

import HomeBannerSlider from "../../components/home/HomeBannerSlider";
import PopularCourses from "../../components/home/PopularCourses";
import HomeContentBuilder from "../../components/home/HomeContentBuilder";

const Home = () => {
  return (
    <main>

      <SEO
        title="IT Sparks Technologies"
        description="IT Sparks Technologies provides practical IT training, live projects, internships, placement assistance, and career-focused courses."
        keywords="IT training institute Pune, Full Stack Development, AI Course, Data Analytics, Cloud Computing, Placement Assistance"
        canonical="/"
      />

      {/* Hero Banner */}
      <HomeBannerSlider />

      {/* Popular Courses */}
      <PopularCourses />

      {/* Dynamic Home Content */}
      <HomeContentBuilder />

      {/* Student Reviews */}
      <ReviewSection />

    </main>
  );
};

export default Home;