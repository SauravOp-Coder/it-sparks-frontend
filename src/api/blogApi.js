import API from "./axiosConfig";

export const getBlogsApi = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const getSingleBlogApi = async (id) => {
  const response = await API.get(`/blogs/${id}`);
  return response.data;
};

export const getAdminBlogsApi = async () => {
  const response = await API.get("/blogs/admin/all");
  return response.data;
};

export const createBlogApi = async (formData) => {
  const response = await API.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateBlogApi = async (id, formData) => {
  const response = await API.put(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteBlogApi = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};