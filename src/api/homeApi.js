import API from "./axiosConfig.js";

export const getHomeContentApi = async () => {
  const response = await API.get("/home");
  return response.data;
};

export const updateHomeContentApi = async (data) => {
  const response = await API.put("/home", data);
  return response.data;
};