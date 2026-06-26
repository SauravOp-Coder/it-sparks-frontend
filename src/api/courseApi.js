import API from "./axiosConfig";

export const getCoursesApi = async () => {
  const response = await API.get("/courses");
  return response.data;
};

export const getCourseByIdApi = async (id) => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};

export const getAdminCoursesApi = async () => {
  const response = await API.get("/courses/admin/all");
  return response.data;
};

export const createCourseApi = async (formData) => {
  const response = await API.post("/courses", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCourseApi = async (id, formData) => {
  const response = await API.put(`/courses/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCourseApi = async (id) => {
  const response = await API.delete(`/courses/${id}`);
  return response.data;
};