import { useEffect, useState } from "react";
import { getBannersByPageApi } from "../../api/bannerApi";

const PageBanner = ({ page, fallbackTitle, fallbackSubtitle }) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const data = await getBannersByPageApi(page);

      const pageBanner = (data.banners || []).find(
        (item) => item.type === "page"
      );

      setBanner(pageBanner || null);
    } catch (error) {
      setBanner(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [page]);

  if (loading) {
    return (
      <section className="bg-lightBg py-20">
        <div className="container-custom text-center">
          <p className="text-textGray">Loading...</p>
        </div>
      </section>
    );
  }

  if (!banner) {
    return (
      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom text-center max-w-3xl">
          <span className="text-primary font-bold uppercase tracking-wide text-sm">
            IT Sparks Technologies
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mt-4">
            {fallbackTitle}
          </h1>

          {fallbackSubtitle && (
            <p className="text-textGray leading-8 mt-5">
              {fallbackSubtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[360px] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <img
          src={banner.image?.url}
          alt={banner.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/65 to-dark/20" />
      </div>

      <div className="container-custom relative min-h-[360px] flex items-center">
        <div className="max-w-3xl py-20 text-white">
          <span className="inline-flex text-sm font-extrabold bg-white/10 border border-white/20 backdrop-blur px-4 py-2 rounded-full">
            IT Sparks Technologies
          </span>

          <h1 className="text-4xl md:text-5xl font-black leading-tight mt-5">
            {banner.title || fallbackTitle}
          </h1>

          <p className="text-white/80 leading-8 mt-5 text-lg">
            {banner.subtitle || fallbackSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;