import API from "./axiosConfig";

/**
 * ----------------------------------------
 * Get Home Page Content (Public)
 * GET /api/home
 * ----------------------------------------
 */
export const getHomeContentApi = async () => {
  const { data } = await API.get("/home");
  return data;
};

/**
 * ----------------------------------------
 * Update Home Page Content (Admin)
 * PUT /api/home
 * ----------------------------------------
 */
export const updateHomeContentApi = async (payload) => {
  const { data } = await API.put("/home", payload);
  return data;
};