import API from "./axiosConfig.js";

export const loginAdminApi = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

// Optional alias for compatibility
export const loginUser = loginAdminApi;