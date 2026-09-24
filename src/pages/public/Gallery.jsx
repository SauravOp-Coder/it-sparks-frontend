import { Camera, Image, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getGalleryApi } from "../../api/galleryApi";
import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";
import FreeDemoPopup from "../../components/common/FreeDemoPopup";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [demoPopupOpen, setDemoPopupOpen] = useState(false);

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
      <SEO
        title="Training Gallery"
        description="Explore IT Sparks Technologies training sessions, workshops, and practical learning moments through our gallery."
        keywords="training gallery, IT workshops, practical learning, student projects"
        canonical="/gallery"
      />
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

     
       <FreeDemoPopup
        isOpen={demoPopupOpen}
        onClose={() => setDemoPopupOpen(false)}
      />
    </main>
  );
};

export default Gallery;