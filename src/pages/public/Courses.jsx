import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import ReviewSection from "../../components/common/ReviewSection";
import PageBanner from "../../components/common/PageBanner";
import SEO from "../../components/common/SEO";
import FaqSection from "../../components/common/FaqSection";
import FreeDemoPopup from "../../components/common/FreeDemoPopup";
import { getCoursesApi } from "../../api/courseApi";
import EnquireSection from "../common/EnquireSection";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [demoPopupOpen, setDemoPopupOpen] = useState(false);

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
        fallbackSubtitle=" Browse courses and choose the right learning path based on your
              interest, background, and career goal."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
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

             {/* ========================= */}
      {/* Enquire Section */}
      {/* ========================= */}
      <EnquireSection />

      <ReviewSection />

      <FreeDemoPopup
        isOpen={demoPopupOpen}
        onClose={() => setDemoPopupOpen(false)}
      />
    </main>
  );
};

export default Courses;