import { useState } from "react";
import { createEnquiryApi } from "../../api/enquiryApi";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSettingsApi } from "../../api/settingApi";
import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";

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
const [settings, setSettings] = useState(null);

const fetchSettings = async () => {
  try {
    const data = await getSettingsApi();
    setSettings(data.settings);
  } catch (error) {
    setSettings(null);
  }
};

useEffect(() => {
  fetchSettings();
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
      source: "Contact Form",
    });

    setSuccess("Enquiry submitted successfully. Our team will contact you soon.");
    setFormData({
      fullName: "",
      mobile: "",
      email: "",
      interestedCourse: "",
      preferredMode: "Not Selected",
      message: "",
    });

    setTimeout(() => {
      navigate("/thank-you");
    }, 1500);
  } catch (error) {
    setError(error.response?.data?.message || "Failed to submit enquiry.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main>
     <SEO
       title="Contact IT Sparks Technologies"
       description="Get in touch with IT Sparks Technologies for course enquiries, demo sessions, training details, and placement support."
       keywords="contact IT Sparks, course enquiry, training support, placement guidance"
       canonical="/contact"
     />
     <PageBanner
  page="contact"
  fallbackTitle="Contact Us"
  fallbackSubtitle="Get in touch with IT Sparks Technologies for courses, demo sessions, and training enquiries."
/>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
            <div className="space-y-5">
              <div className="bg-dark text-white rounded-card p-7 shadow-soft">
                <h2 className="text-2xl font-extrabold">Contact Details</h2>
                <p className="text-white/70 leading-7 mt-3">
                  Reach out to us for course enquiry, free demo, training
                  details, and placement support information.
                </p>
              </div>

              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <PhoneCall className="text-primary shrink-0" size={28} />
                <div>
                  <h3 className="font-extrabold text-dark">Phone</h3>
                  <p className="text-textGray mt-1">+91 75175 14455</p>
                </div>
              </div>

              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <MessageCircle className="text-primary shrink-0" size={28} />
                <div>
                  <h3 className="font-extrabold text-dark">WhatsApp</h3>
                  <p className="text-textGray mt-1">+91 75175 14144</p>
                </div>
              </div>

              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <Mail className="text-primary shrink-0" size={28} />
                <div>
                  <h3 className="font-extrabold text-dark">Email</h3>
                  <p className="text-textGray mt-1">
                    contact@itsparkstech.com
                  </p>
                </div>
              </div>

              <div className="bg-lightBg border border-borderSoft rounded-card p-6 flex gap-4">
                <MapPin className="text-primary shrink-0" size={28} />
                <div>
                  <h3 className="font-extrabold text-dark">Address</h3>
                  <p className="text-textGray mt-1">
                    IT Sparks Technologies | Gen AI & Agentic AI, Data Science, DevOps, Cloud Computing, AWS, ETL, Data Analyst Course in Pune, First Floor, Shop No. S-20, Audumbar Complex, A Wing, Narhe, Pune, Maharashtra 411041
                  </p>
                </div>
              </div>

              
            </div>

            <div className="bg-white border border-borderSoft rounded-card shadow-soft p-7">
              <h2 className="text-2xl font-extrabold text-dark">
                Send Course Enquiry
              </h2>
              <p className="text-textGray leading-7 mt-2">
                Fill in your details and our counsellor will contact you soon.
              </p>

              <form onSubmit={handleSubmit} className="grid gap-5 mt-7">
               
<div className="grid md:grid-cols-2 gap-5">
                  {success && (
  <div className="md:col-span-2 bg-green-50 border border-green-100 text-green-700 rounded-button px-4 py-3 text-sm font-semibold">
    {success}
  </div>
)}

{error && (
  <div className="md:col-span-2 bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold">
    {error}
  </div>
)} </div>
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

<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
/>

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

<textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Message"
  rows="5"
  className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
/>

<button type="submit" disabled={loading} className="primary-btn w-full">
  {loading ? "Submitting..." : "Submit Enquiry"} <Send size={18} className="ml-2" />
</button>     
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container-custom">
          <div className="bg-lightBg border border-borderSoft rounded-card overflow-hidden">
            <div className="h-[360px] flex items-center justify-center text-center px-6">
              <div>
                <MapPin className="text-primary mx-auto mb-4" size={42} />
                <h2 className="text-2xl font-extrabold text-dark">
                  Google Map Section
                </h2>
                <p className="text-textGray mt-2">
                  <a
  href={settings?.googleMapLink || "https://www.google.com/maps"}
  target="_blank"
  rel="noreferrer"
  className="primary-btn"
>
  Open Google Map
</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;