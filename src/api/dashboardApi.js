import API from "./axiosConfig";

export const getDashboardStatsApi = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};