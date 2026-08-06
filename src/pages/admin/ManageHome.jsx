import { useEffect, useState } from "react";
import { getHomeContentApi, updateHomeContentApi } from "../../api/homeApi";

const defaultSections = [
  { key: "hero", title: "Hero Banner", enabled: true, order: 0 },
  { key: "courses", title: "Popular Courses", enabled: true, order: 1 },
  { key: "whyChoose", title: "Why Choose Us", enabled: true, order: 2 },
  { key: "training", title: "Training Process", enabled: true, order: 3 },
  { key: "placement", title: "Placement Support", enabled: true, order: 4 },
  { key: "recruiters", title: "Our Recruiters", enabled: true, order: 5 },
  { key: "reviews", title: "Student Reviews", enabled: true, order: 6 },
  { key: "faqs", title: "Frequently Asked Questions", enabled: true, order: 7 },
  { key: "cta", title: "Call To Action", enabled: true, order: 8 },
];

const ManageHome = () => {
  const [formData, setFormData] = useState({
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
    faqTitle: "",
    faqSubtitle: "",
    whyChooseCardsText: "",
    trainingStepsText: "",
    placementSupportCardsText: "",
    recruitersText: "",
    heroImage: null,
  });

  const [faqs, setFaqs] = useState([]);
  const [sections, setSections] = useState(defaultSections);
  const [currentHeroImage, setCurrentHeroImage] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const populateData = (home) => {
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
      faqTitle: home.faqTitle || "Frequently Asked Questions",
      faqSubtitle: home.faqSubtitle || "Find answers to common questions.",
      heroImage: null,

      whyChooseCardsText: Array.isArray(home.whyChooseCards)
        ? home.whyChooseCards.map((i) => `${i.title} | ${i.text}`).join("\n")
        : "",
      trainingStepsText: Array.isArray(home.trainingSteps)
        ? home.trainingSteps.map((i) => `${i.number} | ${i.title} | ${i.text}`).join("\n")
        : "",
      placementSupportCardsText: Array.isArray(home.placementSupportCards)
        ? home.placementSupportCards.map((i) => `${i.title} | ${i.text}`).join("\n")
        : "",
      recruitersText: Array.isArray(home.recruiters) ? home.recruiters.join(", ") : "",
    });

    setFaqs(Array.isArray(home.faqs) ? home.faqs : []);
    if (Array.isArray(home.sections) && home.sections.length > 0) {
      setSections([...home.sections].sort((a, b) => a.order - b.order));
    } else {
      setSections(defaultSections);
    }
    setCurrentHeroImage(home.heroImage?.url || "");
  };

  const fetchHomeContent = async () => {
    try {
      setPageLoading(true);
      const data = await getHomeContentApi();
      if (data?.homeContent) {
        populateData(data.homeContent);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load content");
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
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSection = (index) => {
    setSections((prev) =>
      prev.map((sec, i) => (i === index ? { ...sec, enabled: !sec.enabled } : sec))
    );
  };

  const moveSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setSections(updated.map((sec, idx) => ({ ...sec, order: idx })));
  };

  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "", order: prev.length }]);
  };

  const removeFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "heroImage") {
          if (value) payload.append("heroImage", value);
        } else {
          payload.append(key, value ?? "");
        }
      });

      payload.append("sections", JSON.stringify(sections));
      payload.append("faqs", JSON.stringify(faqs));

      const response = await updateHomeContentApi(payload);

      if (response?.homeContent) {
        populateData(response.homeContent);
      }

      setSuccess("Home content saved successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update home content");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="bg-white border border-borderSoft rounded-card p-10 text-center text-textGray">
        Loading Home Page Settings...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-dark">Manage Home Page</h2>
        <p className="text-textGray mt-1">Configure layout, titles, sections, and FAQs.</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-button px-4 py-3 font-bold text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-button px-4 py-3 font-bold text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section Reordering & Toggles */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm">
          <h3 className="text-xl font-extrabold text-dark mb-1">Homepage Section Layout</h3>
          <p className="text-sm text-textGray mb-6">Reorder or toggle visibility of sections live on your site.</p>

          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div
                key={sec.key}
                className="flex items-center justify-between p-4 border border-borderSoft rounded-button bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-gray-400">#{idx + 1}</span>
                  <span className="font-semibold text-dark">{sec.title}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => toggleSection(idx)}
                    className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                      sec.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {sec.enabled ? "Active" : "Hidden"}
                  </button>

                  <div className="flex space-x-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, -1)}
                      className="px-2 py-1 text-sm border border-borderSoft rounded bg-white disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveSection(idx, 1)}
                      className="px-2 py-1 text-sm border border-borderSoft rounded bg-white disabled:opacity-40"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section Form Fields */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">Hero Section</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="heroBadge"
              value={formData.heroBadge}
              onChange={handleChange}
              placeholder="Hero Badge"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="heroHeading"
              value={formData.heroHeading}
              onChange={handleChange}
              placeholder="Hero Heading"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="primaryButtonText"
              value={formData.primaryButtonText}
              onChange={handleChange}
              placeholder="Primary Button Text"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="primaryButtonLink"
              value={formData.primaryButtonLink}
              onChange={handleChange}
              placeholder="Primary Button Link"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="secondaryButtonText"
              value={formData.secondaryButtonText}
              onChange={handleChange}
              placeholder="Secondary Button Text"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="secondaryButtonLink"
              value={formData.secondaryButtonLink}
              onChange={handleChange}
              placeholder="Secondary Button Link"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="heroImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="md:col-span-2 border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <textarea
            name="heroSubheading"
            value={formData.heroSubheading}
            onChange={handleChange}
            placeholder="Hero Subheading"
            rows="3"
            className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
          />

          {currentHeroImage && (
            <div>
              <p className="font-bold text-dark mb-2">Current Hero Image</p>
              <img
                src={currentHeroImage}
                alt="Hero"
                className="w-full max-w-md h-48 object-cover rounded-card border border-borderSoft"
              />
            </div>
          )}
        </div>

        {/* Section Titles & Cards */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">Section Titles & Cards</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="popularCoursesTitle"
              value={formData.popularCoursesTitle}
              onChange={handleChange}
              placeholder="Popular Courses Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="popularCoursesSubtitle"
              value={formData.popularCoursesSubtitle}
              onChange={handleChange}
              placeholder="Popular Courses Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="whyChooseTitle"
              value={formData.whyChooseTitle}
              onChange={handleChange}
              placeholder="Why Choose Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="whyChooseSubtitle"
              value={formData.whyChooseSubtitle}
              onChange={handleChange}
              placeholder="Why Choose Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <div className="md:col-span-2">
              <label className="font-bold text-dark block mb-1">Why Choose Us Cards (Title | Text per line)</label>
              <textarea
                name="whyChooseCardsText"
                value={formData.whyChooseCardsText}
                onChange={handleChange}
                rows="4"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <input
              name="trainingTitle"
              value={formData.trainingTitle}
              onChange={handleChange}
              placeholder="Training Process Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="trainingSubtitle"
              value={formData.trainingSubtitle}
              onChange={handleChange}
              placeholder="Training Process Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <div className="md:col-span-2">
              <label className="font-bold text-dark block mb-1">Training Steps (Number | Title | Text per line)</label>
              <textarea
                name="trainingStepsText"
                value={formData.trainingStepsText}
                onChange={handleChange}
                rows="4"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <input
              name="placementTitle"
              value={formData.placementTitle}
              onChange={handleChange}
              placeholder="Placement Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="placementSubtitle"
              value={formData.placementSubtitle}
              onChange={handleChange}
              placeholder="Placement Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <div className="md:col-span-2">
              <label className="font-bold text-dark block mb-1">Placement Cards (Title | Text per line)</label>
              <textarea
                name="placementSupportCardsText"
                value={formData.placementSupportCardsText}
                onChange={handleChange}
                rows="4"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>

            <input
              name="recruiterTitle"
              value={formData.recruiterTitle}
              onChange={handleChange}
              placeholder="Recruiter Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="recruiterSubtitle"
              value={formData.recruiterSubtitle}
              onChange={handleChange}
              placeholder="Recruiter Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />

            <div className="md:col-span-2">
              <label className="font-bold text-dark block mb-1">Recruiters (Comma separated list)</label>
              <textarea
                name="recruitersText"
                value={formData.recruitersText}
                onChange={handleChange}
                rows="3"
                className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* FAQs Management Block */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-dark">FAQs Management</h3>
              <p className="text-sm text-textGray">Add and manage questions displayed on the home page.</p>
            </div>
            <button
              type="button"
              onClick={addFaq}
              className="px-4 py-2 bg-primary text-white font-bold rounded-button text-sm hover:opacity-90"
            >
              + Add FAQ
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="faqTitle"
              value={formData.faqTitle}
              onChange={handleChange}
              placeholder="FAQ Section Title"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
            <input
              name="faqSubtitle"
              value={formData.faqSubtitle}
              onChange={handleChange}
              placeholder="FAQ Section Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 border border-borderSoft rounded-button bg-gray-50 relative space-y-3">
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xs"
                >
                  ✕ Remove
                </button>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                  placeholder={`Question #${index + 1}`}
                  className="w-full border border-borderSoft rounded-button px-3 py-2 text-sm bg-white outline-none focus:border-primary"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                  placeholder={`Answer #${index + 1}`}
                  rows="2"
                  className="w-full border border-borderSoft rounded-button px-3 py-2 text-sm bg-white outline-none focus:border-primary resize-none"
                />
              </div>
            ))}
            {faqs.length === 0 && (
              <p className="text-textGray text-sm italic text-center py-4">No FAQs added yet.</p>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">CTA Section</h3>
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-white font-bold rounded-button shadow hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? "Saving Home Content..." : "Save Home Content"}
        </button>
      </form>
    </div>
  );
};

export default ManageHome;