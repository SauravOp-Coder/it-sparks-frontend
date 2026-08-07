import { useEffect, useState } from "react";
import {
  getHomeContentApi,
  updateHomeContentApi,
} from "../../api/homeApi";
import { Plus, Trash2 } from "lucide-react";

const createSection = () => ({
  type: "paragraph",
  title: "",
  content: "",
  itemsText: "",
  layout: "full",
  textCase: "normal",
});

const createFaq = () => ({
  question: "",
  answer: "",
});

const ManageHome = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    homeSections: [],
    faqs: [],
    ctaTitle: "",
    ctaSubtitle: "",
    ctaButtonText: "",
    ctaButtonLink: "",
  });

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      setPageLoading(true);

      const data = await getHomeContentApi();
      const home = data.homeContent || {};

      setFormData({
        homeSections: Array.isArray(home.homeSections)
          ? home.homeSections.map((section) => ({
              type: section.type || "paragraph",
              title: section.title || "",
              content: section.content || "",
              layout: section.layout || "full",
              textCase: section.textCase || "normal",
              itemsText: Array.isArray(section.items)
                ? section.items.join("\n")
                : "",
            }))
          : [],

        faqs: Array.isArray(home.faqs)
          ? home.faqs.map((faq) => ({
              question: faq.question || "",
              answer: faq.answer || "",
            }))
          : [],

        ctaTitle: home.ctaTitle || "",
        ctaSubtitle: home.ctaSubtitle || "",
        ctaButtonText: home.ctaButtonText || "",
        ctaButtonLink: home.ctaButtonLink || "",
      });
    } catch (err) {
      setError("Failed to load home content.");
    } finally {
      setPageLoading(false);
    }
  };

  const handleCTAChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    /* ==========================================================
      HOME SECTIONS
  ========================================================== */

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      homeSections: [...prev.homeSections, createSection()],
    }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      homeSections: prev.homeSections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      homeSections: prev.homeSections.map((section, i) =>
        i === index
          ? {
              ...section,
              [field]: value,
            }
          : section
      ),
    }));
  };

  /* ==========================================================
      FAQS
  ========================================================== */

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, createFaq()],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const updateFaq = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index
          ? {
              ...faq,
              [field]: value,
            }
          : faq
      ),
    }));
  };

  /* ==========================================================
      BUILD PAYLOAD
  ========================================================== */

  const buildPayload = () => ({
    homeSections: formData.homeSections.map((section, index) => ({
      type: section.type,
      title: section.title.trim(),
      content: section.content.trim(),
      layout: section.layout,
      textCase: section.textCase,
      order: index,
      items:
        section.type === "bulletList" ||
        section.type === "numberedList"
          ? section.itemsText
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
    })),

    faqs: formData.faqs.map((faq, index) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
      order: index,
    })),

    ctaTitle: formData.ctaTitle.trim(),
    ctaSubtitle: formData.ctaSubtitle.trim(),
    ctaButtonText: formData.ctaButtonText.trim(),
    ctaButtonLink: formData.ctaButtonLink.trim(),
  });

  /* ==========================================================
      SAVE
  ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await updateHomeContentApi(buildPayload());

      setMessage("Home page updated successfully.");

      await fetchHome();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save home page."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="p-8 text-center">
        Loading Home Content...
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto">

    <div className="mb-8">
      <h1 className="text-3xl font-black text-dark">
        Manage Home Page
      </h1>

      <p className="text-textGray mt-2">
        Manage homepage sections, FAQs and CTA section.
      </p>
    </div>

    {message && (
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-green-700">
        {message}
      </div>
    )}

    {error && (
      <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-red-600">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ================================================= */}
      {/* HOME SECTIONS */}
      {/* ================================================= */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold">
              Home Sections
            </h2>

            <p className="text-sm text-textGray mt-1">
              Create dynamic content sections shown below the course cards.
            </p>

          </div>

          <button
            type="button"
            onClick={addSection}
            className="primary-btn flex items-center gap-2"
          >
            <Plus size={18} />
            Add Section
          </button>

        </div>

        {formData.homeSections.length === 0 && (
          <div className="rounded-xl border-2 border-dashed py-10 text-center text-textGray">
            No sections added yet.
          </div>
        )}

        {formData.homeSections.map((section, index) => (

          <div
            key={index}
            className="relative mb-8 rounded-xl border bg-gray-50 p-6"
          >

            <button
              type="button"
              onClick={() => removeSection(index)}
              className="absolute right-5 top-5 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>

            <div className="grid md:grid-cols-3 gap-4">

              <select
                value={section.type}
                onChange={(e) =>
                  updateSection(index, "type", e.target.value)
                }
                className="border rounded-lg p-3"
              >
                <option value="heading">Heading</option>
                <option value="paragraph">Paragraph</option>
                <option value="bulletList">Bullet List</option>
                <option value="numberedList">Numbered List</option>
                <option value="highlight">Highlight</option>
              </select>

              <select
                value={section.layout}
                onChange={(e) =>
                  updateSection(index, "layout", e.target.value)
                }
                className="border rounded-lg p-3"
              >
                <option value="full">Full Width</option>
                <option value="split">Split Layout</option>
              </select>

              <select
                value={section.textCase}
                onChange={(e) =>
                  updateSection(index, "textCase", e.target.value)
                }
                className="border rounded-lg p-3"
              >
                <option value="normal">Normal</option>
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
                <option value="capitalize">Capitalize</option>
              </select>

            </div>

            <input
              className="mt-4 w-full border rounded-lg p-3"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) =>
                updateSection(index, "title", e.target.value)
              }
            />

            <textarea
              rows={5}
              className="mt-4 w-full border rounded-lg p-3"
              placeholder="Section Content"
              value={section.content}
              onChange={(e) =>
                updateSection(index, "content", e.target.value)
              }
            />

            {(section.type === "bulletList" ||
              section.type === "numberedList") && (

              <textarea
                rows={6}
                className="mt-4 w-full border rounded-lg p-3"
                placeholder="One item per line"
                value={section.itemsText}
                onChange={(e) =>
                  updateSection(index, "itemsText", e.target.value)
                }
              />

            )}

          </div>

        ))}

      </div>

      {/* ================================================= */}
      {/* FAQ */}
      {/* ================================================= */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            FAQs
          </h2>

          <button
            type="button"
            onClick={addFaq}
            className="primary-btn flex items-center gap-2"
          >
            <Plus size={18} />
            Add FAQ
          </button>

        </div>

        {formData.faqs.map((faq, index) => (

          <div
            key={index}
            className="relative mb-6 rounded-xl border bg-gray-50 p-5"
          >

            <button
              type="button"
              onClick={() => removeFaq(index)}
              className="absolute top-5 right-5 text-red-500"
            >
              <Trash2 size={18} />
            </button>

            <input
              className="w-full border rounded-lg p-3"
              placeholder="Question"
              value={faq.question}
              onChange={(e) =>
                updateFaq(index, "question", e.target.value)
              }
            />

            <textarea
              rows={4}
              className="mt-4 w-full border rounded-lg p-3"
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) =>
                updateFaq(index, "answer", e.target.value)
              }
            />

          </div>

        ))}

      </div>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          CTA Section
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            name="ctaTitle"
            value={formData.ctaTitle}
            onChange={handleCTAChange}
            placeholder="CTA Title"
            className="border rounded-lg p-3"
          />

          <input
            name="ctaSubtitle"
            value={formData.ctaSubtitle}
            onChange={handleCTAChange}
            placeholder="CTA Subtitle"
            className="border rounded-lg p-3"
          />

          <input
            name="ctaButtonText"
            value={formData.ctaButtonText}
            onChange={handleCTAChange}
            placeholder="Button Text"
            className="border rounded-lg p-3"
          />

          <input
            name="ctaButtonLink"
            value={formData.ctaButtonLink}
            onChange={handleCTAChange}
            placeholder="/contact"
            className="border rounded-lg p-3"
          />

        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="primary-btn"
      >
        {loading ? "Saving..." : "Save Home Page"}
      </button>

    </form>

  </div>
);

export default ManageHome;