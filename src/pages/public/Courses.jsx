import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import ReviewSection from "../../components/common/ReviewSection";
import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";
import FaqSection from "../../components/common/FaqSection";
import { getCoursesApi } from "../../api/courseApi";

const Courses = () => {
  const [courses, setCourses] = useState([]);
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

  return (
    <main>
      <SEO
        title="Professional IT Courses"
        description="Explore practical IT courses in AI, data science, full stack development, cloud computing, and software training at IT Sparks Technologies."
        keywords="IT courses, AI courses, data science training, cloud computing course, full stack development, software training"
        canonical="/courses"
      />
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

          {loading ? (
            <div className="mt-14 bg-lightBg border border-borderSoft rounded-card p-10 text-center text-textGray font-semibold">
              Loading courses...
            </div>
          ) : error ? (
            <div className="mt-14 bg-red-50 border border-red-100 rounded-card p-10 text-center text-red-600 font-semibold">
              {error}
            </div>
          ) : courses.length === 0 ? (
            <div className="mt-14 bg-lightBg border border-borderSoft rounded-card p-10 text-center text-textGray font-semibold">
              No courses available right now.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

                   <FaqSection source="courseFaqs" />
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