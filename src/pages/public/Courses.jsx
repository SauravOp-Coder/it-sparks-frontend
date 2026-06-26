import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import ReviewSection from "../../components/common/ReviewSection";
import PageBanner from "../../components/common/PageBanner";
import { getCoursesApi } from "../../api/courseApi";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCoursesApi();
      setCourses(data.courses || []);
    } catch (error) {
      setError("Unable to load courses right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category).filter(Boolean)),
  ];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <main>
      <PageBanner
        page="courses"
        fallbackTitle="Explore Our Professional IT Courses"
        fallbackSubtitle="Choose practical courses designed for students, freshers, and working professionals."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex text-primary font-extrabold uppercase tracking-wide text-sm bg-primary/10 px-4 py-2 rounded-full">
              Our Courses
            </span>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-dark mt-5">
              Learn practical skills with real projects
            </h2>

            <p className="text-textGray leading-8 mt-5 text-lg">
              Browse courses and choose the right learning path based on your
              interest, background, and career goal.
            </p>
          </div>

          {!loading && courses.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 rounded-full font-extrabold border transition ${
                    activeCategory === category
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-softDark border-borderSoft hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="mt-14 bg-lightBg border border-borderSoft rounded-card p-10 text-center text-textGray font-semibold">
              Loading courses...
            </div>
          ) : error ? (
            <div className="mt-14 bg-red-50 border border-red-100 rounded-card p-10 text-center text-red-600 font-semibold">
              {error}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="mt-14 bg-lightBg border border-borderSoft rounded-card p-10 text-center text-textGray font-semibold">
              No courses available right now.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-dark text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="text-primary font-extrabold uppercase tracking-wide text-sm">
                Need Help?
              </span>

              <h2 className="text-3xl md:text-4xl font-black mt-3">
                Confused about which course to choose?
              </h2>

              <p className="text-white/70 leading-8 mt-4 max-w-2xl">
                Contact our team and get guidance based on your background,
                interest, and career goals.
              </p>
            </div>

            <a href="/contact" className="primary-btn">
              Get Course Guidance
            </a>
          </div>
        </div>
      </section>

      <ReviewSection />
    </main>
  );
};

export default Courses;