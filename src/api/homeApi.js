import API from "./axiosConfig";

export const getHomeContentApi = async () => {
  const response = await API.get("/home");
  return response.data;
};

export const updateHomeContentApi = async (formData) => {
  const response = await API.put("/home", formData);

  return response.data;
};