import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteEnquiryApi,
  getAdminEnquiriesApi,
  updateEnquiryStatusApi,
} from "../../api/enquiryApi";

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await getAdminEnquiriesApi();
      setEnquiries(data.enquiries || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateEnquiryStatusApi(id, status);
      fetchEnquiries();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmDelete) return;

    try {
      await deleteEnquiryApi(id);
      fetchEnquiries();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete enquiry");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-dark">View Enquiries</h2>
        <p className="text-textGray mt-2">
          View enquiries submitted from contact form, course form, and popup form.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-borderSoft rounded-card p-6 shadow-card">
          <p className="text-textGray font-semibold">Total Enquiries</p>
          <h3 className="text-4xl font-extrabold text-dark mt-2">{enquiries.length}</h3>
        </div>

        <div className="bg-white border border-borderSoft rounded-card p-6 shadow-card">
          <p className="text-textGray font-semibold">New Enquiries</p>
          <h3 className="text-4xl font-extrabold text-dark mt-2">
            {enquiries.filter((item) => item.status === "New").length}
          </h3>
        </div>

        <div className="bg-white border border-borderSoft rounded-card p-6 shadow-card">
          <p className="text-textGray font-semibold">Popup Enquiries</p>
          <h3 className="text-4xl font-extrabold text-dark mt-2">
            {enquiries.filter((item) => item.source === "Popup Form").length}
          </h3>
        </div>
      </div>

      <div className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden">
        <div className="p-6 border-b border-borderSoft">
          <h3 className="text-xl font-extrabold text-dark">Enquiry List</h3>
        </div>

        {loading ? (
          <div className="p-10 text-center text-textGray">Loading enquiries...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-lightBg">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Mobile</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Mode</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Source</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-dark">Actions</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((item) => (
                  <tr key={item._id} className="border-t border-borderSoft">
                    <td className="px-6 py-4">
                      <p className="font-extrabold text-dark">{item.fullName}</p>
                      <p className="text-sm text-textGray mt-1">{item.email}</p>
                      <p className="text-sm text-textGray mt-1 max-w-[260px]">{item.message}</p>
                    </td>

                    <td className="px-6 py-4 text-textGray">{item.mobile}</td>
                    <td className="px-6 py-4 text-textGray">{item.interestedCourse}</td>
                    <td className="px-6 py-4 text-textGray">{item.preferredMode}</td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {item.source}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className="border border-borderSoft rounded-button px-3 py-2 text-sm outline-none"
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-textGray">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => alert(item.message || "No message")}
                          className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-primary transition"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="h-10 w-10 rounded-button border border-borderSoft flex items-center justify-center hover:text-red-500 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {enquiries.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center text-textGray">
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEnquiries;