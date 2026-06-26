import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import CourseCard from "../courses/CourseCard";
import { getCoursesApi } from "../../api/courseApi";
import { getHomeContentApi } from "../../api/homeApi";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const courseData = await getCoursesApi();
      const homeData = await getHomeContentApi();

      const allCourses = courseData.courses || [];
      const popularCourses = allCourses.filter((course) => course.isPopular);

      setCourses(
        popularCourses.length > 0
          ? popularCourses.slice(0, 3)
          : allCourses.slice(0, 3)
      );

      setHome(homeData.homeContent);
    } catch (error) {
      setCourses([]);
      setHome(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title =
    home?.popularCoursesTitle || "Industry-focused courses to build your career";

  const subtitle =
    home?.popularCoursesSubtitle ||
    "Choose from practical IT courses designed with real-world projects, interview preparation, and placement-focused career support.";

  return (
    <section className="relative section-padding bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,230,0.08),transparent_32%)]" />

      <div className="container-custom relative">
        {/* Centered Heading Container */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-5">
          <span className="inline-flex text-primary font-extrabold uppercase tracking-wide text-sm bg-primary/10 px-4 py-2 rounded-full w-fit">
            Popular Courses
          </span>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-dark leading-tight">
            {title}
          </h2>

          <p className="text-textGray leading-8 text-lg">
            {subtitle}
          </p>

          <Link to="/courses" className="secondary-btn shrink-0 mt-2">
            View All Courses
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-14 bg-lightBg border border-borderSoft rounded-card p-10 text-center text-textGray font-semibold">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-14 bg-lightBg border border-borderSoft rounded-card p-10 text-center text-textGray font-semibold">
            Popular courses will be updated soon.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;