import API from "./axiosConfig";

export const loginAdminApi = async (loginData) => {
  const response = await API.post("/auth/login", loginData);
  return response.data;
};

export const getAdminProfileApi = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};