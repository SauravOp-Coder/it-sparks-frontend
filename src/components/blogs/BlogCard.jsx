import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

const BlogCard = ({ blog }) => {
  const blogId = blog._id || blog.id;

  const blogDate = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : blog.date;

  return (
    <div className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden card-hover">
      <div className="h-[210px] bg-gradient-to-br from-primary/20 via-lightBg to-white flex items-center justify-center overflow-hidden">
        {blog.image?.url ? (
          <img
            src={blog.image.url}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-[24px] bg-primary text-white flex items-center justify-center text-3xl font-extrabold">
            {blog.title?.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="inline-flex text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {blog.category}
          </span>

          <span className="flex items-center gap-2 text-xs font-semibold text-textGray">
            <CalendarDays size={15} className="text-primary" />
            {blogDate}
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-dark mt-5 leading-snug">
          {blog.title}
        </h3>

        <p className="text-textGray leading-7 mt-3 text-sm">
          {blog.shortDescription}
        </p>

        <Link
          to={`/blog/${blogId}`}
          className="mt-6 inline-flex items-center text-primary font-bold hover:text-primaryDark transition"
        >
          Read More <ArrowRight size={17} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;