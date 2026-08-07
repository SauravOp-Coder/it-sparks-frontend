import API from "./axiosConfig.js";

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials); // Hits /api/auth/login
  return response.data;
};