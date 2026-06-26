import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaGoogle } from "react-icons/fa";
import { getSettingsApi } from "../../api/settingApi";


const TopBar = () => {
  const [settings, setSettings] = useState(null);

  const fetchSettings = async () => {
    try {
      const data = await getSettingsApi();
      setSettings(data.settings || data.setting || {});
    } catch (error) {
      setSettings(null);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const email = settings?.email || "info@itsparkstechnologies.com";
  const phone = settings?.phone || settings?.contactNumber || "+91 00000 00000";

  const topBarColor = "#0b4495"; // Change top bar color here

  const socials = [
    {
      icon: <FaFacebookF />,
      url: settings?.facebookLink,
    },
    {
      icon: <FaInstagram />,
      url: settings?.instagramLink,
    },
    {
      icon: <FaLinkedinIn />,
      url: settings?.linkedinLink,
    },
    {
      icon: <FaYoutube />,
      url: settings?.youtubeLink,
    },
    {
      icon: <FaGoogle />,
      url: settings?.googleReviewLink,
    },
  ].filter((item) => item.url);

  return (
    <div className="w-full text-white" style={{ backgroundColor: topBarColor }}>
      <div className="container-custom">
        <div className="h-[50px] flex items-center justify-between gap-5 text-sm">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${email}`}
              className="hidden sm:flex items-center gap-2 font-semibold hover:text-white/80 transition"
            >
              <Mail size={17} />
              {email}
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 font-semibold hover:text-white/80 transition"
            >
              <Phone size={17} />
              {phone}
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
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