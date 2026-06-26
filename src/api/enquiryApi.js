import API from "./axiosConfig";

export const createEnquiryApi = async (data) => {
  const response = await API.post("/enquiries", data);
  return response.data;
};

export const getAdminEnquiriesApi = async () => {
  const response = await API.get("/enquiries/admin/all");
  return response.data;
};

export const updateEnquiryStatusApi = async (id, status) => {
  const response = await API.put(`/enquiries/${id}`, { status });
  return response.data;
};

export const deleteEnquiryApi = async (id) => {
  const response = await API.delete(`/enquiries/${id}`);
  return response.data;
};