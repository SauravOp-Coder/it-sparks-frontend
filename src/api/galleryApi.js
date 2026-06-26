import API from "./axiosConfig";

export const getGalleryApi = async () => {
  const response = await API.get("/gallery");
  return response.data;
};

export const getAdminGalleryApi = async () => {
  const response = await API.get("/gallery/admin/all");
  return response.data;
};

export const createGalleryApi = async (formData) => {
  const response = await API.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateGalleryApi = async (id, formData) => {
  const response = await API.put(`/gallery/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteGalleryApi = async (id) => {
  const response = await API.delete(`/gallery/${id}`);
  return response.data;
};