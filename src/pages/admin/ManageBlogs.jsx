import { useEffect, useState } from "react";
import {
  createBlogApi,
  deleteBlogApi,
  getAdminBlogsApi,
  updateBlogApi,
} from "../../api/blogApi";
import { Edit, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  title: "",
  category: "",
  publishedDate: "",
  shortDescription: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  isVisible: true,
  image: null,
};

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(emptyForm);

  const fetchBlogs = async () => {
    try {
      setPageLoading(true);
      const data = await getAdminBlogsApi();
      setBlogs(data.blogs || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingBlogId(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
  };

  const openEditForm = (blog) => {
    setEditingBlogId(blog._id);

    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      publishedDate: blog.publishedDate
        ? blog.publishedDate.slice(0, 10)
        : "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      metaKeywords: blog.metaKeywords || "",
      isVisible: Boolean(blog.isVisible),
      image: null,
    });

    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildPayload = () => {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = buildPayload();

      if (editingBlogId) {
        await updateBlogApi(editingBlogId, payload);
      } else {
        await createBlogApi(payload);
      }

      resetForm();
      setShowForm(false);
      fetchBlogs();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (editingBlogId ? "Failed to update blog" : "Failed to create blog")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBlogApi(id);
      fetchBlogs();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete blog");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-dark">Manage Blogs</h2>
          <p className="text-textGray mt-2">
            Add, edit, delete, show or hide blog posts.
          </p>
        </div>

        <button onClick={openAddForm} className="primary-btn">
          <Plus size={18} className="mr-2" />
          Add Blog
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold mb-6">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-borderSoft rounded-card shadow-card p-7 mb-8"
        >
          <h3 className="text-xl font-extrabold text-dark mb-6">
            {editingBlogId ? "Edit Blog" : "Add New Blog"}
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Blog Category"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="publishedDate"
              type="date"
              value={formData.publishedDate}
              onChange={handleChange}
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            rows="3"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Full Blog Content"
            rows="8"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

          {/* SEO Fields */}
          <div className="mt-6 border-t border-borderSoft pt-5">
            <h4 className="font-bold text-dark text-lg mb-4">
              SEO (Google Search) Settings
            </h4>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-xs font-bold text-textGray px-1">
                Meta Title ({formData.metaTitle.length}/60 recommended)
              </label>
              <input
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                placeholder="e.g. Top 5 IT Skills to Learn in 2026 | IT Sparks Blog"
                className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1 mb-4">
              <label className="text-xs font-bold text-textGray px-1">
                Meta Description ({formData.metaDescription.length}/160 recommended)
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                placeholder="A short summary that appears under the title in Google search results."
                rows="3"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-textGray px-1">
                Meta Keywords (comma separated)
              </label>
              <input
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                placeholder="e.g. IT skills 2026, career advice, tech training blog"
                className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 font-semibold text-dark mt-5">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
            />
            Visible
          </label>

          <div className="flex gap-3 mt-6">
            <button type="submit" disabled={loading} className="primary-btn">
              {loading
                ? "Saving..."
                : editingBlogId
                ? "Update Blog"
                : "Save Blog"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="secondary-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden">
        <div className="p-6 border-b border-borderSoft">
          <h3 className="text-xl font-extrabold text-dark">Blog List</h3>
        </div>

        {pageLoading ? (
          <div className="p-10 text-center text-textGray">Loading blogs...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="bg-lightBg">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Blog
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-dark">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="border-t border-borderSoft">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {blog.image?.url ? (
                          <img
                            src={blog.image.url}
                            alt={blog.title}
                            className="h-14 w-14 rounded-button object-cover border border-borderSoft"
                          />
                        ) : (
                          <div className="h-14 w-14 rounded-button bg-primary/10 text-primary flex items-center justify-center font-extrabold">
                            {blog.title?.charAt(0)}
                          </div>
                        )}

                        <div>
                          <p className="font-extrabold text-dark">
                            {blog.title}
                          </p>
                          <p className="text-sm text-textGray mt-1 max-w-[460px]">
                            {blog.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-textGray">
                      {formatDate(blog.publishedDate)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          blog.isVisible
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}
                      >
                        {blog.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditForm(blog)}
                          className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-primary transition"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-red-500 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {blogs.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-textGray"
                    >
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;