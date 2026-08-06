import axios from "axios";

// Update base URL to match your server configuration
const API = axios.create({ baseURL: "/api/home" });

// Add auth token interceptor if using protectAdmin middleware
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // or wherever your admin token is saved
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getHomeContentApi = async () => {
  const response = await API.get("/");
  return response.data;
};

export const updateHomeContentApi = async (formData) => {
  const response = await API.put("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};