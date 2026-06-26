import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEnquiryApi } from "../../api/enquiryApi";

const EnquiryPopup = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

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

        <form onSubmit={handleSubmit} className="p-6 grid gap-4">
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
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <select
              name="interestedCourse"
              value={formData.interestedCourse}
              onChange={handleChange}
              className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary text-textGray"
            >
              <option value="">Interested Course</option>
              <option>Full Stack Web Development</option>
              <option>Python Programming</option>
              <option>Java Full Stack</option>
              <option>Data Science & Analytics</option>
              <option>Software Testing</option>
              <option>UI/UX Design</option>
            </select>

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

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="3"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
          />

          <button type="submit" disabled={loading} className="primary-btn w-full">
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPopup;