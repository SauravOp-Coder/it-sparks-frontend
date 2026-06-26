import ReviewSection from "../../components/common/ReviewSection";

import HomeBannerSlider from "../../components/home/HomeBannerSlider";
import PopularCourses from "../../components/home/PopularCourses";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import TrainingProcess from "../../components/home/TrainingProcess";
import PlacementSupport from "../../components/home/PlacementSupport";
import Recruiters from "../../components/home/Recruiters";

const Home = () => {
  return (
    <main>
      <HomeBannerSlider />
      <PopularCourses />
      <WhyChooseUs />
      <TrainingProcess />
      <PlacementSupport />
      <Recruiters />
      <ReviewSection />
    </main>
  );
};

export default Home;