import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import { getCourseByIdApi } from "../../api/courseApi";
import { createEnquiryApi } from "../../api/enquiryApi";
import SEO from "../../components/common/SEO";

const textCaseClass = {
  normal: "",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const [brochureLoading, setBrochureLoading] = useState(false);
  const [brochureError, setBrochureError] = useState("");

  const [enquiryData, setEnquiryData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await getCourseByIdApi(id);
      setCourse(data.course);
    } catch (error) {
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;

    setEnquiryData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!enquiryData.name || !enquiryData.mobile) {
      setBrochureError("Name and mobile number are required");
      return;
    }

    try {
      setBrochureLoading(true);
      setBrochureError("");

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

  const renderSection = (section, index) => {
    const caseClass = textCaseClass[section.textCase] || "";

    if (section.type === "heading") {
      return (
        <div key={section._id || index} className="mt-8">
          <h2 className={`text-3xl font-black text-dark ${caseClass}`}>
            {section.title || section.content}
          </h2>
        </div>
      );
    }

    if (section.type === "paragraph") {
      return (
        <div key={section._id || index} className="mt-6">
          {section.title && (
            <h3 className={`text-2xl font-extrabold text-dark ${caseClass}`}>
              {section.title}
            </h3>
          )}

          <p className={`text-textGray leading-8 mt-3 whitespace-pre-line ${caseClass}`}>
            {section.content}
          </p>
        </div>
      );
    }

    if (section.type === "bulletList") {
      return (
        <div key={section._id || index} className="mt-7">
          {section.title && (
            <h3 className={`text-2xl font-extrabold text-dark ${caseClass}`}>
              {section.title}
            </h3>
          )}

          <ul className="grid gap-3 mt-4">
            {(section.items || []).map((item, itemIndex) => (
              <li
                key={itemIndex}
                className={`flex gap-3 text-textGray leading-7 ${caseClass}`}
              >
                <CheckCircle2 size={20} className="text-primary shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (section.type === "numberedList") {
      return (
        <div key={section._id || index} className="mt-7">
          {section.title && (
            <h3 className={`text-2xl font-extrabold text-dark ${caseClass}`}>
              {section.title}
            </h3>
          )}

          <ol className="grid gap-3 mt-4 list-decimal pl-6">
            {(section.items || []).map((item, itemIndex) => (
              <li
                key={itemIndex}
                className={`text-textGray leading-7 pl-2 ${caseClass}`}
              >
                {item}
              </li>
            ))}
          </ol>
        </div>
      );
    }

    if (section.type === "highlight") {
      return (
        <div
          key={section._id || index}
          className="mt-7 bg-primary/10 border border-primary/20 rounded-card p-6"
        >
          {section.title && (
            <h3 className={`text-2xl font-extrabold text-primary ${caseClass}`}>
              {section.title}
            </h3>
          )}

          <p className={`text-dark leading-8 mt-3 font-semibold whitespace-pre-line ${caseClass}`}>
            {section.content}
          </p>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={42} />
      </main>
    );
  }

  if (!course) {
    return (
      <main className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-black text-dark">Course not found</h1>
          <Link to="/courses" className="primary-btn mt-6">
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const hasDetailSections =
    Array.isArray(course.detailSections) && course.detailSections.length > 0;

  return (
    <main>
      <SEO
        title={course.title}
        description={course.description || "Explore this IT training course and learn practical skills with project-based education."}
        keywords={`${course.title}, IT training, practical learning, career guidance`}
        canonical={`/courses/${id}`}
        ogImage={course.image?.url || undefined}
      />
      <section className="bg-gradient-to-br from-dark via-softDark to-dark text-white py-20">
        <div className="container-custom">
          <Link
            to="/courses"
            className="inline-flex items-center text-white/80 hover:text-white font-bold"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center mt-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mt-5">
                {course.title}
              </h1>

              <p className="text-white/75 leading-8 mt-5 text-lg">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {course.duration && (
                  <span className="bg-white/10 border border-white/15 rounded-full px-5 py-3 font-bold">
                    Duration: {course.duration}
                  </span>
                )}

                {course.mode && (
                  <span className="bg-white/10 border border-white/15 rounded-full px-5 py-3 font-bold">
                    Mode: {course.mode}
                  </span>
                )}

                {course.level && (
                  <span className="bg-white/10 border border-white/15 rounded-full px-5 py-3 font-bold">
                    Level: {course.level}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="primary-btn">
                  Enquire Now
                </Link>

                {course.brochure?.url && (
                  <button
                    onClick={() => setShowBrochureForm(true)}
                    className="secondary-btn"
                  >
                    <Download size={18} className="mr-2" />
                    Download Brochure
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-card p-4">
              {course.image?.url ? (
                <img
                  src={course.image.url}
                  alt={course.title}
                  className="w-full h-[360px] object-cover rounded-card"
                />
              ) : (
                <div className="h-[360px] flex items-center justify-center">
                  <FileText size={80} className="text-primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12">
            <div>
              <h2 className="text-3xl font-black text-dark">
                Course Details
              </h2>

              {hasDetailSections ? (
                <div>{course.detailSections.map(renderSection)}</div>
              ) : (
                <p className="text-textGray leading-8 mt-5">
                  {course.description}
                </p>
              )}

              {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-3xl font-black text-dark">
                    Course Syllabus
                  </h2>

                  <ul className="grid gap-3 mt-5">
                    {course.syllabus.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-textGray leading-7"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-primary shrink-0 mt-1"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="bg-lightBg border border-borderSoft rounded-card p-6 h-fit sticky top-28">
              <h3 className="text-2xl font-black text-dark">
                Course Summary
              </h3>

              <div className="grid gap-4 mt-6">
                <div>
                  <p className="text-sm text-textGray">Duration</p>
                  <p className="font-extrabold text-dark">
                    {course.duration || "Contact for details"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-textGray">Mode</p>
                  <p className="font-extrabold text-dark">
                    {course.mode || "Online / Offline"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-textGray">Level</p>
                  <p className="font-extrabold text-dark">
                    {course.level || "Beginner to Advanced"}
                  </p>
                </div>

              </div>

              <Link to="/contact" className="primary-btn w-full mt-7">
                Enquire Now
              </Link>

              {course.brochure?.url && (
                <button
                  onClick={() => setShowBrochureForm(true)}
                  className="secondary-btn w-full mt-3"
                >
                  <Download size={18} className="mr-2" />
                  Download Brochure
                </button>
              )}
            </aside>
          </div>
        </div>
      </section>

      {showBrochureForm && (
        <div className="fixed inset-0 z-[999] bg-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card shadow-soft w-full max-w-xl p-7 relative">
            <button
              onClick={() => setShowBrochureForm(false)}
              className="absolute right-5 top-5 h-10 w-10 rounded-full bg-lightBg flex items-center justify-center hover:text-red-500 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-black text-dark">
              Download Course Brochure
            </h2>

            <p className="text-textGray leading-7 mt-2">
              Fill your details to download the brochure for{" "}
              <b>{course.title}</b>.
            </p>

            {brochureError && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold mt-5">
                {brochureError}
              </div>
            )}

            <form onSubmit={handleBrochureSubmit} className="grid gap-4 mt-6">
              <input
                name="name"
                value={enquiryData.name}
                onChange={handleEnquiryChange}
                placeholder="Full Name"
                className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />

              <input
                name="mobile"
                value={enquiryData.mobile}
                onChange={handleEnquiryChange}
                placeholder="Mobile Number"
                className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />

              <input
                name="email"
                value={enquiryData.email}
                onChange={handleEnquiryChange}
                placeholder="Email Address"
                className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />

              <textarea
                name="message"
                value={enquiryData.message}
                onChange={handleEnquiryChange}
                rows="4"
                placeholder="Message optional"
                className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />

              <button
                type="submit"
                disabled={brochureLoading}
                className="primary-btn"
              >
                {brochureLoading ? "Submitting..." : "Submit & Download"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default CourseDetail;