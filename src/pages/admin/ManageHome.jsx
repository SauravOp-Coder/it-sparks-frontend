import { useEffect, useState } from "react";
import { getHomeContentApi, updateHomeContentApi } from "../../api/homeApi";

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
};

const ManageHome = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [currentHeroImage, setCurrentHeroImage] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
        <h3 className="text-xl font-extrabold text-dark mb-6">Hero Section</h3>

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
            placeholder="Primary Button Link e.g. /courses"
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
            placeholder="Secondary Button Link e.g. /contact"
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
          rows="4"
          className="w-full border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none mt-5"
        />

        {currentHeroImage && (
          <div className="mt-5">
            <p className="font-bold text-dark mb-3">Current Hero Image</p>
            <img
              src={currentHeroImage}
              alt="Hero"
              className="w-full max-w-xl h-[260px] object-cover rounded-card border border-borderSoft"
            />
          </div>
        )}

        <h3 className="text-xl font-extrabold text-dark mt-10 mb-6">
          Homepage Section Titles
        </h3>

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
  <label className="font-bold text-dark">
    Why Choose Us Cards
  </label>
  <p className="text-sm text-textGray mt-1 mb-2">
    Format: Title | Description. Add one card per line.
  </p>
  <textarea
    name="whyChooseCardsText"
    value={formData.whyChooseCardsText}
    onChange={handleChange}
    rows="6"
    placeholder={`Practical Learning | Learn with hands-on assignments and real projects
Expert Trainers | Get guidance from experienced industry trainers
Career Support | Resume, interview and career guidance support`}
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
  <label className="font-bold text-dark">
    Training Process Steps
  </label>
  <p className="text-sm text-textGray mt-1 mb-2">
    Format: Number | Title | Description. Add one step per line.
  </p>
  <textarea
    name="trainingStepsText"
    value={formData.trainingStepsText}
    onChange={handleChange}
    rows="6"
    placeholder={`01 | Counselling & Course Selection | We understand your background and help you choose the right course
02 | Concept + Practical Training | Learn every topic with examples and assignments
03 | Project Development | Work on real-world projects to build confidence`}
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
  <label className="font-bold text-dark">
    Placement Support Cards
  </label>
  <p className="text-sm text-textGray mt-1 mb-2">
    Format: Title | Description. Add one card per line.
  </p>
  <textarea
    name="placementSupportCardsText"
    value={formData.placementSupportCardsText}
    onChange={handleChange}
    rows="5"
    placeholder={`Resume Building | We help students prepare clean and job-focused resumes
Mock Interviews | Practice technical and HR interview questions
Career Guidance | Get direction for choosing the right IT career path`}
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
  <label className="font-bold text-dark">
    Recruiters / Hiring Partners
  </label>
  <p className="text-sm text-textGray mt-1 mb-2">
    Add company names comma separated.
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