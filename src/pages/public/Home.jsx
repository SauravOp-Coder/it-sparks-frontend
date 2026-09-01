import React, { useEffect, Suspense, lazy } from "react";
import SEO from "../../components/common/SEO";
import HomeBannerSlider from "../../components/home/HomeBannerSlider";

// Lazy load below-the-fold components
const PopularCourses = lazy(() => import("../../components/home/PopularCourses"));
const HomeContentBuilder = lazy(() => import("../../components/home/HomeContentBuilder"));
const ReviewSection = lazy(() => import("../../components/common/ReviewSection"));

const Home = () => {
  useEffect(() => {
    // Prefetch secondary route bundles in the background after home mounts
    const prefetchRoutes = () => {
      import("../Courses");
      import("../About");
      import("../Contact");
    };

    const timer = setTimeout(prefetchRoutes, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <SEO
        title="IT Sparks Technologies"
        description="IT Sparks Technologies provides practical IT training, live projects, internships, placement assistance, and career-focused courses."
        keywords="IT training institute Pune, Full Stack Development, AI Course, Data Analytics, Cloud Computing, Placement Assistance"
        canonical="/"
      />

      {/* Hero Banner loaded instantly */}
      <HomeBannerSlider />

      {/* Below-the-fold components loaded lazily */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <PopularCourses />
        <HomeContentBuilder />
        <ReviewSection />
      </Suspense>
    </main>
  );
};

export default Home;