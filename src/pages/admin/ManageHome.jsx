import { useEffect, useState } from "react";
import { getHomeContentApi, updateHomeContentApi } from "../../api/homeApi";

const ManageHome = () => {
  const [formData, setFormData] = useState({
    heroBadge: "", heroHeading: "", heroSubheading: "", primaryButtonText: "",
    primaryButtonLink: "", secondaryButtonText: "", secondaryButtonLink: "",
    popularCoursesTitle: "", popularCoursesSubtitle: "", whyChooseTitle: "",
    whyChooseSubtitle: "", trainingTitle: "", trainingSubtitle: "",
    placementTitle: "", placementSubtitle: "", recruiterTitle: "",
    recruiterSubtitle: "", ctaTitle: "", ctaSubtitle: "", ctaButtonText: "",
    ctaButtonLink: "", faqTitle: "", faqSubtitle: "",
    whyChooseCardsText: "", trainingStepsText: "", placementSupportCardsText: "",
    recruitersText: "", faqsText: "", // Added faqsText
  });

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
      
      // FORMAT FAQS ARRAY TO STRING: Question | Answer (1 per line)
      faqsText: Array.isArray(home.faqs)
        ? home.faqs.map((i) => `${i.question} | ${i.answer}`).join("\n")
        : "",
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await updateHomeContentApi(formData);

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
        {/* FAQs Block - Card Style */}
        <div className="bg-white border border-borderSoft rounded-card p-7 shadow-sm space-y-5">
          <h3 className="text-xl font-extrabold text-dark">FAQs Management</h3>

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

          <div>
            <label className="font-bold text-dark block mb-1">
              FAQs List (Question | Answer per line)
            </label>
            <p className="text-xs text-textGray mb-2">
              Example: What is full stack development? | Full stack development covers both frontend and backend.
            </p>
            <textarea
              name="faqsText"
              value={formData.faqsText}
              onChange={handleChange}
              rows="6"
              placeholder="Question 1 | Answer 1&#10;Question 2 | Answer 2"
              className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-y text-sm font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-white font-bold rounded-button shadow hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? "Saving Configuration..." : "Save Configuration"}
        </button>
      </form>
    </div>
  );
};

export default ManageHome;