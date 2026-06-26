import { useEffect, useState } from "react";
import {
  createReviewApi,
  deleteReviewApi,
  getAdminReviewsApi,
  updateReviewApi,
} from "../../api/reviewApi";
import { Edit, Plus, Star, Trash2 } from "lucide-react";

const emptyForm = {
  studentName: "",
  course: "",
  review: "",
  rating: "5",
  isVisible: true,
  image: null,
};

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setPageLoading(true);
      const data = await getAdminReviewsApi();
      setReviews(data.reviews || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch reviews");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingReviewId(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
  };

  const openEditForm = (review) => {
    setEditingReviewId(review._id);
    setFormData({
      studentName: review.studentName || "",
      course: review.course || "",
      review: review.review || "",
      rating: String(review.rating || 5),
      isVisible: Boolean(review.isVisible),
      image: null,
    });
    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
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

      if (editingReviewId) {
        await updateReviewApi(editingReviewId, payload);
      } else {
        await createReviewApi(payload);
      }

      resetForm();
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (editingReviewId ? "Failed to update review" : "Failed to create review")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await deleteReviewApi(id);
      fetchReviews();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-dark">Manage Reviews</h2>
          <p className="text-textGray mt-2">
            Add, edit, hide/show, and delete student reviews.
          </p>
        </div>

        <button onClick={openAddForm} className="primary-btn">
          <Plus size={18} className="mr-2" />
          Add Review
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
            {editingReviewId ? "Edit Review" : "Add Student Review"}
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Student Name"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course Name"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary text-textGray"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            placeholder="Student Review"
            rows="4"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

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
                : editingReviewId
                ? "Update Review"
                : "Save Review"}
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

      {pageLoading ? (
        <div className="bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
          Loading reviews...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-borderSoft rounded-card shadow-card p-6"
            >
              <div className="flex items-center gap-4 mb-5">
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.studentName}
                    className="h-14 w-14 rounded-full object-cover border border-borderSoft"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold">
                    {item.studentName?.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-extrabold text-dark">{item.studentName}</h3>
                  <p className="text-sm font-semibold text-primary">{item.course}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(Number(item.rating || 5))].map((_, index) => (
                  <Star key={index} size={17} className="text-primary fill-primary" />
                ))}
              </div>

              <p className="text-textGray leading-7">“{item.review}”</p>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.isVisible
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {item.isVisible ? "Visible" : "Hidden"}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-primary transition"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
              No reviews found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;