import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";
import { getSettingsApi } from "../../api/settingApi";

const TopBar = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const data = await getSettingsApi();

      setSettings(data.settings || data.setting || null);
    } catch (error) {
      setSettings(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const email = settings?.email || "";
  const phone = settings?.phone || settings?.contactNumber || "";

  const topBarColor = "#0b4495";

  const socialLinks = settings?.socialLinks || {};

  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: socialLinks.facebook || settings?.facebookLink,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: socialLinks.instagram || settings?.instagramLink,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: socialLinks.linkedin || settings?.linkedinLink,
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      url: socialLinks.youtube || settings?.youtubeLink,
    },
    {
      name: "Google Reviews",
      icon: <FaGoogle />,
      url: socialLinks.google || settings?.googleReviewLink,
    },
  ].filter((item) => item.url);

  return (
    <div
      className="w-full text-white"
      style={{ backgroundColor: topBarColor }}
    >
      <div className="container-custom">
        <div className="h-[50px] flex items-center justify-between gap-5 text-sm">
          
          {/* CONTACT DETAILS */}
          <div className="flex items-center gap-6 min-w-0">

            {/* EMAIL */}
            <div className="hidden sm:flex items-center min-w-[230px]">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Mail size={17} className="opacity-50" />

                  <span className="h-4 w-44 rounded bg-white/20 animate-pulse" />
                </div>
              ) : email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 font-semibold hover:text-white/80 transition"
                >
                  <Mail size={17} />
                  {email}
                </a>
              ) : null}
            </div>

            {/* PHONE */}
            <div className="flex items-center min-w-[150px]">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Phone size={17} className="opacity-50" />

                  <span className="h-4 w-28 rounded bg-white/20 animate-pulse" />
                </div>
              ) : phone ? (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 font-semibold hover:text-white/80 transition"
                >
                  <Phone size={17} />
                  {phone}
                </a>
              ) : null}
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-3 shrink-0">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                title={item.name}
                className="h-7 w-7 rounded-full bg-white/15 hover:bg-white hover:text-[#003b8e] transition flex items-center justify-center text-sm"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;