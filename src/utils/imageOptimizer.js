export const optimizeCloudinaryImage = (
  url,
  width = 800,
  quality = "auto"
) => {
  if (!url) return "";

  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  // Prevent adding transformations twice
  if (
    url.includes("/f_auto,") ||
    url.includes("/q_auto,") ||
    url.includes("/w_")
  ) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_${quality},w_${width},c_limit/`
  );
};