import API from "./axiosConfig";

export const getBannersApi = async () => {
  const response = await API.get("/banners");
  return response.data;
};

export const getBannersByPageApi = async (page) => {
  const response = await API.get(`/banners/page/${page}`);
  return response.data;
};

export const getAdminBannersApi = async () => {
  const response = await API.get("/banners/admin/all");
  return response.data;
};

export const createBannerApi = async (formData) => {
  const response = await API.post("/banners", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateBannerApi = async (id, formData) => {
  const response = await API.put(`/banners/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteBannerApi = async (id) => {
  const response = await API.delete(`/banners/${id}`);
  return response.data;
};