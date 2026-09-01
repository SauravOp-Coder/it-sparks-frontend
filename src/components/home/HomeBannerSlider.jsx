import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannersByPageApi } from "../../api/bannerApi";
import HeroSection from "./HeroSection";

const HomeBannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const data = await getBannersByPageApi("home");

      const slider = (data.banners || []).filter(
        (banner) => banner.type === "slider"
      );

      setBanners(slider);
    } catch (err) {
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (loading) {
    return (
      <section className="relative h-[100vh] min-h-[700px] flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-slate-800 rounded mx-auto mb-4" />
          <div className="h-12 w-96 bg-slate-800 rounded mx-auto" />
        </div>
      </section>
    );
  }

  if (!banners.length) {
    return <HeroSection />;
  }

  const banner = banners[activeIndex];

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % banners.length);

  const prevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );

  return (
    <section className="relative h-[100vh] min-h-[700px] overflow-hidden">
      {/* Background Image Optimized for LCP */}
      <div className="absolute inset-0">
        <img
          src={banner.image?.url}
          alt={banner.title}
          fetchpriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />

        {/* Hidden Preloader for remaining slides */}
        <div className="hidden">
          {banners.map((item, idx) =>
            idx !== activeIndex && item.image?.url ? (
              <img key={idx} src={item.image.url} alt="" />
            ) : null
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/95 via-[#020817]/70 to-[#020817]/30" />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 h-full flex items-center">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-white px-5 py-2 text-sm font-semibold tracking-wide">
            IT Sparks Technologies
          </span>

          <h1 className="mt-8 text-white text-5xl md:text-7xl font-black leading-[1.15]">
            {banner.title}
          </h1>

          <p className="mt-8 text-xl text-slate-200 leading-9 max-w-2xl">
            {banner.subtitle}
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            {banner.buttonText && (
              <Link
                to={banner.buttonLink}
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-bold hover:scale-105 hover:shadow-2xl transition duration-300"
              >
                {banner.buttonText}
                <ArrowRight className="ml-3" size={20} />
              </Link>
            )}

            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 border border-white/40 text-white rounded-xl font-bold backdrop-blur hover:bg-white hover:text-dark transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Left / Right Arrows & Indicators */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-primary transition"
          >
            <ChevronLeft className="mx-auto" size={28} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-primary transition"
          >
            <ChevronRight className="mx-auto" size={28} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? "w-10 h-3 bg-primary"
                    : "w-3 h-3 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HomeBannerSlider;