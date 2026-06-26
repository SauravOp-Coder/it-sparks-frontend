import API from "./axiosConfig";

export const getReviewsApi = async () => {
  const response = await API.get("/reviews");
  return response.data;
};

export const getAdminReviewsApi = async () => {
  const response = await API.get("/reviews/admin/all");
  return response.data;
};

export const createReviewApi = async (formData) => {
  const response = await API.post("/reviews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateReviewApi = async (id, formData) => {
  const response = await API.put(`/reviews/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteReviewApi = async (id) => {
  const response = await API.delete(`/reviews/${id}`);
  return response.data;
};