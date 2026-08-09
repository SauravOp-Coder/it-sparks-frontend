import { useEffect, useState } from "react";
import {
  createPlacementApi,
  deletePlacementApi,
  getAdminPlacementsApi,
  updatePlacementApi,
} from "../../api/placementApi";
import { Edit, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  studentName: "",
  course: "",
  company: "",
  role: "",
  package: "",
  year: "",
  isVisible: true,
  image: null,
};

const ManagePlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlacementId, setEditingPlacementId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlacements = async () => {
    try {
      setPageLoading(true);
      const data = await getAdminPlacementsApi();
      setPlacements(data.placements || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch placements");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingPlacementId(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
  };

  const openEditForm = (placement) => {
    setEditingPlacementId(placement._id);
    setFormData({
      studentName: placement.studentName || "",
      course: placement.course || "",
      company: placement.company || "",
      role: placement.role || "",
      package: placement.package || "",
      year: placement.year || "",
      isVisible: Boolean(placement.isVisible),
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

      if (editingPlacementId) {
        await updatePlacementApi(editingPlacementId, payload);
      } else {
        await createPlacementApi(payload);
      }

      resetForm();
      setShowForm(false);
      fetchPlacements();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (editingPlacementId
            ? "Failed to update placement"
            : "Failed to create placement")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this placement record?"
    );
    if (!confirmDelete) return;

    try {
      await deletePlacementApi(id);
      fetchPlacements();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete placement");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-dark">Manage Placements</h2>
          <p className="text-textGray mt-2">
            Add, edit, hide/show, and delete placement records.
          </p>
        </div>

        <button onClick={openAddForm} className="primary-btn">
          <Plus size={18} className="mr-2" />
          Add Placement
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
            {editingPlacementId ? "Edit Placement" : "Add Placement Record"}
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

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Job Role"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="package"
              value={formData.package}
              onChange={handleChange}
              placeholder="Package e.g. 3.5 LPA"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
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
                : editingPlacementId
                ? "Update Placement"
                : "Save Placement"}
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
          <h3 className="text-xl font-extrabold text-dark">Placement Records</h3>
        </div>

        {pageLoading ? (
          <div className="p-10 text-center text-textGray">Loading placements...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-lightBg">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Company</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Package</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-dark">Actions</th>
                </tr>
              </thead>

              <tbody>
                {placements.map((item) => (
                  <tr key={item._id} className="border-t border-borderSoft">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
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
                          <p className="font-extrabold text-dark">{item.studentName}</p>
                          <p className="text-sm text-textGray">{item.year}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-textGray">{item.course}</td>
                    <td className="px-6 py-4 text-textGray">{item.company}</td>
                    <td className="px-6 py-4 text-textGray">{item.role}</td>
                    <td className="px-6 py-4 text-textGray">{item.package}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          item.isVisible
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}
                      >
                        {item.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
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
                    </td>
                  </tr>
                ))}

                {placements.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-textGray">
                      No placement records found.
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

export default ManagePlacements;