import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://your-backend.onrender.com/api",
  withCredentials: true,
});

// Attach token automatically for admin routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // or wherever your admin token is stored
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getHomeContentApi = async () => {
  const res = await API.get("/home");
  return res.data;
};

export const updateHomeContentApi = async (data) => {
  const res = await API.put("/home", data);
  return res.data;
};