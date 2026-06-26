import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getReviewsApi } from "../../api/reviewApi";
import { getSettingsApi } from "../../api/settingApi";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(null);

 const fetchReviews = async () => {
  try {
    const data = await getReviewsApi();
    setReviews(data.reviews || []);
  } catch (error) {
    setReviews([]);
  }
};

const fetchSettings = async () => {
  try {
    const data = await getSettingsApi();
    setSettings(data.settings);
  } catch (error) {
    setSettings(null);
  }
};

useEffect(() => {
  fetchReviews();
  fetchSettings();
}, []);


  if (reviews.length === 0) return null;

  return (
    <section className="section-padding bg-lightBg">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-wide text-sm">
              Student Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
              What students say about IT Sparks Technologies
            </h2>
            <p className="text-textGray leading-7 mt-4">
              Selected student feedback managed from the admin panel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
          {settings?.googleReviewReadLink && (
  <a
    href={settings.googleReviewReadLink}
    target="_blank"
    rel="noreferrer"
    className="secondary-btn"
  >
    Read Google Reviews
  </a>
)}

{settings?.googleReviewWriteLink && (
  <a
    href={settings.googleReviewWriteLink}
    target="_blank"
    rel="noreferrer"
    className="primary-btn"
  >
    Write a Google Review
  </a>
)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {reviews.slice(0, 6).map((item) => (
            <div key={item._id} className="bg-white border border-borderSoft rounded-card p-7 shadow-card card-hover">
              <div className="flex items-center gap-4 mb-5">
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.studentName}
                    className="h-14 w-14 rounded-full object-cover border border-borderSoft"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold">
                    {item.studentName?.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-dark">{item.studentName}</h3>
                  <p className="text-sm text-primary font-semibold">{item.course}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-5">
                {[...Array(Number(item.rating || 5))].map((_, index) => (
                  <Star key={index} size={18} className="text-primary fill-primary" />
                ))}
              </div>

              <p className="text-textGray leading-8">“{item.review}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;