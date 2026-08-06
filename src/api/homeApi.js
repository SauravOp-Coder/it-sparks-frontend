// frontend/src/api/homeApi.js
import API from "./axiosConfig";

export const getHomeContentApi = async () => {
  const response = await API.get("/Home");
  return response.data;
};

export const updateHomeContentApi = async (formData) => {
  const response = await API.put("/Home", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};