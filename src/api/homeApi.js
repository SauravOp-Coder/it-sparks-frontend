import API from "./axiosConfig.js";

export const getHomeContent = async () => {
  const response = await API.get("/home"); // Hits /api/home
  return response.data;
};

export const updateHomeContent = async (formData) => {
  const response = await API.put("/home", formData); // Hits /api/home
  return response.data;
};