import axiosInstance from "./axiosInstance"; // or your axios config

export const getHomeContentApi = async () => {
  const response = await axiosInstance.get("/api/home");
  return response.data;
};

export const updateHomeContentApi = async (data) => {
  // If sending FormData (files), let Axios set boundary automatically.
  // If sending clean JSON, send standard application/json headers.
  const isFormData = data instanceof FormData;

  const response = await axiosInstance.put("/api/home", data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });
  return response.data;
};