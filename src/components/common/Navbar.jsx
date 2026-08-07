import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/logo/it-sparks-logo.png";
import { getCoursesApi } from "../../api/courseApi";
import { getSettingsApi } from "../../api/settingApi";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [courses, setCourses] = useState([]);
  const [settings, setSettings] = useState(null);

  const fetchData = async () => {
    try {
      const courseData = await getCoursesApi();
      const settingData = await getSettingsApi();

      setCourses((courseData.courses || []).slice(0, 6));
      setSettings(settingData.settings);
    } catch (error) {
      setCourses([]);
      setSettings(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-[15px] font-bold transition ${
      isActive ? "text-primary" : "text-softDark hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-borderSoft">
      <div className="container-custom">
        <nav className="h-[82px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="IT Sparks Technologies"
              className="h-[56px] w-auto object-contain"
            />

            <div className="hidden sm:block leading-tight">
              <p className="text-[18px] font-black tracking-tight text-dark">
                IT Sparks
              </p>
              <p className="text-[12px] font-bold tracking-[0.2em] text-primary uppercase">
                Technologies
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <div className="relative group">
              <NavLink
                to="/courses"
                className="text-[15px] font-bold text-softDark hover:text-primary transition flex items-center gap-1"
              >
                Courses <ChevronDown size={16} />
              </NavLink>

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-[520px] bg-white border border-borderSoft rounded-card shadow-soft p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <Link
                          key={course._id}
                          to={`/courses/${course._id}`}
                          className="p-4 rounded-[18px] hover:bg-lightBg transition"
                        >
                          <p className="font-extrabold text-dark text-sm">
                            {course.dropdownName || course.title}
                          </p>
                          <p className="text-xs text-textGray mt-1 line-clamp-2">
                            {course.description}
                          </p>
                        </Link>
                      ))
                    ) : (
                      <Link
                        to="/courses"
                        className="col-span-2 p-4 rounded-[18px] hover:bg-lightBg transition"
                      >
                        <p className="font-extrabold text-dark">
                          Explore Courses
                        </p>
                        <p className="text-sm text-textGray mt-1">
                          View all available practical IT courses.
                        </p>
                      </Link>
                    )}
                  </div>

                  <Link
                    to="/courses"
                    className="mt-4 w-full primary-btn text-sm py-3"
                  >
                    View All Courses
                  </Link>
                </div>
              </div>
            </div>

            <NavLink to="/placements" className={navLinkClass}>
              Placements
            </NavLink>

            <NavLink to="/gallery" className={navLinkClass}>
              Gallery
            </NavLink>

            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            

            <Link to="/contact" className="primary-btn py-3">
              Book Free Demo
            </Link>
          </div>

          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="lg:hidden h-11 w-11 rounded-button border border-borderSoft flex items-center justify-center"
          >
            {openMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {openMenu && (
          <div className="lg:hidden border-t border-borderSoft py-5">
            <div className="grid gap-4">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/courses", "Courses"],
                ["/placements", "Placements"],
                ["/gallery", "Gallery"],
                ["/blog", "Blog"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpenMenu(false)}
                  className={navLinkClass}
                >
                  {label}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={() => setOpenMenu(false)}
                className="primary-btn w-full"
              >
                Book Free Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;