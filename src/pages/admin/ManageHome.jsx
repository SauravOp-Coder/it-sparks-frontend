import { useEffect, useState } from "react";
import { getHomeContentApi, updateHomeContentApi } from "../../api/homeApi";
import { Plus, Trash2 } from "lucide-react";

const emptyForm = {
  heroBadge: "",
  heroHeading: "",
  heroSubheading: "",
  primaryButtonText: "",
  primaryButtonLink: "",
  secondaryButtonText: "",
  secondaryButtonLink: "",
  popularCoursesTitle: "",
  popularCoursesSubtitle: "",
  whyChooseTitle: "",
  whyChooseSubtitle: "",
  trainingTitle: "",
  trainingSubtitle: "",
  placementTitle: "",
  placementSubtitle: "",
  recruiterTitle: "",
  recruiterSubtitle: "",
  ctaTitle: "",
  ctaSubtitle: "",
  ctaButtonText: "",
  ctaButtonLink: "",
  whyChooseCardsText: "",
  trainingStepsText: "",
  placementSupportCardsText: "",
  recruitersText: "",
  heroImage: null,
  homeSections: [],
  faqs: [],
};

const createEmptySection = () => ({
  type: "paragraph",
  title: "",
  content: "",
  itemsText: "",
  textCase: "normal",
  layout: "full",
});

const createEmptyFaq = () => ({
  question: "",
  answer: "",
});

const ManageHome = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [currentHeroImage, setCurrentHeroImage] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const addHomeSection = () => {
    setFormData((prev) => ({
      ...prev,
      homeSections: [...(prev.homeSections || []), createEmptySection()],
    }));
  };

  const removeHomeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      homeSections: (prev.homeSections || []).filter((_, i) => i !== index),
    }));
  };

  const updateHomeSection = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      homeSections: (prev.homeSections || []).map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), createEmptyFaq()],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  };

  const updateFaq = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

const fetchHomeContent = async () => {
  try {
    setPageLoading(true);
    const data = await getHomeContentApi();
    const home = data.homeContent || {};

    setFormData({
      heroBadge: home.heroBadge || "",
      heroHeading: home.heroHeading || "",
      heroSubheading: home.heroSubheading || "",
      primaryButtonText: home.primaryButtonText || "",
      primaryButtonLink: home.primaryButtonLink || "",
      secondaryButtonText: home.secondaryButtonText || "",
      secondaryButtonLink: home.secondaryButtonLink || "",
      popularCoursesTitle: home.popularCoursesTitle || "",
      popularCoursesSubtitle: home.popularCoursesSubtitle || "",
      whyChooseTitle: home.whyChooseTitle || "",
      whyChooseSubtitle: home.whyChooseSubtitle || "",
      trainingTitle: home.trainingTitle || "",
      trainingSubtitle: home.trainingSubtitle || "",
      placementTitle: home.placementTitle || "",
      placementSubtitle: home.placementSubtitle || "",
      recruiterTitle: home.recruiterTitle || "",
      recruiterSubtitle: home.recruiterSubtitle || "",
      ctaTitle: home.ctaTitle || "",
      ctaSubtitle: home.ctaSubtitle || "",
      ctaButtonText: home.ctaButtonText || "",
      ctaButtonLink: home.ctaButtonLink || "",
      heroImage: null,
      homeSections: Array.isArray(home.homeSections)
        ? home.homeSections.map((section) => ({
            type: section.type || "paragraph",
            title: section.title || "",
            content: section.content || "",
            itemsText: Array.isArray(section.items)
              ? section.items.join("\n")
              : "",
            textCase: section.textCase || "normal",
            layout: section.layout || "full",
          }))
        : [],
      faqs: Array.isArray(home.faqs)
        ? home.faqs.map((faq) => ({
            question: faq.question || "",
            answer: faq.answer || "",
          }))
        : [],

      // New mapped fields added below
      whyChooseCardsText: Array.isArray(home.whyChooseCards)
        ? home.whyChooseCards
            .map((item) => `${item.title} | ${item.text}`)
            .join("\n")
        : "",

      trainingStepsText: Array.isArray(home.trainingSteps)
        ? home.trainingSteps
            .map((item) => `${item.number} | ${item.title} | ${item.text}`)
            .join("\n")
        : "",

      placementSupportCardsText: Array.isArray(home.placementSupportCards)
        ? home.placementSupportCards
            .map((item) => `${item.title} | ${item.text}`)
            .join("\n")
        : "",

      recruitersText: Array.isArray(home.recruiters)
        ? home.recruiters.join(", ")
        : "",
    });

    setCurrentHeroImage(home.heroImage?.url || "");
  } catch (error) {
    setError(error.response?.data?.message || "Failed to fetch home content");
  } finally {
    setPageLoading(false);
  }
};

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildPayload = () => {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "heroImage") {
        if (value) payload.append("heroImage", value);
      } else if (key === "homeSections") {
        payload.append(
          "homeSections",
          JSON.stringify(
            (value || []).map((section) => ({
              type: section.type,
              title: section.title,
              content: section.content,
              textCase: section.textCase,
              layout: section.layout,
              items: section.itemsText
                ? section.itemsText
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : [],
            }))
          )
        );
      } else if (key === "faqs") {
        payload.append(
          "faqs",
          JSON.stringify((value || []).map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          })))
        );
      } else {
        payload.append(key, value ?? "");
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

    await updateHomeContentApi(payload);

    alert("Home content updated successfully");
    await fetchHomeContent();
  } catch (error) {
    setError(error.response?.data?.message || "Failed to update home content");
  } finally {
    setLoading(false);
  }
};

  if (pageLoading) {
    return (
      <div className="bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
        Loading home content...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-dark">Manage Home Page</h2>
        <p className="text-textGray mt-2">
          Update hero section, homepage titles, CTA content, and hero image.
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-100 text-green-700 rounded-button px-4 py-3 text-sm font-semibold mb-6">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-borderSoft rounded-card shadow-card p-7"
      >


        <h3 className="text-xl font-extrabold text-dark mt-10 mb-6">
          Homepage Section Content
        </h3>
        <p className="mb-6 rounded-button border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-7 text-textGray">
        add sections and FAQs to the homepage. For sections, you can choose the type (heading, paragraph, bullet list, numbered list, or highlight) and provide the content. For bullet and numbered lists, add one item per line in the provided textarea.
        </p>

        <div className="mt-6 border-t border-borderSoft pt-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-dark">Custom Home Sections</h4>
            <button type="button" onClick={addHomeSection} className="secondary-btn flex items-center gap-1 py-1.5 px-3 text-sm">
              <Plus size={16} /> Add Section
            </button>
          </div>

          {(formData.homeSections || []).map((section, index) => (
            <div key={index} className="relative mb-4 rounded-card border border-borderSoft bg-lightBg/50 p-4">
              <button
                type="button"
                onClick={() => removeHomeSection(index)}
                className="absolute right-4 top-4 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>

              <div className="grid gap-4 md:grid-cols-3">
                <input
                  value={section.title}
                  onChange={(e) => updateHomeSection(index, "title", e.target.value)}
                  placeholder="Section Title"
                  className="rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
                />
                <select
                  value={section.type}
                  onChange={(e) => updateHomeSection(index, "type", e.target.value)}
                  className="rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="heading">Heading</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="bulletList">Bullet List</option>
                  <option value="numberedList">Numbered List</option>
                  <option value="highlight">Highlight</option>
                </select>
                <select
                  value={section.layout || "full"}
                  onChange={(e) => updateHomeSection(index, "layout", e.target.value)}
                  className="rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="full">Full width</option>
                  <option value="split">Two columns</option>
                </select>
              </div>

              <textarea
                value={section.content}
                onChange={(e) => updateHomeSection(index, "content", e.target.value)}
                placeholder="Section Content"
                rows="3"
                className="mt-3 w-full resize-none rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
              />

              {(section.type === "bulletList" || section.type === "numberedList") && (
                <textarea
                  value={section.itemsText || ""}
                  onChange={(e) => updateHomeSection(index, "itemsText", e.target.value)}
                  placeholder="Add one list item per line"
                  rows="4"
                  className="mt-3 w-full resize-none rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-borderSoft pt-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-dark">FAQ Section</h4>
            <button type="button" onClick={addFaq} className="secondary-btn flex items-center gap-1 py-1.5 px-3 text-sm">
              <Plus size={16} /> Add FAQ
            </button>
          </div>

          {(formData.faqs || []).map((faq, index) => (
            <div key={index} className="relative mb-4 rounded-card border border-borderSoft bg-lightBg/50 p-4">
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="absolute right-4 top-4 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>

              <input
                value={faq.question}
                onChange={(e) => updateFaq(index, "question", e.target.value)}
                placeholder="Question"
                className="w-full rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
              />

              <textarea
                value={faq.answer}
                onChange={(e) => updateFaq(index, "answer", e.target.value)}
                placeholder="Answer"
                rows="3"
                className="mt-3 w-full resize-none rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
  <label className="font-bold text-dark">
    Recruiters / Hiring Partners
  </label>
  <p className="text-sm text-textGray mt-1 mb-2">
    Enter company names separated by commas to show them on the homepage.
  </p>
  <textarea
    name="recruitersText"
    value={formData.recruitersText}
    onChange={handleChange}
    rows="4"
    placeholder="TCS, Infosys, Wipro, Capgemini, Accenture, Cognizant"
    className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
  />
</div>
        </div>

        <h3 className="text-xl font-extrabold text-dark mt-10 mb-6">
          CTA Section
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="ctaTitle"
            value={formData.ctaTitle}
            onChange={handleChange}
            placeholder="CTA Title"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="ctaSubtitle"
            value={formData.ctaSubtitle}
            onChange={handleChange}
            placeholder="CTA Subtitle"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="ctaButtonText"
            value={formData.ctaButtonText}
            onChange={handleChange}
            placeholder="CTA Button Text"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="ctaButtonLink"
            value={formData.ctaButtonLink}
            onChange={handleChange}
            placeholder="CTA Button Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <button type="submit" disabled={loading} className="primary-btn mt-8">
          {loading ? "Saving..." : "Save Home Content"}
        </button>
      </form>
    </div>
  );
};

export default ManageHome;