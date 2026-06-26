import { useEffect, useState } from "react";
import {
  createGalleryApi,
  deleteGalleryApi,
  getAdminGalleryApi,
  updateGalleryApi,
} from "../../api/galleryApi";
import { Camera, Edit, Plus, Trash2, X } from "lucide-react";

const emptyForm = {
  title: "",
  category: "",
  isVisible: true,
  image: null,
};

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [currentImage, setCurrentImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGallery = async () => {
    try {
      setPageLoading(true);
      setError("");

      const data = await getAdminGalleryApi();
      setGallery(data.galleryItems || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch gallery");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingGalleryId(null);
    setCurrentImage("");
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
  };

  const openEditForm = (item) => {
    setEditingGalleryId(item._id);

    setFormData({
      title: item.title || "",
      category: item.category || "",
      isVisible: Boolean(item.isVisible),
      image: null,
    });

    setCurrentImage(item.image?.url || "");
    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
    setError("");
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

    payload.append("title", formData.title);
    payload.append("category", formData.category);
    payload.append("isVisible", formData.isVisible);

    if (formData.image) {
      payload.append("image", formData.image);
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Gallery title is required");
      return;
    }

    if (!formData.category.trim()) {
      setError("Gallery category is required");
      return;
    }

    if (!editingGalleryId && !formData.image) {
      setError("Gallery image is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = buildPayload();

      if (editingGalleryId) {
        await updateGalleryApi(editingGalleryId, payload);
      } else {
        await createGalleryApi(payload);
      }

      await fetchGallery();
      closeForm();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (editingGalleryId
            ? "Failed to update gallery item"
            : "Failed to add gallery item")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteGalleryApi(id);
      await fetchGallery();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete gallery item");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-dark">
            Manage Gallery
          </h2>
          <p className="text-textGray mt-2">
            Upload, edit, hide/show, and delete gallery images.
          </p>
        </div>

        <button onClick={openAddForm} className="primary-btn">
          <Plus size={18} className="mr-2" />
          Add Gallery Image
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
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-extrabold text-dark">
              {editingGalleryId ? "Edit Gallery Image" : "Add Gallery Image"}
            </h3>

            <button
              type="button"
              onClick={closeForm}
              className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-red-500 transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Image Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category e.g. Classroom, Workshop"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="md:col-span-2 border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          {currentImage && (
            <div className="mt-5">
              <p className="font-bold text-dark mb-3">Current Image</p>
              <img
                src={currentImage}
                alt="Current Gallery"
                className="w-full max-w-md h-[220px] object-cover rounded-card border border-borderSoft"
              />
            </div>
          )}

          <label className="flex items-center gap-2 font-semibold text-dark mt-5">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
            />
            Visible on public website
          </label>

          <div className="flex gap-3 mt-6">
            <button type="submit" disabled={loading} className="primary-btn">
              {loading
                ? "Saving..."
                : editingGalleryId
                ? "Update Image"
                : "Save Image"}
            </button>

            <button type="button" onClick={closeForm} className="secondary-btn">
              Cancel
            </button>
          </div>
        </form>
      )}

      {pageLoading ? (
        <div className="bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
          Loading gallery...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden"
            >
              <div className="h-[220px] bg-gradient-to-br from-primary/20 via-lightBg to-white flex items-center justify-center overflow-hidden">
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-[24px] bg-primary text-white flex items-center justify-center">
                    <Camera size={38} />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="inline-flex text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {item.category || "Gallery"}
                  </span>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.isVisible
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {item.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-dark mt-4">
                  {item.title}
                </h3>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => openEditForm(item)}
                    className="secondary-btn flex-1 text-sm px-3"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 inline-flex items-center justify-center bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-button font-bold hover:bg-red-100 transition text-sm"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {gallery.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
              No gallery items found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageGallery;