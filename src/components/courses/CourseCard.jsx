import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Clock,
  Download,
  MonitorPlay,
  Signal,
} from "lucide-react";
import FreeDemoPopup from "../common/FreeDemoPopup";
import { optimizeCloudinaryImage } from "../../utils/imageOptimizer";

const CourseCard = ({ course }) => {
  const courseSlug = course.slug || course._id || course.id;

  const [demoPopupOpen, setDemoPopupOpen] = useState(false);
  const [brochureLoading, setBrochureLoading] = useState(false);

  const handleBrochureDownload = async () => {
    if (!course?.brochure?.url) return;

    try {
      setBrochureLoading(true);

      const response = await fetch(course.brochure.url);
      const blob = await response.blob();

      const pdfBlob = new Blob([blob], {
        type: "application/pdf",
      });

      const blobUrl = window.URL.createObjectURL(pdfBlob);

      const safeTitle = course.title
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/-+/g, "-")
        .toLowerCase();

      const fileName =
        course.brochure?.originalName &&
        course.brochure.originalName.toLowerCase().endsWith(".pdf")
          ? course.brochure.originalName
          : `${safeTitle}-brochure.pdf`;

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(course.brochure.url, "_blank");
    } finally {
      setBrochureLoading(false);
    }
  };

  return (
    <>
      <div className="group bg-white border border-borderSoft rounded-card shadow-card overflow-hidden card-hover">
        <div className="relative h-[230px] overflow-hidden bg-gradient-to-br from-primary/10 via-lightBg to-white">
          {course.image?.url ? (
            <img
              src={optimizeCloudinaryImage(course.image.url, 600)}
              alt={course.title}
              width="600"
              height="400"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-20 w-20 rounded-[24px] bg-primary text-white flex items-center justify-center">
                <BookOpenCheck size={40} />
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

          {course.isPopular && (
            <span className="absolute top-4 left-4 bg-primary text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-card">
              Popular
            </span>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-black text-dark leading-snug group-hover:text-primary transition">
            {course.title}
          </h3>

          <p className="text-textGray leading-7 mt-3 text-sm line-clamp-3">
            {course.description}
          </p>

          <div className="grid gap-3 mt-5">
            <div className="flex items-center gap-3 text-sm font-semibold text-softDark">
              <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Clock size={17} />
              </span>

              {course.duration || "Duration will be updated"}
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-softDark">
              <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MonitorPlay size={17} />
              </span>

              {course.mode || "Online / Offline"}
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-softDark">
              <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Signal size={17} />
              </span>

              {course.level || "Beginner to Advanced"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {/* Download Brochure */}
            <button
              type="button"
              onClick={handleBrochureDownload}
              disabled={!course?.brochure?.url || brochureLoading}
              className="secondary-btn text-sm px-3 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={17} className="mr-2" />

              {brochureLoading ? "Downloading..." : "Download Brochure"}
            </button>

            {/* Enquiry Popup */}
            <button
              type="button"
              onClick={() => setDemoPopupOpen(true)}
              className="primary-btn text-sm px-3 py-3"
            >
              Enquire
            </button>
          </div>

          <Link
            to={`/courses/${courseSlug}`}
            className="mt-5 inline-flex items-center text-primary font-extrabold hover:text-primaryDark transition"
          >
            View Syllabus

            <ArrowRight
              size={17}
              className="ml-2 transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <FreeDemoPopup
        isOpen={demoPopupOpen}
        onClose={() => setDemoPopupOpen(false)}
      />
    </>
  );
};

export default CourseCard;