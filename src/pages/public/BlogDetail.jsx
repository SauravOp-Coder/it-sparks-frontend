import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import BlogCard from "../../components/blogs/BlogCard";
import SEO from "../../components/common/SEO";
import { useEffect, useState } from "react";
import { getBlogsApi, getSingleBlogApi } from "../../api/blogApi";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const blogData = await getSingleBlogApi(id);
      setBlog(blogData.blog);

      const allBlogs = await getBlogsApi();
      const related = (allBlogs.blogs || [])
        .filter((item) => item._id !== id)
        .slice(0, 3);

      setRelatedBlogs(related);
    } catch (error) {
      setError("Blog not found or unable to load blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const blogDate = blog?.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  if (loading) {
    return (
      <main className="section-padding">
        <div className="container-custom text-center text-textGray">
          Loading blog...
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-extrabold text-dark">Blog not found</h1>
          <p className="text-textGray mt-3">{error}</p>
          <Link to="/blog" className="primary-btn mt-6">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <SEO
        title={blog.title}
        description={blog.shortDescription || "Read this informative blog from IT Sparks Technologies about IT training, career growth, and practical learning."}
        keywords={`${blog.title}, IT Sparks, career guidance, practical training`}
        canonical={`/blog/${id}`}
        ogImage={blog.image?.url || undefined}
      />
      <section className="bg-gradient-to-br from-white via-lightBg to-white py-20">
        <div className="container-custom max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary font-bold hover:text-primaryDark transition mb-6"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Blogs
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">
              {blog.category}
            </span>

            <span className="flex items-center gap-2 text-sm font-semibold text-textGray">
              <CalendarDays size={17} className="text-primary" />
              {blogDate}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mt-5 leading-tight">
            {blog.title}
          </h1>

          <p className="text-textGray leading-8 mt-5 text-lg">
            {blog.shortDescription}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="h-[360px] bg-gradient-to-br from-primary/20 via-lightBg to-white rounded-card border border-borderSoft flex items-center justify-center mb-10 overflow-hidden">
            {blog.image?.url ? (
              <img
                src={blog.image.url}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-24 w-24 rounded-[28px] bg-primary text-white flex items-center justify-center text-4xl font-extrabold">
                {blog.title?.charAt(0)}
              </div>
            )}
          </div>

          <article className="bg-white border border-borderSoft rounded-card shadow-card p-7 md:p-10">
            <p className="text-textGray leading-9 text-lg whitespace-pre-line">
              {blog.content}
            </p>

            <div className="mt-8 bg-lightBg border border-borderSoft rounded-card p-6">
              <h3 className="text-2xl font-extrabold text-dark">
                Need course guidance?
              </h3>
              <p className="text-textGray leading-7 mt-2">
                Contact IT Sparks Technologies and choose the right course based
                on your interest and career goal.
              </p>

              <Link to="/contact" className="primary-btn mt-5">
                Contact Now
              </Link>
            </div>
          </article>
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="section-padding bg-lightBg">
          <div className="container-custom">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-wide text-sm">
                Related Blogs
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-3">
                Continue reading
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-7 mt-10">
              {relatedBlogs.map((item) => (
                <BlogCard key={item._id} blog={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetail;