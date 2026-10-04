import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/logo/it-sparks-logo.png";
import { getCoursesApi } from "../../api/courseApi";
import { getSettingsApi } from "../../api/settingApi";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
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

  const closeMobileMenu = () => {
    setOpenMenu(false);
    setMobileCoursesOpen(false);
  };

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
              to={`/courses/${course.slug || course._id}`}
              className="p-4 rounded-[18px] hover:bg-lightBg transition"
            >
              <p className="font-extrabold text-dark text-sm">
                {/* FIXED HERE: replaced dropdownTitle with dropdownName */}
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
        className="mt-4 w-full primary-btn text-sm py-3 flex items-center justify-center"
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
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                About
              </NavLink>

              {/* Courses with expandable dropdown */}
              <div>
                <div className="flex items-center justify-between">
                  <NavLink
                    to="/courses"
                    onClick={closeMobileMenu}
                    className={navLinkClass}
                  >
                    Courses
                  </NavLink>

                  <button
                    type="button"
                    onClick={() => setMobileCoursesOpen((prev) => !prev)}
                    aria-label="Toggle courses list"
                    aria-expanded={mobileCoursesOpen}
                    className="h-9 w-9 rounded-button border border-borderSoft flex items-center justify-center text-softDark"
                  >
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        mobileCoursesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {mobileCoursesOpen && (
                  <div className="mt-3 pl-4 border-l-2 border-borderSoft grid gap-3">
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <Link
                          key={course._id}
                          to={`/courses/${course.slug || course._id}`}
                          onClick={closeMobileMenu}
                          className="text-sm font-semibold text-softDark hover:text-primary transition"
                        >
                          {course.dropdownName || course.title}
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-textGray">
                        No courses available right now.
                      </span>
                    )}

                    <Link
                      to="/courses"
                      onClick={closeMobileMenu}
                      className="text-sm font-extrabold text-primary"
                    >
                      View All Courses
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/placements"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                Placements
              </NavLink>

              <NavLink
                to="/gallery"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                Gallery
              </NavLink>

              <NavLink
                to="/blog"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                Blog
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className={navLinkClass}
              >
                Contact
              </NavLink>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
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