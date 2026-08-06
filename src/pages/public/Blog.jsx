import { useEffect, useState } from "react";
import BlogCard from "../../components/blogs/BlogCard";
import { getBlogsApi } from "../../api/blogApi";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogsApi();
      setBlogs(data.blogs || []);
    } catch (error) {
      setError("Unable to load blogs right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main>
      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom text-center max-w-3xl">
          <span className="text-primary font-bold uppercase tracking-wide text-sm">
            Blogs
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mt-4">
            Career guidance and IT learning articles
          </h1>

          <p className="text-textGray leading-8 mt-5">
            Read useful articles about IT courses, career paths, practical
            training, placement preparation, and technology learning.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center text-textGray">Loading blogs...</div>
          ) : error ? (
            <div className="text-center text-red-600 font-semibold">{error}</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-textGray">
              Blogs will be updated soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;