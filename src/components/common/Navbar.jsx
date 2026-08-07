import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/logo/it-sparks-logo.png";
import { getCoursesApi } from "../../api/courseApi";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileCourses, setOpenMobileCourses] = useState(false);
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const courseData = await getCoursesApi();
      setCourses((courseData.courses || []).slice(0, 6));
    } catch {
      setCourses([]);
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            {/* Courses Mega-Dropdown */}
            <div className="relative group">
              <NavLink
                to="/courses"
                className="text-[15px] font-bold text-softDark hover:text-primary transition flex items-center gap-1 py-6"
              >
                Courses <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </NavLink>

              <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-[520px] bg-white border border-borderSoft rounded-card shadow-soft p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <Link
                          key={course._id}
                          to={`/courses/${course._id}`}
                          className="p-3 rounded-[14px] hover:bg-lightBg transition block"
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
                        className="col-span-2 p-4 rounded-[14px] hover:bg-lightBg transition"
                      >
                        <p className="font-extrabold text-dark">Explore Courses</p>
                        <p className="text-sm text-textGray mt-1">
                          View all available practical IT courses.
                        </p>
                      </Link>
                    )}
                  </div>

                  <Link
                    to="/courses"
                    className="mt-4 w-full primary-btn text-sm py-3 text-center block"
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
            aria-label="Toggle navigation menu"
            className="lg:hidden h-11 w-11 rounded-button border border-borderSoft flex items-center justify-center text-dark"
          >
            {openMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {openMenu && (
          <div className="lg:hidden border-t border-borderSoft py-5 space-y-3">
            <NavLink to="/" onClick={() => setOpenMenu(false)} className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={() => setOpenMenu(false)} className={navLinkClass}>
              About
            </NavLink>

            {/* Mobile Course Dropdown */}
            <div>
              <button
                onClick={() => setOpenMobileCourses(!openMobileCourses)}
                className="w-full flex items-center justify-between text-[15px] font-bold text-softDark py-1"
              >
                <span>Courses</span>
                <ChevronDown size={16} className={`transition-transform ${openMobileCourses ? "rotate-180" : ""}`} />
              </button>
              {openMobileCourses && (
                <div className="pl-4 py-2 space-y-2 border-l-2 border-primary/20 my-1">
                  {courses.map((course) => (
                    <Link
                      key={course._id}
                      to={`/courses/${course._id}`}
                      onClick={() => setOpenMenu(false)}
                      className="block text-sm font-semibold text-textGray hover:text-primary"
                    >
                      {course.dropdownName || course.title}
                    </Link>
                  ))}
                  <Link
                    to="/courses"
                    onClick={() => setOpenMenu(false)}
                    className="block text-sm font-bold text-primary pt-1"
                  >
                    View All Courses →
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/placements" onClick={() => setOpenMenu(false)} className={navLinkClass}>
              Placements
            </NavLink>
            <NavLink to="/gallery" onClick={() => setOpenMenu(false)} className={navLinkClass}>
              Gallery
            </NavLink>
            <NavLink to="/blog" onClick={() => setOpenMenu(false)} className={navLinkClass}>
              Blog
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpenMenu(false)} className={navLinkClass}>
              Contact
            </NavLink>

            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setOpenMenu(false)}
                className="primary-btn w-full text-center block"
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