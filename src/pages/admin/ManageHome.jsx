import { useEffect, useState } from "react";
import { getHomeContentApi, updateHomeContentApi } from "../../api/homeApi";
import { Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";

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
  const [imagePreview, setImagePreview] = useState("");
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
      setError("");
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
      setImagePreview("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch home content");
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
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
        setImagePreview(URL.createObjectURL(file));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const parsePipeDelimitedCards = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|").map((p) => p.trim());
        return {
          title: parts[0] || "",
          text: parts[1] || "",
        };
      });
  };

  const parsePipeDelimitedSteps = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|").map((p) => p.trim());
        return {
          number: parts[0] || "",
          title: parts[1] || "",
          text: parts[2] || "",
        };
      });
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
          JSON.stringify(
            (value || []).map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))
          )
        );
      } else if (key === "whyChooseCardsText") {
        const parsed = parsePipeDelimitedCards(value);
        payload.append("whyChooseCards", JSON.stringify(parsed));
      } else if (key === "trainingStepsText") {
        const parsed = parsePipeDelimitedSteps(value);
        payload.append("trainingSteps", JSON.stringify(parsed));
      } else if (key === "placementSupportCardsText") {
        const parsed = parsePipeDelimitedCards(value);
        payload.append("placementSupportCards", JSON.stringify(parsed));
      } else if (key === "recruitersText") {
        const list = value
          ? value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [];
        payload.append("recruiters", JSON.stringify(list));
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
      setSuccess("");

      const payload = buildPayload();
      await updateHomeContentApi(payload);

      setSuccess("Home content updated successfully!");
      await fetchHomeContent();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update home content");
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
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-dark">Manage Home Page</h2>
        <p className="text-textGray mt-2">
          Update hero section, homepage titles, feature lists, CTA content, and hero image.
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-button px-4 py-3 text-sm font-semibold mb-6">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-button px-4 py-3 text-sm font-semibold mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-borderSoft rounded-card shadow-card p-7 space-y-10"
      >
        {/* HERO SECTION */}
        <div>
          <h3 className="text-xl font-extrabold text-dark border-b border-borderSoft pb-3 mb-6">
            Hero Section
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-dark mb-1">Hero Badge Text</label>
              <input
                name="heroBadge"
                value={formData.heroBadge}
                onChange={handleChange}
                placeholder="e.g. #1 IT Training Institute"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-dark mb-1">Hero Heading</label>
              <input
                name="heroHeading"
                value={formData.heroHeading}
                onChange={handleChange}
                placeholder="Main Hero Heading"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-dark mb-1">Hero Subheading</label>
              <textarea
                name="heroSubheading"
                value={formData.heroSubheading}
                onChange={handleChange}
                rows="3"
                placeholder="Brief description under main heading"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Primary Button Text</label>
              <input
                name="primaryButtonText"
                value={formData.primaryButtonText}
                onChange={handleChange}
                placeholder="e.g. Explore Courses"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Primary Button Link</label>
              <input
                name="primaryButtonLink"
                value={formData.primaryButtonLink}
                onChange={handleChange}
                placeholder="/courses"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Secondary Button Text</label>
              <input
                name="secondaryButtonText"
                value={formData.secondaryButtonText}
                onChange={handleChange}
                placeholder="e.g. Contact Us"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Secondary Button Link</label>
              <input
                name="secondaryButtonLink"
                value={formData.secondaryButtonLink}
                onChange={handleChange}
                placeholder="/contact"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            {/* HERO IMAGE UPLOAD */}
            <div className="md:col-span-2 mt-2">
              <label className="block text-sm font-bold text-dark mb-2">Hero Image</label>
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 border border-borderSoft rounded-card bg-lightBg/30">
                {(imagePreview || currentHeroImage) ? (
                  <div className="relative w-40 h-28 rounded-button overflow-hidden border border-borderSoft bg-white">
                    <img
                      src={imagePreview || currentHeroImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-28 rounded-button border border-dashed border-borderSoft bg-white flex flex-col items-center justify-center text-textGray">
                    <ImageIcon size={28} />
                    <span className="text-xs mt-1">No Image</span>
                  </div>
                )}

                <div className="flex-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-white border border-borderSoft text-dark px-4 py-2.5 rounded-button font-medium text-sm hover:border-primary transition-colors">
                    <Upload size={16} /> Choose New Image
                    <input
                      type="file"
                      name="heroImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-textGray mt-2">
                    PNG, JPG or WEBP. Max size 5MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION TITLES & SUBTITLES */}
        <div>
          <h3 className="text-xl font-extrabold text-dark border-b border-borderSoft pb-3 mb-6">
            Homepage Section Titles
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-dark mb-1">Popular Courses Title</label>
              <input
                name="popularCoursesTitle"
                value={formData.popularCoursesTitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-1">Popular Courses Subtitle</label>
              <input
                name="popularCoursesSubtitle"
                value={formData.popularCoursesSubtitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Why Choose Us Title</label>
              <input
                name="whyChooseTitle"
                value={formData.whyChooseTitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-1">Why Choose Us Subtitle</label>
              <input
                name="whyChooseSubtitle"
                value={formData.whyChooseSubtitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Training Steps Title</label>
              <input
                name="trainingTitle"
                value={formData.trainingTitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-1">Training Steps Subtitle</label>
              <input
                name="trainingSubtitle"
                value={formData.trainingSubtitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Placement Support Title</label>
              <input
                name="placementTitle"
                value={formData.placementTitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-1">Placement Support Subtitle</label>
              <input
                name="placementSubtitle"
                value={formData.placementSubtitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">Recruiters Title</label>
              <input
                name="recruiterTitle"
                value={formData.recruiterTitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-dark mb-1">Recruiters Subtitle</label>
              <input
                name="recruiterSubtitle"
                value={formData.recruiterSubtitle}
                onChange={handleChange}
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* STRUCTURED CARD / LIST TEXT AREAS */}
        <div>
          <h3 className="text-xl font-extrabold text-dark border-b border-borderSoft pb-3 mb-6">
            Feature & List Content
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block font-bold text-dark">Why Choose Us Cards</label>
              <p className="text-xs text-textGray mt-1 mb-2">
                Format each line as: <code className="bg-lightBg px-1.5 py-0.5 rounded text-dark">Title | Description</code>
              </p>
              <textarea
                name="whyChooseCardsText"
                value={formData.whyChooseCardsText}
                onChange={handleChange}
                rows="4"
                placeholder="Expert Mentors | Learn directly from industry veterans.&#10;Hands-on Projects | Build real-world applications."
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-dark">Training Steps</label>
              <p className="text-xs text-textGray mt-1 mb-2">
                Format each line as: <code className="bg-lightBg px-1.5 py-0.5 rounded text-dark">Step Number | Step Title | Description</code>
              </p>
              <textarea
                name="trainingStepsText"
                value={formData.trainingStepsText}
                onChange={handleChange}
                rows="4"
                placeholder="01 | Enrollment | Choose your preferred stack and get onboarded.&#10;02 | Live Training | Attend interactive live sessions with mentors."
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-dark">Placement Support Cards</label>
              <p className="text-xs text-textGray mt-1 mb-2">
                Format each line as: <code className="bg-lightBg px-1.5 py-0.5 rounded text-dark">Title | Description</code>
              </p>
              <textarea
                name="placementSupportCardsText"
                value={formData.placementSupportCardsText}
                onChange={handleChange}
                rows="4"
                placeholder="Resume Building | Crafted to pass ATS filters.&#10;Mock Interviews | Conducted by senior tech leads."
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-dark">Recruiters / Hiring Partners</label>
              <p className="text-xs text-textGray mt-1 mb-2">
                Enter company names separated by commas.
              </p>
              <textarea
                name="recruitersText"
                value={formData.recruitersText}
                onChange={handleChange}
                rows="3"
                placeholder="TCS, Infosys, Wipro, Capgemini, Accenture, Cognizant"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* CUSTOM HOME SECTIONS */}
        <div>
          <div className="flex items-center justify-between border-b border-borderSoft pb-3 mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-dark">Custom Home Sections</h3>
              <p className="text-xs text-textGray mt-1">
                Add flexible blocks (headings, lists, highlight blocks) to the page.
              </p>
            </div>
            <button
              type="button"
              onClick={addHomeSection}
              className="secondary-btn flex items-center gap-1.5 py-2 px-4 text-sm"
            >
              <Plus size={16} /> Add Section
            </button>
          </div>

          <div className="space-y-4">
            {(formData.homeSections || []).map((section, index) => (
              <div
                key={index}
                className="relative rounded-card border border-borderSoft bg-lightBg/40 p-5 transition-all"
              >
                <button
                  type="button"
                  onClick={() => removeHomeSection(index)}
                  className="absolute right-4 top-4 text-red-500 hover:text-red-700 p-1"
                  title="Remove Section"
                >
                  <Trash2 size={18} />
                </button>

                <div className="grid gap-4 md:grid-cols-3 pr-8">
                  <input
                    value={section.title}
                    onChange={(e) => updateHomeSection(index, "title", e.target.value)}
                    placeholder="Section Title"
                    className="rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <select
                    value={section.type}
                    onChange={(e) => updateHomeSection(index, "type", e.target.value)}
                    className="rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary"
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
                    className="rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  >
                    <option value="full">Full width</option>
                    <option value="split">Two columns</option>
                  </select>
                </div>

                <textarea
                  value={section.content}
                  onChange={(e) => updateHomeSection(index, "content", e.target.value)}
                  placeholder="Section Main Content / Description"
                  rows="3"
                  className="mt-3 w-full resize-none rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />

                {(section.type === "bulletList" || section.type === "numberedList") && (
                  <textarea
                    value={section.itemsText || ""}
                    onChange={(e) => updateHomeSection(index, "itemsText", e.target.value)}
                    placeholder="Add one list item per line"
                    rows="3"
                    className="mt-3 w-full resize-none rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary font-mono"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQS SECTION */}
        <div>
          <div className="flex items-center justify-between border-b border-borderSoft pb-3 mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-dark">FAQ Section</h3>
              <p className="text-xs text-textGray mt-1">
                Frequently asked questions for the home page.
              </p>
            </div>
            <button
              type="button"
              onClick={addFaq}
              className="secondary-btn flex items-center gap-1.5 py-2 px-4 text-sm"
            >
              <Plus size={16} /> Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {(formData.faqs || []).map((faq, index) => (
              <div
                key={index}
                className="relative rounded-card border border-borderSoft bg-lightBg/40 p-5"
              >
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="absolute right-4 top-4 text-red-500 hover:text-red-700 p-1"
                  title="Remove FAQ"
                >
                  <Trash2 size={18} />
                </button>

                <input
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary pr-10"
                />

                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="Answer"
                  rows="3"
                  className="mt-3 w-full resize-none rounded-button border border-borderSoft bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div>
          <h3 className="text-xl font-extrabold text-dark border-b border-borderSoft pb-3 mb-6">
            Call To Action (CTA) Section
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-dark mb-1">CTA Title</label>
              <input
                name="ctaTitle"
                value={formData.ctaTitle}
                onChange={handleChange}
                placeholder="Ready to Start Your Career?"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-dark mb-1">CTA Subtitle</label>
              <input
                name="ctaSubtitle"
                value={formData.ctaSubtitle}
                onChange={handleChange}
                placeholder="Join thousands of successful graduates who transformed their careers with us."
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">CTA Button Text</label>
              <input
                name="ctaButtonText"
                value={formData.ctaButtonText}
                onChange={handleChange}
                placeholder="Get Started Now"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1">CTA Button Link</label>
              <input
                name="ctaButtonLink"
                value={formData.ctaButtonLink}
                onChange={handleChange}
                placeholder="/apply"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 border-t border-borderSoft">
          <button
            type="submit"
            disabled={loading}
            className="primary-btn w-full md:w-auto px-8 py-3 text-base font-bold shadow-md hover:shadow-lg transition-all"
          >
            {loading ? "Saving Changes..." : "Save Home Content"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageHome;