import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEnquiryApi } from "../../api/enquiryApi";
import {
  sanitizeMobileInput,
  sanitizeNameInput,
  validateEnquiryForm,
} from "../../utils/validators";

const EnquiryPopup = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    interestedCourse: "",
    preferredMode: "Not Selected",
    message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;
    if (name === "mobile") nextValue = sanitizeMobileInput(value);
    if (name === "fullName") nextValue = sanitizeNameInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateEnquiryForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);
      setSuccess("");
      setError("");
      setFieldErrors({});

      await createEnquiryApi({
        ...formData,
        source: "Popup Form",
      });

      setSuccess("Enquiry submitted successfully.");
      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        interestedCourse: "",
        preferredMode: "Not Selected",
        message: "",
      });

      setTimeout(() => {
        setShowPopup(false);
        setSuccess("");
        navigate("/thank-you");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-card w-full max-w-xl shadow-soft relative overflow-hidden">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-lightBg flex items-center justify-center text-dark hover:text-primary transition"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        <div className="bg-dark text-white p-6">
          <span className="text-primary font-bold uppercase text-sm">
            Course Enquiry
          </span>
          <h2 className="text-2xl font-extrabold mt-2">
            Book Your Free Demo Session
          </h2>
          <p className="text-white/70 mt-2">
            Fill the form and our team will contact you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 grid gap-4">
          {success && (
            <div className="bg-green-50 border border-green-100 text-green-700 rounded-button px-4 py-3 text-sm font-semibold">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                  fieldErrors.fullName ? "border-red-400" : "border-borderSoft"
                }`}
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-xs mt-1 px-1">{fieldErrors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
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
          </div>

          <div>
            <input
              type="email"
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <select
                name="interestedCourse"
                value={formData.interestedCourse}
                onChange={handleChange}
                className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary text-textGray ${
                  fieldErrors.interestedCourse ? "border-red-400" : "border-borderSoft"
                }`}
              >
                <option value="">Interested Course</option>
                <option>Full Stack Web Development</option>
                <option>Python Programming</option>
                <option>Java Full Stack</option>
                <option>Data Science & Analytics</option>
                <option>Software Testing</option>
                <option>UI/UX Design</option>
              </select>
              {fieldErrors.interestedCourse && (
                <p className="text-red-500 text-xs mt-1 px-1">{fieldErrors.interestedCourse}</p>
              )}
            </div>

            <select
              name="preferredMode"
              value={formData.preferredMode}
              onChange={handleChange}
              className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary text-textGray"
            >
              <option value="Not Selected">Preferred Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="3"
              maxLength={500}
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary resize-none ${
                fieldErrors.message ? "border-red-400" : "border-borderSoft"
              }`}
            />
            {fieldErrors.message && (
              <p className="text-red-500 text-xs mt-1 px-1">{fieldErrors.message}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className="primary-btn w-full">
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPopup;