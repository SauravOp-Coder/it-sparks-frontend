import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { createEnquiryApi } from "../../api/enquiryApi";
import { getCoursesApi } from "../../api/courseApi";
import {
  sanitizeMobileInput,
  sanitizeNameInput,
  validateEnquiryForm,
} from "../../utils/validators";

const EnquireSection = ({
  title = "EnquireSection",
  subtitle = "Have a question or want to know more? Fill in your details and our team will get back to you shortly.",
  source = "Enquire Section",
}) => {
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
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesApi();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nextValue = value;

    if (name === "mobile") {
      nextValue = sanitizeMobileInput(value);
    }

    if (name === "fullName") {
      nextValue = sanitizeNameInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
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
        source,
      });

      setSuccess(
        "Enquiry submitted successfully. Our team will contact you soon."
      );

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        interestedCourse: "",
        preferredMode: "Not Selected",
        message: "",
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to submit enquiry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 w-full">
      <div className="bg-lightBg border border-borderSoft rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-dark tracking-tight">
            {title}
          </h2>

          <p className="text-textGray leading-7 mt-3">
            {subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-4 mt-8 max-w-2xl mx-auto"
        >
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
                className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary bg-white ${
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

            <div>
              <input
                type="tel"
                name="mobile"
                inputMode="numeric"
                maxLength={10}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary bg-white ${
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

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary bg-white ${
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

          <div>
            <select
              name="interestedCourse"
              value={formData.interestedCourse}
              onChange={handleChange}
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary text-textGray bg-white ${
                fieldErrors.interestedCourse
                  ? "border-red-400"
                  : "border-borderSoft"
              }`}
            >
              <option value="">
                Interested Course
              </option>

              {courses.map((course) => (
                <option
                  key={course._id || course.slug || course.title}
                  value={course.title}
                >
                  {course.title}
                </option>
              ))}
            </select>

            {fieldErrors.interestedCourse && (
              <p className="text-red-500 text-xs mt-1 px-1">
                {fieldErrors.interestedCourse}
              </p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message (optional)"
              rows="3"
              maxLength={500}
              className={`w-full border rounded-button px-4 py-3 outline-none focus:border-primary resize-none bg-white ${
                fieldErrors.message
                  ? "border-red-400"
                  : "border-borderSoft"
              }`}
            />

            {fieldErrors.message && (
              <p className="text-red-500 text-xs mt-1 px-1">
                {fieldErrors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn w-full"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}

            <Send
              size={18}
              className="ml-2"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquireSection;