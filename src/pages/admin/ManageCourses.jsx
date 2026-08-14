import { useEffect, useRef, useState } from "react";
import {
  createCourseApi,
  deleteCourseApi,
  getAdminCoursesApi,
  updateCourseApi,
} from "../../api/courseApi";
import { Edit, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  title: "",
  dropdownName: "",
  category: "",
  description: "",
  duration: "",
  mode: "",
  level: "",
  syllabusText: "",
  careerOptions: "",
  overview: "",
  isPopular: false,
  isVisible: true,
  image: null,
  brochure: null,
  detailSections: [],
};

const createEmptySection = () => ({
  type: "paragraph",
  title: "",
  content: "",
  itemsText: "",
  textCase: "normal",
});

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(emptyForm);

  const imageInputRef = useRef(null);
  const brochureInputRef = useRef(null);

  const resetFileInputs = () => {
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (brochureInputRef.current) brochureInputRef.current.value = "";
  };

  const addDetailSection = () => {
    setFormData((prev) => ({
      ...prev,
      detailSections: [...prev.detailSections, createEmptySection()],
    }));
  };

  const removeDetailSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      detailSections: prev.detailSections.filter((_, i) => i !== index),
    }));
  };

  const updateDetailSection = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      detailSections: prev.detailSections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const fetchCourses = async () => {
    try {
      setPageLoading(true);
      const data = await getAdminCoursesApi();
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch courses");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingCourseId(null);
    resetFileInputs();
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setError("");
  };

  const openEditForm = (course) => {
    setEditingCourseId(course._id);

    setFormData({
      title: course.title || "",
      dropdownName: course.dropdownName || "",
      category: course.category || "",
      duration: course.duration || "",
      mode: course.mode || "",
      level: course.level || "",
      description: course.description || "",
      overview: course.overview || "",
      syllabusText: Array.isArray(course.syllabus)
        ? course.syllabus.join(", ")
        : "",
      careerOptions: Array.isArray(course.careerOptions)
        ? course.careerOptions.join(", ")
        : "",
      isPopular: Boolean(course.isPopular),
      isVisible: Boolean(course.isVisible),
      image: null,
      brochure: null,
      detailSections: Array.isArray(course.detailSections)
        ? course.detailSections.map((section) => ({
            type: section.type || "paragraph",
            title: section.title || "",
            content: section.content || "",
            itemsText: Array.isArray(section.items)
              ? section.items.join("\n")
              : "",
            textCase: section.textCase || "normal",
          }))
        : [],
    });

    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildPayload = () => {
    const payload = new FormData();

    payload.append("title", formData.title);
    payload.append("dropdownName", formData.dropdownName);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("duration", formData.duration);
    payload.append("mode", formData.mode);
    payload.append("level", formData.level);
    payload.append("syllabus", formData.syllabusText);
    payload.append("careerOptions", formData.careerOptions);
    payload.append("overview", formData.overview);
    payload.append("isPopular", formData.isPopular);
    payload.append("isVisible", formData.isVisible);

    const sectionsForBackend = formData.detailSections.map((section) => ({
      type: section.type,
      title: section.title,
      content: section.content,
      textCase: section.textCase,
      items: section.itemsText
        ? section.itemsText
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
    }));

    payload.append("detailSections", JSON.stringify(sectionsForBackend));

    if (formData.image) payload.append("image", formData.image);
    if (formData.brochure) payload.append("brochure", formData.brochure);

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = buildPayload();

      if (editingCourseId) {
        await updateCourseApi(editingCourseId, payload);
      } else {
        await createCourseApi(payload);
      }

      resetForm();
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (editingCourseId ? "Failed to update course" : "Failed to create course")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await deleteCourseApi(id);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete course");
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-dark">Manage Courses</h2>
          <p className="text-textGray mt-2">
            Add, edit, delete, and manage course content.
          </p>
        </div>

        <button onClick={openAddForm} className="primary-btn flex items-center justify-center">
          <Plus size={18} className="mr-2" />
          Add Course
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
            {editingCourseId ? "Edit Course" : "Add New Course"}
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Course Title (Main Detail Page)"
              required
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            {/* Added input field UI for dropdownName */}
            <input
              name="dropdownName"
              value={formData.dropdownName}
              onChange={handleChange}
              placeholder="Dropdown Name (Optional - for Navbar menu)"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              placeholder="Mode: Online / Offline"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <input
              name="level"
              value={formData.level}
              onChange={handleChange}
              placeholder="Level"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-textGray px-1">Course Banner Image</label>
              <input
                ref={imageInputRef}
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="border border-borderSoft rounded-button px-4 py-2 outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-textGray px-1">Course Brochure (PDF)</label>
              <input
                ref={brochureInputRef}
                name="brochure"
                type="file"
                accept=".pdf"
                onChange={handleChange}
                className="border border-borderSoft rounded-button px-4 py-2 outline-none focus:border-primary"
              />
            </div>
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short Description"
            rows="3"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            placeholder="Course Overview"
            rows="4"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

          <textarea
            name="syllabusText"
            value={formData.syllabusText}
            onChange={handleChange}
            placeholder="Syllabus comma separated e.g. HTML, CSS, JavaScript"
            rows="3"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

          <textarea
            name="careerOptions"
            value={formData.careerOptions}
            onChange={handleChange}
            placeholder="Career options comma separated e.g. Frontend Developer, Backend Developer"
            rows="3"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
          />

          {/* Dynamic Detail Sections */}
          <div className="mt-6 border-t border-borderSoft pt-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-dark text-lg">Detail Sections</h4>
              <button type="button" onClick={addDetailSection} className="secondary-btn flex items-center gap-1 py-1.5 px-3 text-sm">
                <Plus size={16} /> Add Section
              </button>
            </div>
            
            {formData.detailSections.map((section, index) => (
              <div key={index} className="p-4 border border-borderSoft rounded-card mb-4 bg-lightBg/50 relative">
                <button 
                  type="button" 
                  onClick={() => removeDetailSection(index)} 
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  aria-label="Delete Section"
                >
                  <Trash2 size={16} />
                </button>
                <div className="grid md:grid-cols-3 gap-4 mb-3 pr-8">
                  <input
                    value={section.title}
                    onChange={(e) => updateDetailSection(index, "title", e.target.value)}
                    placeholder="Section Title"
                    className="border border-borderSoft rounded-button px-3 py-2 text-sm outline-none bg-white"
                  />
                  <select
                    value={section.type}
                    onChange={(e) => updateDetailSection(index, "type", e.target.value)}
                    className="border border-borderSoft rounded-button px-3 py-2 text-sm outline-none bg-white"
                  >
                    <option value="paragraph">Paragraph</option>
                    <option value="list">List</option>
                  </select>
                  <select
                    value={section.textCase}
                    onChange={(e) => updateDetailSection(index, "textCase", e.target.value)}
                    className="border border-borderSoft rounded-button px-3 py-2 text-sm outline-none bg-white"
                  >
                    <option value="normal">Normal Case</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                  </select>
                </div>
                <textarea
                  value={section.content}
                  onChange={(e) => updateDetailSection(index, "content", e.target.value)}
                  placeholder="Section Content"
                  rows="2"
                  className="w-full border border-borderSoft rounded-button px-3 py-2 text-sm outline-none resize-none bg-white mb-3"
                />
                {section.type === "list" && (
                  <textarea
                    value={section.itemsText}
                    onChange={(e) => updateDetailSection(index, "itemsText", e.target.value)}
                    placeholder="List Items (One per line)"
                    rows="3"
                    className="w-full border border-borderSoft rounded-button px-3 py-2 text-sm outline-none resize-none bg-white"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mt-5">
            <label className="flex items-center gap-2 font-semibold text-dark cursor-pointer">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
              />
              Popular Course
            </label>

            <label className="flex items-center gap-2 font-semibold text-dark cursor-pointer">
              <input
                type="checkbox"
                name="isVisible"
                checked={formData.isVisible}
                onChange={handleChange}
              />
              Visible
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="submit" disabled={loading} className="primary-btn">
              {loading
                ? "Saving..."
                : editingCourseId
                ? "Update Course"
                : "Save Course"}
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

      {/* Course List Section */}
      <div className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden">
        <div className="p-6 border-b border-borderSoft">
          <h3 className="text-xl font-extrabold text-dark">Course List</h3>
        </div>

        {pageLoading ? (
          <div className="p-10 text-center text-textGray">Loading courses...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-lightBg">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Duration</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-dark">Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className="border-t border-borderSoft">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {course.image?.url ? (
                          <img
                            src={course.image.url}
                            alt={course.title}
                            className="h-14 w-14 rounded-button object-cover border border-borderSoft"
                          />
                        ) : (
                          <div className="h-14 w-14 rounded-button bg-primary/10 text-primary flex items-center justify-center font-extrabold">
                            {course.title?.charAt(0)}
                          </div>
                        )}

                        <div>
                          <p className="font-extrabold text-dark">{course.title}</p>
                          {course.dropdownName && (
                            <p className="text-xs text-primary font-semibold">
                              Dropdown: {course.dropdownName}
                            </p>
                          )}
                          <p className="text-sm text-textGray mt-1 max-w-[420px]">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-textGray">{course.duration}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          course.isVisible
                            ? "text-green-600 bg-green-50"
                            : "text-red-600 bg-red-50"
                        }`}
                      >
                        {course.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditForm(course)}
                          aria-label="Edit Course"
                          className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-primary transition"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(course._id)}
                          aria-label="Delete Course"
                          className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-red-500 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {courses.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-textGray">
                      No courses found.
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

export default ManageCourses;