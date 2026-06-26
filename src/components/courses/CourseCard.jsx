import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Clock,
  MonitorPlay,
  Signal,
} from "lucide-react";

const CourseCard = ({ course }) => {
  const courseId = course._id || course.id;

  return (
    <div className="group bg-white border border-borderSoft rounded-card shadow-card overflow-hidden card-hover">
      <div className="relative h-[230px] overflow-hidden bg-gradient-to-br from-primary/10 via-lightBg to-white">
        {course.image?.url ? (
          <img
            src={course.image.url}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="h-20 w-20 rounded-[24px] bg-primary text-white flex items-center justify-center">
              <BookOpenCheck size={40} />
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

        {course.isPopular && (
          <span className="absolute top-4 left-4 bg-primary text-white text-xs font-extrabold px-4 py-2 rounded-full shadow-card">
            Popular
          </span>
        )}

        <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-primary text-xs font-extrabold px-4 py-2 rounded-full">
          {course.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-black text-dark leading-snug group-hover:text-primary transition">
          {course.title}
        </h3>

        <p className="text-textGray leading-7 mt-3 text-sm line-clamp-3">
          {course.description}
        </p>

        <div className="grid gap-3 mt-5">
          <div className="flex items-center gap-3 text-sm font-semibold text-softDark">
            <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Clock size={17} />
            </span>
            {course.duration || "Duration will be updated"}
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-softDark">
            <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <MonitorPlay size={17} />
            </span>
            {course.mode || "Online / Offline"}
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-softDark">
            <span className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Signal size={17} />
            </span>
            {course.level || "Beginner to Advanced"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link
            to={`/courses/${courseId}`}
            className="secondary-btn text-sm px-3 py-3"
          >
            Details
          </Link>

          <Link to="/contact" className="primary-btn text-sm px-3 py-3">
            Enquire
          </Link>
        </div>

        <Link
          to={`/courses/${courseId}`}
          className="mt-5 inline-flex items-center text-primary font-extrabold hover:text-primaryDark transition"
        >
          View Syllabus
          <ArrowRight size={17} className="ml-2 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;