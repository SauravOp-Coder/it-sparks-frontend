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
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
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
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
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
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
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
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
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
            <Link to="/privacy-policy" className="hover:text-primary transition">
              Privacy Policy
            </Link>

            <Link to="/terms-and-conditions" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;