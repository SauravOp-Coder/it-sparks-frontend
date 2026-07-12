import ReviewSection from "../../components/common/ReviewSection";

import HomeBannerSlider from "../../components/home/HomeBannerSlider";
import PopularCourses from "../../components/home/PopularCourses";
import HomeContentBuilder from "../../components/home/HomeContentBuilder";

const Home = () => {
  return (
    <main>
      <HomeBannerSlider />
      <PopularCourses />
      <HomeContentBuilder />
      <ReviewSection />
    </main>
  );
};

export default Home;