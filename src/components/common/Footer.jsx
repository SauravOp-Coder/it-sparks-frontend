import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../../assets/logo/it-sparks-logo.png";
import { useEffect, useState } from "react";
import { getSettingsApi } from "../../api/settingApi";

const Footer = () => {
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

  const socialLinks = settings?.socialLinks || {};

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="IT Sparks Technologies"
                className="h-14 w-auto bg-white rounded-button p-2"
              />
              <span className="font-extrabold text-xl">
                IT Sparks Technologies
              </span>
            </Link>

            <p className="text-white/70 leading-7 mt-5">
              Practical IT training institute focused on job-ready skills,
              real-world projects, career guidance, and placement support.
            </p>

           
             <div className="flex gap-3 mt-6">
  {socialLinks.facebook && (
    <a
      href={socialLinks.facebook}
      target="_blank"
      rel="noreferrer"
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition text-sm font-extrabold"
    >
      Fb
    </a>
  )}

  {socialLinks.instagram && (
    <a
      href={socialLinks.instagram}
      target="_blank"
      rel="noreferrer"
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition text-sm font-extrabold"
    >
      Ig
    </a>
  )}

  {socialLinks.linkedin && (
    <a
      href={socialLinks.linkedin}
      target="_blank"
      rel="noreferrer"
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition text-sm font-extrabold"
    >
      In
    </a>
  )}

  {socialLinks.youtube && (
    <a
      href={socialLinks.youtube}
      target="_blank"
      rel="noreferrer"
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition text-sm font-extrabold"
    >
      Yt
    </a>
  )}
</div>
          
          </div>

          <div>
            <h3 className="font-extrabold text-lg mb-5">Quick Links</h3>
            <div className="grid gap-3 text-white/70">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-primary transition">
                About
              </Link>
              <Link to="/courses" className="hover:text-primary transition">
                Courses
              </Link>
              <Link to="/placements" className="hover:text-primary transition">
                Placements
              </Link>
              <Link to="/gallery" className="hover:text-primary transition">
                Gallery
              </Link>
              <Link to="/blog" className="hover:text-primary transition">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-lg mb-5">Popular Courses</h3>
            <div className="grid gap-3 text-white/70">
              <Link to="/courses" className="hover:text-primary transition">
                Full Stack Development
              </Link>
              <Link to="/courses" className="hover:text-primary transition">
                Python Programming
              </Link>
              <Link to="/courses" className="hover:text-primary transition">
                Data Science
              </Link>
              <Link to="/courses" className="hover:text-primary transition">
                Software Testing
              </Link>
              <Link to="/courses" className="hover:text-primary transition">
                UI/UX Design
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-lg mb-5">Contact Info</h3>

            <div className="space-y-4 text-white/70">
              {settings?.phone && (
                <p className="flex gap-3">
                  <Phone size={20} className="text-primary shrink-0" />
                  <span>{settings.phone}</span>
                </p>
              )}

              {settings?.email && (
                <p className="flex gap-3">
                  <Mail size={20} className="text-primary shrink-0" />
                  <span>{settings.email}</span>
                </p>
              )}

              {settings?.address && (
                <p className="flex gap-3">
                  <MapPin size={20} className="text-primary shrink-0" />
                  <span>{settings.address}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white/60 text-sm">
          <p>
            © {new Date().getFullYear()} IT Sparks Technologies. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link to="/" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;