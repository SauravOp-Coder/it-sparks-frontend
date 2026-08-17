import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
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

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.5fr] gap-12 lg:gap-16 items-start">

          {/* COMPANY */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <img
                src={logo}
                alt="IT Sparks Technologies"
                className="h-14 w-auto bg-white rounded-button p-2 shrink-0"
              />

              <span className="font-extrabold text-xl leading-7">
                IT Sparks Technologies
              </span>
            </Link>

            <p className="text-white/70 leading-7 mt-5 max-w-md">
              Practical IT training institute focused on job-ready skills,
              real-world projects, career guidance, and placement support.
            </p>

            <div className="flex gap-3 mt-6">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition"
                >
                  <Facebook size={18} className="text-white" />
                </a>
              )}

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition"
                >
                  <Instagram size={18} className="text-white" />
                </a>
              )}

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition"
                >
                  <Linkedin size={18} className="text-white" />
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition"
                >
                  <Youtube size={18} className="text-white" />
                </a>
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-extrabold text-lg mb-5">
              Quick Links
            </h3>

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

              <Link
                to="/placements"
                className="hover:text-primary transition"
              >
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

          {/* CONTACT INFO */}
          <div>
            <h3 className="font-extrabold text-lg mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-white/70">

              {settings?.phone && (
                <p className="flex gap-3 items-start">
                  <Phone
                    size={20}
                    className="text-primary shrink-0 mt-1"
                  />

                  <span className="leading-6">
                    {settings.phone}
                  </span>
                </p>
              )}

              {settings?.email && (
                <p className="flex gap-3 items-start">
                  <Mail
                    size={20}
                    className="text-primary shrink-0 mt-1"
                  />

                  <span className="leading-6 break-words">
                    {settings.email}
                  </span>
                </p>
              )}

              {settings?.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-3 items-start hover:text-primary transition"
                >
                  <MapPin
                    size={20}
                    className="text-primary shrink-0 mt-1"
                  />

                  <span className="leading-6 max-w-xl">
                    {settings.address}
                  </span>
                </a>
              )}

            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
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