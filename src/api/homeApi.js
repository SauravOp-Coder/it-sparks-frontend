import axios from "axios";

const API = axios.create({ baseURL: "/api/home" });

export const getHomeContentApi = async () => {
  const response = await API.get("/");
  return response.data;
};

export const updateHomeContentApi = async (payload) => {
  const response = await API.put("/", payload, {
    headers: {
      "Content-Type": "application/json", // change to multipart/form-data if sending FormData
    },
  });
  return response.data;
};