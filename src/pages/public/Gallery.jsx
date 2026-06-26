import { Camera, Image, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getGalleryApi } from "../../api/galleryApi";
import PageBanner from "../../components/common/PageBanner";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGalleryApi();
      setGalleryItems(data.galleryItems || []);
    } catch (error) {
      setGalleryItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <main>
      <PageBanner
  page="gallery"
  fallbackTitle="Gallery"
  fallbackSubtitle="Explore classroom sessions, workshops, training activities, and student learning moments."
/>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center text-textGray">Loading gallery...</div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center text-textGray">
              Gallery images will be updated soon.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {galleryItems.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden card-hover"
                >
                  <div className="h-[250px] bg-gradient-to-br from-primary/20 via-lightBg to-white flex items-center justify-center relative overflow-hidden">
                    {item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="relative h-20 w-20 rounded-[24px] bg-primary text-white flex items-center justify-center">
                        {index % 2 === 0 ? <Camera size={38} /> : <Image size={38} />}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="inline-flex text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {item.category}
                    </span>

                    <h3 className="text-xl font-extrabold text-dark mt-4">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-dark text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="text-primary" size={26} />
                <span className="text-primary font-bold uppercase tracking-wide text-sm">
                  Training Environment
                </span>
              </div>

              <h2 className="text-3xl font-extrabold">
                Learn in a practical and focused environment
              </h2>

              <p className="text-white/70 leading-7 mt-3">
                Students get practical exposure through training sessions,
                assignments, workshops, and project-based learning.
              </p>
            </div>

            <a href="/contact" className="primary-btn">
              Join Free Demo
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gallery;