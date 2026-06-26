import { useEffect, useState } from "react";
import {
  createBannerApi,
  deleteBannerApi,
  getAdminBannersApi,
  updateBannerApi,
} from "../../api/bannerApi";
import { Edit, Image, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  page: "home",
  type: "slider",
  title: "",
  subtitle: "",
  buttonText: "",
  buttonLink: "",
  order: "0",
  isVisible: true,
  image: null,
};

const pages = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "courses", label: "Courses" },
  { value: "courseDetail", label: "Course Detail" },
  { value: "placements", label: "Placements" },
  { value: "gallery", label: "Gallery" },
  { value: "blog", label: "Blog" },
  { value: "contact", label: "Contact" },
];

const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBanners = async () => {
    try {
      setPageLoading(true);
      const data = await getAdminBannersApi();
      setBanners(data.banners || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch banners");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingBannerId(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
  };

  const openEditForm = (banner) => {
    setEditingBannerId(banner._id);

    setFormData({
      page: banner.page || "home",
      type: banner.type || "page",
      title: banner.title || "",
      subtitle: banner.subtitle || "",
      buttonText: banner.buttonText || "",
      buttonLink: banner.buttonLink || "",
      order: String(banner.order || 0),
      isVisible: Boolean(banner.isVisible),
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

      if (editingBannerId) {
        await updateBannerApi(editingBannerId, payload);
      } else {
        await createBannerApi(payload);
      }

      resetForm();
      setShowForm(false);
      fetchBanners();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (editingBannerId ? "Failed to update banner" : "Failed to create banner")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBannerApi(id);
      fetchBanners();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete banner");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-dark">Manage Banners</h2>
          <p className="text-textGray mt-2">
            Manage home slider images and page banner images.
          </p>
        </div>

        <button onClick={openAddForm} className="primary-btn">
          <Plus size={18} className="mr-2" />
          Add Banner
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
            {editingBannerId ? "Edit Banner" : "Add New Banner"}
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <select
              name="page"
              value={formData.page}
              onChange={handleChange}
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary text-textGray"
            >
              {pages.map((page) => (
                <option key={page.value} value={page.value}>
                  {page.label}
                </option>
              ))}
            </select>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary text-textGray"
            >
              <option value="slider">Home Slider</option>
              <option value="page">Page Banner</option>
            </select>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Banner Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Banner Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              placeholder="Button Text"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="buttonLink"
              value={formData.buttonLink}
              onChange={handleChange}
              placeholder="Button Link e.g. /contact"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="order"
              value={formData.order}
              onChange={handleChange}
              type="number"
              placeholder="Order"
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
                : editingBannerId
                ? "Update Banner"
                : "Save Banner"}
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
          Loading banners...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {banners.map((banner) => {
            // Find the display label matching the database page value
            const matchedPage = pages.find((p) => p.value === banner.page);
            const displayPageLabel = matchedPage ? matchedPage.label : banner.page;

            return (
              <div
                key={banner._id}
                className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden"
              >
                <div className="h-[220px] bg-lightBg flex items-center justify-center overflow-hidden">
                  {banner.image?.url ? (
                    <img
                      src={banner.image.url}
                      alt={banner.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image size={42} className="text-primary" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {displayPageLabel}
                    </span>

                    <span className="text-xs font-bold text-dark bg-lightBg px-3 py-1 rounded-full">
                      {banner.type}
                    </span>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        banner.isVisible
                          ? "text-green-600 bg-green-50"
                          : "text-red-600 bg-red-50"
                      }`}
                    >
                      {banner.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-dark mt-4">
                    {banner.title || "No title"}
                  </h3>

                  <p className="text-textGray text-sm leading-6 mt-2">
                    {banner.subtitle || "No subtitle"}
                  </p>

                  <p className="text-sm font-bold text-primary mt-3">
                    Order: {banner.order}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => openEditForm(banner)}
                      className="secondary-btn flex-1 text-sm px-3"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="flex-1 inline-flex items-center justify-center bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-button font-bold hover:bg-red-100 transition text-sm"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {banners.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
              No banners found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageBanners;