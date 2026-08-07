import API from "./axiosConfig.js";

// Fetch home page content
export const getHomeContentApi = async () => {
  const response = await API.get("/home");
  return response.data;
};

// Update home page content
export const updateHomeContentApi = async (data) => {
  const response = await API.put("/home", data);
  return response.data;
};