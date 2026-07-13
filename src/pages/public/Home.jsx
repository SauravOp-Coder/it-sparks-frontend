import ReviewSection from "../../components/common/ReviewSection";
import SEO from "../../components/common/SEO";

import HomeBannerSlider from "../../components/home/HomeBannerSlider";
import PopularCourses from "../../components/home/PopularCourses";
import HomeContentBuilder from "../../components/home/HomeContentBuilder";

const Home = () => {
  return (
    <main>
      <SEO
        title="IT Sparks Technologies"
        description="Practical IT training, AI courses, software development programs, placement support, and career-focused learning for students and professionals."
        keywords="IT training institute, AI courses, software development training, practical IT learning, placement support"
        canonical="/"
      />
      <HomeBannerSlider />
      <PopularCourses />
      <HomeContentBuilder />
      <ReviewSection />
    </main>
  );
};

export default Home;