import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSettingsApi } from "../../api/settingApi";

const DEFAULT_SITE_NAME = "IT Sparks Technologies";
const DEFAULT_TITLE = "IT Sparks Technologies | Practical IT Training";
const DEFAULT_DESCRIPTION =
  "IT Sparks Technologies provides practical IT training, AI courses, software development programs, and placement support for students and professionals.";
const DEFAULT_KEYWORDS =
  "IT training, software courses, AI training, data science, cloud computing, placement support, practical learning";
const DEFAULT_BASE_URL = "https://itsparkstechnologies.com";
const DEFAULT_IMAGE = "/og-image.jpg";

const buildAbsoluteUrl = (value, baseUrl, fallbackPath = "/") => {
  if (!value) {
    return `${baseUrl}${fallbackPath}`;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${baseUrl}${value}`;
  }

  return `${baseUrl}/${value}`;
};

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  image,
  noIndex = false,
}) => {
  const location = useLocation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettingsApi();
        setSettings(response?.settings || null);
      } catch (error) {
        setSettings(null);
      }
    };

    fetchSettings();
  }, []);

  const pathname = location?.pathname || "/";
  const baseUrl = settings?.seoCanonicalBase || DEFAULT_BASE_URL;
  const siteName = settings?.siteName || DEFAULT_SITE_NAME;
  const resolvedTitle = title || settings?.seoTitle || DEFAULT_TITLE;
  const resolvedDescription =
    description || settings?.seoDescription || DEFAULT_DESCRIPTION;
  const resolvedKeywords =
    keywords || settings?.seoKeywords || DEFAULT_KEYWORDS;
  const resolvedCanonical =
    canonical || buildAbsoluteUrl(`${pathname === "/" ? "" : pathname}`, baseUrl, "/");
  const resolvedOgImage =
    ogImage || image || settings?.seoImage || DEFAULT_IMAGE;
  const resolvedTwitterImage = twitterImage || resolvedOgImage;
  const resolvedOgTitle = ogTitle || resolvedTitle;
  const resolvedOgDescription = ogDescription || resolvedDescription;
  const resolvedOgUrl = ogUrl || resolvedCanonical;
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription =
    twitterDescription || resolvedOgDescription;

  const fullTitle = resolvedTitle.includes(siteName)
    ? resolvedTitle
    : `${resolvedTitle} | ${siteName}`;

  const robotsContent = noIndex ? "noindex, nofollow" : "index, follow";

  const absoluteOgImage = useMemo(
    () => buildAbsoluteUrl(resolvedOgImage, baseUrl, "/og-image.jpg"),
    [baseUrl, resolvedOgImage]
  );

  const absoluteTwitterImage = useMemo(
    () => buildAbsoluteUrl(resolvedTwitterImage, baseUrl, "/og-image.jpg"),
    [baseUrl, resolvedTwitterImage]
  );

  const absoluteCanonical = useMemo(
    () => buildAbsoluteUrl(resolvedCanonical, baseUrl, "/"),
    [baseUrl, resolvedCanonical]
  );

  const absoluteOgUrl = useMemo(
    () => buildAbsoluteUrl(resolvedOgUrl, baseUrl, pathname),
    [baseUrl, pathname, resolvedOgUrl]
  );

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={absoluteCanonical} />

      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={absoluteOgUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
      <meta name="twitter:image" content={absoluteTwitterImage} />
    </Helmet>
  );
};

export default SEO;
