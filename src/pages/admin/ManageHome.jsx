import { useEffect, useState } from "react";
import { getHomeContentApi, updateHomeContentApi } from "../../api/homeApi";

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
  });

  const [faqs, setFaqs] = useState([]);
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

    if (Array.isArray(home.faqs)) {
      setFaqs(
        home.faqs.map((faq, idx) => ({
          question: faq.question || "",
          answer: faq.answer || "",
          order: faq.order ?? idx,
        }))
      );
    } else {
      setFaqs([]);
    }
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      const payload = {
        ...formData,
        faqs: faqs,
      };

      const response = await updateHomeContentApi(payload);

      if (response?.homeContent) {
        populateData(response.homeContent);
      }

      setSuccess("Home page saved and updated successfully!");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save configuration");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="bg-white border border-borderSoft rounded-card p-10 text-center text-textGray">
        Loading Page Settings...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-dark">Manage Home Page</h2>
        <p className="text-textGray mt-1">Configure section titles, cards, and FAQs live.</p>
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
        {/* FAQs Management Block */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-dark">Frequently Asked Questions</h3>
              <p className="text-sm text-textGray">Add and remove questions displayed on your main site.</p>
            </div>
            <button
              type="button"
              onClick={addFaq}
              className="px-4 py-2 bg-primary text-white font-bold rounded-button text-sm hover:opacity-90 transition-all"
            >
              + Add FAQ
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-dark block mb-1">Section Title</label>
              <input
                name="faqTitle"
                value={formData.faqTitle}
                onChange={handleChange}
                placeholder="Frequently Asked Questions"
                className="w-full border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-dark block mb-1">Section Subtitle</label>
              <input
                name="faqSubtitle"
                value={formData.faqSubtitle}
                onChange={handleChange}
                placeholder="Find answers to common questions."
                className="w-full border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 border border-borderSoft rounded-button bg-gray-50 relative space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-textGray">FAQ #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-500 hover:text-red-700 font-bold text-xs"
                  >
                    ✕ Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                  placeholder="Question..."
                  className="w-full border border-borderSoft rounded-button px-3 py-2 text-sm bg-white outline-none focus:border-primary"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                  placeholder="Answer..."
                  rows="3"
                  className="w-full border border-borderSoft rounded-button px-3 py-2 text-sm bg-white outline-none focus:border-primary resize-none"
                />
              </div>
            ))}

            {faqs.length === 0 && (
              <p className="text-textGray text-sm italic text-center py-4">
                No FAQs added yet. Click "+ Add FAQ" above to start.
              </p>
            )}
          </div>
        </div>

        {/* Why Choose Section Block */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">Why Choose Us Section</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="whyChooseTitle"
              value={formData.whyChooseTitle}
              onChange={handleChange}
              placeholder="Title"
              className="border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <input
              name="whyChooseSubtitle"
              value={formData.whyChooseSubtitle}
              onChange={handleChange}
              placeholder="Subtitle"
              className="border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-dark block mb-1">
              Cards List (Format per line: Title | Text)
            </label>
            <textarea
              name="whyChooseCardsText"
              value={formData.whyChooseCardsText}
              onChange={handleChange}
              rows="4"
              placeholder="Live Projects | Build real software&#10;Mentorship | Learn from industry experts"
              className="w-full border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary font-mono resize-y"
            />
          </div>
        </div>

        {/* Placement & Recruiters Block */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">Placement & Recruiters</h3>
          <div>
            <label className="text-xs font-bold text-dark block mb-1">
              Recruiters (Comma separated)
            </label>
            <input
              name="recruitersText"
              value={formData.recruitersText}
              onChange={handleChange}
              placeholder="Google, Microsoft, TCS, Infosys"
              className="w-full border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* CTA Section Block */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">Call To Action (CTA) Section</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="ctaTitle"
              value={formData.ctaTitle}
              onChange={handleChange}
              placeholder="CTA Heading"
              className="border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <input
              name="ctaSubtitle"
              value={formData.ctaSubtitle}
              onChange={handleChange}
              placeholder="CTA Subheading"
              className="border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <input
              name="ctaButtonText"
              value={formData.ctaButtonText}
              onChange={handleChange}
              placeholder="Button Label (e.g. Get Started)"
              className="border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <input
              name="ctaButtonLink"
              value={formData.ctaButtonLink}
              onChange={handleChange}
              placeholder="Button Link (e.g. /contact)"
              className="border border-borderSoft rounded-button px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-white font-bold rounded-button shadow hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? "Saving Configuration..." : "Save Home Content"}
        </button>
      </form>
    </div>
  );
};

export default ManageHome;