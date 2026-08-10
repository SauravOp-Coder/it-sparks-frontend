import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Home, Phone, Mail } from "lucide-react";
import SEO from "../../components/common/SEO";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 8 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/5">
      <SEO
        title="Thank You"
        description="Thank you for contacting IT Sparks Technologies. Your enquiry has been received and our team will get back to you shortly."
        keywords="thank you, IT Sparks enquiry"
        canonical="/thank-you"
        noIndex
      />
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center py-12 px-4">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-green-50 rounded-full p-6 border-4 border-green-100">
                <CheckCircle className="text-green-500" size={64} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">
              Thank You!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Your Enquiry Submitted Successfully
            </h2>
            <p className="text-lg text-textGray leading-8 mb-6">
              We appreciate your interest in IT Sparks Technologies. Our team has received your enquiry and will get back to you shortly with more information.
            </p>
            <p className="text-textGray text-base">
              You will be redirected to the home page in a few seconds...
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-borderSoft rounded-card shadow-soft p-6 hover:shadow-card transition">
              <div className="flex justify-center mb-4">
                <Phone className="text-primary" size={32} />
              </div>
              <h3 className="font-extrabold text-dark mb-2">Call Us</h3>
              <p className="text-textGray">+91 75175 14455 </p>
            </div>

            <div className="bg-white border border-borderSoft rounded-card shadow-soft p-6 hover:shadow-card transition">
              <div className="flex justify-center mb-4">
                <Mail className="text-primary" size={32} />
              </div>
              <h3 className="font-extrabold text-dark mb-2">Email Us</h3>
              <p className="text-textGray">contact@itsparkstech.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-extrabold px-8 py-4 rounded-button hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 bg-lightBg text-primary font-extrabold px-8 py-4 rounded-button border border-primary hover:bg-primary hover:text-white transition duration-300"
            >
              Explore Courses
            </Link>
          </div>

          {/* Additional Message */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-card">
            <p className="text-sm text-textGray">
              <span className="font-extrabold text-dark">Note: </span>
              Check your email and phone for updates from our team. If you don't receive any communication within 24 hours, please feel free to contact us directly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
