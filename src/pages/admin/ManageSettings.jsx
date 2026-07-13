import { useEffect, useState } from "react";
import { getSettingsApi, updateSettingsApi } from "../../api/settingApi";

const ManageSettings = () => {
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    googleMapLink: "",
    googleReviewReadLink: "",
    googleReviewWriteLink: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    seoImage: "",
    seoCanonicalBase: "",
    siteName: "",
    facebookLink: "",
    instagramLink: "",
    linkedinLink: "",
    youtubeLink: "",
    socialLinks: {
      instagram: "",
      facebook: "",
      linkedin: "",
      youtube: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchSettings = async () => {
    try {
      setPageLoading(true);
      const data = await getSettingsApi();
      const settings = data.settings || {};

      setFormData({
        phone: settings.phone || "",
        whatsapp: settings.whatsapp || "",
        email: settings.email || "",
        address: settings.address || "",
        googleMapLink: settings.googleMapLink || "",
        googleReviewReadLink: settings.googleReviewReadLink || "",
        googleReviewWriteLink: settings.googleReviewWriteLink || "",
        seoTitle: settings.seoTitle || "",
        seoDescription: settings.seoDescription || "",
        seoKeywords: settings.seoKeywords || "",
        seoImage: settings.seoImage || "",
        seoCanonicalBase: settings.seoCanonicalBase || "",
        siteName: settings.siteName || "",
        facebookLink: settings.facebookLink || "",
        instagramLink: settings.instagramLink || "",
        linkedinLink: settings.linkedinLink || "",
        youtubeLink: settings.youtubeLink || "",
        socialLinks: {
          instagram: settings.socialLinks?.instagram || "",
          facebook: settings.socialLinks?.facebook || "",
          linkedin: settings.socialLinks?.linkedin || "",
          youtube: settings.socialLinks?.youtube || "",
        },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch settings");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      await updateSettingsApi(formData);

      setSuccess("Settings updated successfully.");
      fetchSettings();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
        Loading settings...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-dark">Manage Settings</h2>
        <p className="text-textGray mt-2">
          Update contact details, Google links, WhatsApp number, and social links.
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
        <h3 className="text-xl font-extrabold text-dark mb-6">
          Contact Information
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Number e.g. 919876543210"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <h3 className="text-xl font-extrabold text-dark mt-8 mb-6">
          Google Links
        </h3>

        <div className="grid gap-5">
          <input
            name="googleMapLink"
            value={formData.googleMapLink}
            onChange={handleChange}
            placeholder="Google Map Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="googleReviewReadLink"
            value={formData.googleReviewReadLink}
            onChange={handleChange}
            placeholder="Google Review Read Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="googleReviewWriteLink"
            value={formData.googleReviewWriteLink}
            onChange={handleChange}
            placeholder="Google Review Write Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <h3 className="text-xl font-extrabold text-dark mt-8 mb-6">
          SEO Defaults
        </h3>

        <div className="grid gap-5">
          <input
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            placeholder="Site Name"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            placeholder="Default Page Title"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <textarea
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            placeholder="Default Meta Description"
            rows="3"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary resize-none"
          />

          <input
            name="seoKeywords"
            value={formData.seoKeywords}
            onChange={handleChange}
            placeholder="Default Keywords"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="seoImage"
            value={formData.seoImage}
            onChange={handleChange}
            placeholder="Default OG Image Path (e.g. /og-image.jpg)"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="seoCanonicalBase"
            value={formData.seoCanonicalBase}
            onChange={handleChange}
            placeholder="Canonical Base URL"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <h3 className="text-xl font-extrabold text-dark mt-8 mb-6">
          Social Media Links
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="socialLinks.instagram"
            value={formData.socialLinks.instagram}
            onChange={handleChange}
            placeholder="Instagram URL"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="socialLinks.facebook"
            value={formData.socialLinks.facebook}
            onChange={handleChange}
            placeholder="Facebook URL"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="socialLinks.linkedin"
            value={formData.socialLinks.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="socialLinks.youtube"
            value={formData.socialLinks.youtube}
            onChange={handleChange}
            placeholder="YouTube URL"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="facebookLink"
            value={formData.facebookLink}
            onChange={handleChange}
            placeholder="Facebook Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            placeholder="Instagram Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="linkedinLink"
            value={formData.linkedinLink}
            onChange={handleChange}
            placeholder="LinkedIn Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />

          <input
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
            placeholder="YouTube Link"
            className="border border-borderSoft rounded-button px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <button type="submit" disabled={loading} className="primary-btn mt-7">
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default ManageSettings;