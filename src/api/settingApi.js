import API from "./axiosConfig";

export const getSettingsApi = async () => {
  const response = await API.get("/settings");
  return response.data;
};

export const updateSettingsApi = async (data) => {
  const response = await API.put("/settings", data);
  return response.data;
};