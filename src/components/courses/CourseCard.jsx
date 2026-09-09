import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Clock,
  MonitorPlay,
  Signal,
} from "lucide-react";

const CourseCard = ({ course }) => {
  const courseSlug = course.slug || course._id || course.id;

   const validateBrochureForm = (data) => {
      const errors = {};
  
      if (!data.name.trim()) {
        errors.name = "Name is required.";
      } else if (!nameRegex.test(data.name.trim())) {
        errors.name = "Enter a valid name (letters only, 2-50 characters).";
      }
  
      if (!data.mobile.trim()) {
        errors.mobile = "Mobile number is required.";
      } else if (!mobileRegex.test(data.mobile.trim())) {
        errors.mobile = "Enter a valid 10-digit mobile number.";
      }
  
      if (data.email.trim() && !emailRegex.test(data.email.trim())) {
        errors.email = "Enter a valid email address.";
      }
  
      return errors;
    };
  
   const getPdfFileName = () => {
    const safeTitle = course.title
      .replace(/[^a-z0-9]/gi, "-")
      .replace(/-+/g, "-")
      .toLowerCase();
  
    const originalName = course.brochure?.originalName;
  
    if (originalName && originalName.toLowerCase().endsWith(".pdf")) {
      return originalName;
    }
  
    return `${safeTitle}-brochure.pdf`;
  };
  
  const downloadBrochure = async () => {
    if (!course?.brochure?.url) return;
  
    try {
      const response = await fetch(course.brochure.url);
      const blob = await response.blob();
  
      const pdfBlob = new Blob([blob], {
        type: "application/pdf",
      });
  
      const blobUrl = window.URL.createObjectURL(pdfBlob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = getPdfFileName();
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(course.brochure.url, "_blank");
    }
  };
    const handleBrochureSubmit = async (e) => {
      e.preventDefault();
  
      const errors = validateBrochureForm(enquiryData);
      if (Object.keys(errors).length > 0) {
        setBrochureFieldErrors(errors);
        return;
      }
  
      try {
        setBrochureLoading(true);
        setBrochureError("");
        setBrochureFieldErrors({});
  
        await createEnquiryApi({
          name: enquiryData.name,
          fullName: enquiryData.name,
  
          mobile: enquiryData.mobile,
          number: enquiryData.mobile,
          phone: enquiryData.mobile,
          mobileNumber: enquiryData.mobile,
  
          email: enquiryData.email,
  
          interestedCourse: course.title,
          course: course.title,
          courseName: course.title,
  
          enquiryType: "Brochure Download",
          message:
            enquiryData.message ||
            `Student downloaded brochure for ${course.title}`,
        });
  
        setShowBrochureForm(false);
        setEnquiryData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
  
        downloadBrochure();
  
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          navigate("/thank-you");
        }, 500);
      } catch (error) {
        setBrochureError(
          error.response?.data?.message ||
            "Failed to submit enquiry. Please try again."
        );
      } finally {
        setBrochureLoading(false);
      }
    };
  

  return (
    <div className="group bg-white border border-borderSoft rounded-card shadow-card overflow-hidden card-hover">
      <div className="relative h-[230px] overflow-hidden bg-gradient-to-br from-primary/10 via-lightBg to-white">
        {course.image?.url ? (
          <img
            src={course.image.url}
            alt={course.title}
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
           <button
                type="submit"
                disabled={brochureLoading}
                className="primary-btn"
              >
                {brochureLoading ? "Submitting..." : "Submit & Download"}
              </button>

          <Link to="/contact" className="primary-btn text-sm px-3 py-3">
            Enquire
          </Link>
        </div>

        <Link
          to={`/courses/${courseSlug}`}
          className="mt-5 inline-flex items-center text-primary font-extrabold hover:text-primaryDark transition"
        >
          View Syllabus
          <ArrowRight size={17} className="ml-2 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;