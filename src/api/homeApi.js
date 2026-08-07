import API from "./axiosConfig.js";

// Export named function expected by HomeContentBuilder.jsx
export const getHomeContentApi = async () => {
  const response = await API.get("/home");
  return response.data;
};

// Export update function
export const updateHomeContentApi = async (data) => {
  const response = await API.put("/home", data);
  return response.data;
};