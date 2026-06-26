import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

      const sliderBanners = (data.banners || []).filter(
        (banner) => banner.type === "slider"
      );

      setBanners(sliderBanners);
    } catch (error) {
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
  }, [banners.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <section className="min-h-[620px] bg-lightBg flex items-center justify-center">
        <p className="text-textGray font-semibold">Loading...</p>
      </section>
    );
  }

  if (banners.length === 0) {
    return <HeroSection />;
  }

  const banner = banners[activeIndex];

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <img
          src={banner.image?.url}
          alt={banner.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/75 to-dark/20" />
      </div>

      <div className="container-custom relative min-h-[680px] flex items-center">
        <div className="max-w-3xl text-white py-20">
          <span className="inline-flex bg-primary/20 text-white border border-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-extrabold">
            IT Sparks Technologies
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mt-6">
            {banner.title}
          </h1>

          <p className="text-white/80 text-lg leading-8 mt-6 max-w-2xl">
            {banner.subtitle}
          </p>

          {banner.buttonText && banner.buttonLink && (
            <Link to={banner.buttonLink} className="primary-btn mt-8">
              {banner.buttonText}
              <ArrowRight size={19} className="ml-2" />
            </Link>
          )}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 backdrop-blur text-white border border-white/20 flex items-center justify-center hover:bg-primary transition"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/15 backdrop-blur text-white border border-white/20 flex items-center justify-center hover:bg-primary transition"
          >
            <ChevronRight size={26} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {banners.map((item, index) => (
              <button
                key={item._id}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-10 bg-primary"
                    : "w-3 bg-white/50"
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