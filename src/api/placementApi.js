import API from "./axiosConfig";

export const getPlacementsApi = async () => {
  const response = await API.get("/placements");
  return response.data;
};

export const getAdminPlacementsApi = async () => {
  const response = await API.get("/placements/admin/all");
  return response.data;
};

export const createPlacementApi = async (formData) => {
  const response = await API.post("/placements", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePlacementApi = async (id, formData) => {
  const response = await API.put(`/placements/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deletePlacementApi = async (id) => {
  const response = await API.delete(`/placements/${id}`);
  return response.data;
};