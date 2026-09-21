import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEnquiryApi } from "../../api/enquiryApi";
import {
  nameRegex,
  emailRegex,
  mobileRegex,
  sanitizeMobileInput,
  sanitizeNameInput,
} from "../../utils/validators";

const BrochureFormPopup = ({ isOpen, onClose, course }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;
    if (name === "mobile") nextValue = sanitizeMobileInput(value);
    if (name === "name") nextValue = sanitizeNameInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (data) => {
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

      const pdfBlob = new Blob([blob], { type: "application/pdf" });
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

  const resetAndClose = () => {
    setFormData({ name: "", mobile: "", email: "", message: "" });
    setFieldErrors({});
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFieldErrors({});

      await createEnquiryApi({
        name: formData.name,
        fullName: formData.name,

        mobile: formData.mobile,
        number: formData.mobile,
        phone: formData.mobile,
        mobileNumber: formData.mobile,

        email: formData.email,

        interestedCourse: course.title,
        course: course.title,
        courseName: course.title,

        enquiryType: "Brochure Download",
        message:
          formData.message || `Student downloaded brochure for ${course.title}`,
      });

      downloadBrochure();
      resetAndClose();

      setTimeout(() => {
        navigate("/thank-you");
      }, 500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-dark/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={resetAndClose}
    >
      <div
        className="bg-white rounded-card shadow-soft w-full max-w-xl p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-5 top-5 h-10 w-10 rounded-full bg-lightBg flex items-center justify-center hover:text-red-500 transition"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-black text-dark">
          Download Course Brochure
        </h2>

        <p className="text-textGray leading-7 mt-2">
          Fill your details to download the brochure for <b>{course.title}</b>.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold mt-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="grid gap-4 mt-6">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                fieldErrors.name ? "border-red-400" : "border-borderSoft"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1 px-1">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <input
              name="mobile"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                fieldErrors.mobile ? "border-red-400" : "border-borderSoft"
              }`}
            />
            {fieldErrors.mobile && (
              <p className="text-red-500 text-xs mt-1 px-1">{fieldErrors.mobile}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                fieldErrors.email ? "border-red-400" : "border-borderSoft"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1 px-1">{fieldErrors.email}</p>
            )}
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Message optional"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
          />

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? "Submitting..." : "Submit & Download"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrochureFormPopup;