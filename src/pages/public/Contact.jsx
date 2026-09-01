import { useEffect, useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { createEnquiryApi } from "../../api/enquiryApi";
import { getSettingsApi } from "../../api/settingApi";

import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";

import {
  sanitizeMobileInput,
  sanitizeNameInput,
  validateEnquiryForm,
} from "../../utils/validators";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    interestedCourse: "",
    preferredMode: "Not Selected",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [settings, setSettings] = useState(null);

  // =========================================================
  // FETCH SETTINGS
  // =========================================================

  const fetchSettings = async () => {
    try {
      const data = await getSettingsApi();
      setSettings(data.settings);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setSettings(null);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;

    // Mobile: allow digits only
    if (name === "mobile") {
      nextValue = sanitizeMobileInput(value);
    }

    // Name: allow letters and spaces only
    if (name === "fullName") {
      nextValue = sanitizeNameInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    // Clear individual field error when user starts correcting it
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error while editing
    if (error) {
      setError("");
    }
  };

  // =========================================================
  // HANDLE FORM SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
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
        source: "Contact Form",
      });

      setSuccess(
        "Enquiry submitted successfully. Our team will contact you soon."
      );

      // Reset form
      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        interestedCourse: "",
        preferredMode: "Not Selected",
        message: "",
      });

      // Redirect after success
      setTimeout(() => {
        navigate("/thank-you");
      }, 1500);
    } catch (error) {
      console.error("Contact enquiry error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // COMPONENT
  // =========================================================

  return (
    <main>
      {/* =====================================================
          SEO
      ====================================================== */}

      <SEO
        title="Contact IT Sparks Technologies"
        description="Get in touch with IT Sparks Technologies for course enquiries, demo sessions, training details, and placement support."
        keywords="contact IT Sparks, course enquiry, training support, placement guidance"
        canonical="/contact"
      />

      {/* =====================================================
          PAGE BANNER
      ====================================================== */}

      <PageBanner
        page="contact"
        fallbackTitle="Contact Us"
        fallbackSubtitle="Get in touch with IT Sparks Technologies for courses, demo sessions, and training enquiries."
      />

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
            {/* =================================================
                LEFT SIDE - CONTACT DETAILS
            ================================================== */}

            <div className="space-y-5">
              {/* Intro */}
              <div className="bg-dark text-white rounded-card p-7 shadow-soft">
                <h2 className="text-2xl font-extrabold">
                  Contact Details
                </h2>

                <p className="text-white/70 leading-7 mt-3">
                  Reach out to us for course enquiry, free demo, training
                  details, and placement support information.
                </p>
              </div>

              {/* Phone */}
              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <PhoneCall
                  className="text-primary shrink-0"
                  size={28}
                />

                <div>
                  <h3 className="font-extrabold text-dark">
                    Phone
                  </h3>

                  <p className="text-textGray mt-1">
                    +91 75175 14455
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <MessageCircle
                  className="text-primary shrink-0"
                  size={28}
                />

                <div>
                  <h3 className="font-extrabold text-dark">
                    WhatsApp
                  </h3>

                  <p className="text-textGray mt-1">
                    +91 75175 14144
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <Mail
                  className="text-primary shrink-0"
                  size={28}
                />

                <div>
                  <h3 className="font-extrabold text-dark">
                    Email
                  </h3>

                  <p className="text-textGray mt-1">
                    contact@itsparkstech.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <MapPin
                  className="text-primary shrink-0"
                  size={28}
                />

                <div>
                  <h3 className="font-extrabold text-dark">
                    Address
                  </h3>

                  <p className="text-textGray mt-1 leading-6">
                    IT Sparks Technologies |
                    First Floor, Shop No. S-20, Audumbar Complex,
                    A Wing, Narhe, Pune, Maharashtra 411041
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE - ENQUIRY FORM
            ================================================== */}

            <div className="bg-white border border-borderSoft rounded-card shadow-soft p-7">
              <h2 className="text-2xl font-extrabold text-dark">
                Send Course Enquiry
              </h2>

              <p className="text-textGray leading-7 mt-2">
                Fill in your details and our counsellor will contact
                you soon.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="grid gap-5 mt-7"
              >
                {/* =================================================
                    SUCCESS MESSAGE
                ================================================== */}

                {success && (
                  <div className="bg-green-50 border border-green-100 text-green-700 rounded-button px-4 py-3 text-sm font-semibold">
                    {success}
                  </div>
                )}

                {/* =================================================
                    GENERAL ERROR
                ================================================== */}

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold">
                    {error}
                  </div>
                )}

                {/* =================================================
                    NAME + MOBILE
                ================================================== */}

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      autoComplete="name"
                      className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                        fieldErrors.fullName
                          ? "border-red-400"
                          : "border-borderSoft"
                      }`}
                    />

                    {fieldErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1 px-1">
                        {fieldErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      inputMode="numeric"
                      autoComplete="tel"
                      maxLength={10}
                      className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                        fieldErrors.mobile
                          ? "border-red-400"
                          : "border-borderSoft"
                      }`}
                    />

                    {fieldErrors.mobile && (
                      <p className="text-red-500 text-xs mt-1 px-1">
                        {fieldErrors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* =================================================
                    EMAIL
                ================================================== */}

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    autoComplete="email"
                    className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary ${
                      fieldErrors.email
                        ? "border-red-400"
                        : "border-borderSoft"
                    }`}
                  />

                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1 px-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* =================================================
                    COURSE + MODE
                ================================================== */}

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Interested Course */}
                  <div>
                    <select
                      name="interestedCourse"
                      value={formData.interestedCourse}
                      onChange={handleChange}
                      className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary text-textGray ${
                        fieldErrors.interestedCourse
                          ? "border-red-400"
                          : "border-borderSoft"
                      }`}
                    >
                      <option value="">
                        Interested Course
                      </option>

                      <option value="Full Stack Web Development">
                        Full Stack Web Development
                      </option>

                      <option value="Python Programming">
                        Python Programming
                      </option>

                      <option value="Java Full Stack">
                        Java Full Stack
                      </option>

                      <option value="Data Science & Analytics">
                        Data Science & Analytics
                      </option>

                      <option value="Software Testing">
                        Software Testing
                      </option>

                      <option value="UI/UX Design">
                        UI/UX Design
                      </option>
                    </select>

                    {fieldErrors.interestedCourse && (
                      <p className="text-red-500 text-xs mt-1 px-1">
                        {fieldErrors.interestedCourse}
                      </p>
                    )}
                  </div>

                  {/* Preferred Mode */}
                  <div>
                    <select
                      name="preferredMode"
                      value={formData.preferredMode}
                      onChange={handleChange}
                      className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary text-textGray"
                    >
                      <option value="Not Selected">
                        Preferred Mode
                      </option>

                      <option value="Online">
                        Online
                      </option>

                      <option value="Offline">
                        Offline
                      </option>
                    </select>
                  </div>
                </div>

                {/* =================================================
                    MESSAGE
                ================================================== */}

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={5}
                    maxLength={500}
                    className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary resize-none ${
                      fieldErrors.message
                        ? "border-red-400"
                        : "border-borderSoft"
                    }`}
                  />

                  <div className="flex justify-between items-center mt-1 px-1">
                    {fieldErrors.message ? (
                      <p className="text-red-500 text-xs">
                        {fieldErrors.message}
                      </p>
                    ) : (
                      <span />
                    )}

                    <span className="text-xs text-textGray">
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="primary-btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}

                  {!loading && <Send size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GOOGLE MAP SECTION
      ====================================================== */}

      <section className="pb-20 bg-white">
        <div className="container-custom">
          <div className="bg-lightBg border border-borderSoft rounded-card overflow-hidden">
            <div className="h-[360px] flex items-center justify-center text-center px-6">
              <div>
                <MapPin
                  className="text-primary mx-auto mb-4"
                  size={42}
                />

                <h2 className="text-2xl font-extrabold text-dark">
                  Google Map Section
                </h2>

                <p className="text-textGray mt-2 mb-5">
                  View our location on Google Maps.
                </p>

                <a
                  href={
                    settings?.googleMapLink ||
                    "https://www.google.com/maps"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="primary-btn inline-flex items-center justify-center"
                >
                  Open Google Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
```
