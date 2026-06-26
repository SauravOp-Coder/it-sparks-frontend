import {
  BookOpenCheck,
  BriefcaseBusiness,
  Image,
  MessageSquareText,
  Newspaper,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardStatsApi } from "../../api/dashboardApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [latestEnquiries, setLatestEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStatsApi();
      setStats(data.stats);
      setLatestEnquiries(data.latestEnquiries || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Total Courses",
      value: stats?.totalCourses || 0,
      icon: BookOpenCheck,
    },
    {
  title: "Banners",
  value: stats?.totalBanners || 0,
  icon: Image,
},
    {
      title: "Total Blogs",
      value: stats?.totalBlogs || 0,
      icon: Newspaper,
    },
    {
      title: "Reviews",
      value: stats?.totalReviews || 0,
      icon: Star,
    },
    {
      title: "Placements",
      value: stats?.totalPlacements || 0,
      icon: BriefcaseBusiness,
    },
    {
      title: "Gallery Images",
      value: stats?.totalGallery || 0,
      icon: Image,
    },
    {
      title: "Total Enquiries",
      value: stats?.totalEnquiries || 0,
      icon: MessageSquareText,
    },
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-white border border-borderSoft rounded-card shadow-card p-10 text-center text-textGray">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-dark">Dashboard</h2>
        <p className="text-textGray mt-2">
          Overview of website content, enquiries, and admin activity.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white border border-borderSoft rounded-card shadow-card p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textGray font-semibold">{card.title}</p>
                  <h3 className="text-4xl font-extrabold text-dark mt-2">
                    {card.value}
                  </h3>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 mt-8">
        <div className="bg-white border border-borderSoft rounded-card shadow-card p-6">
          <h3 className="text-xl font-extrabold text-dark">
            Enquiry Status
          </h3>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between bg-lightBg rounded-button p-4">
              <span className="font-bold text-dark">New</span>
              <span className="text-primary font-extrabold">
                {stats?.newEnquiries || 0}
              </span>
            </div>

            <div className="flex items-center justify-between bg-lightBg rounded-button p-4">
              <span className="font-bold text-dark">Contacted</span>
              <span className="text-primary font-extrabold">
                {stats?.contactedEnquiries || 0}
              </span>
            </div>

            <div className="flex items-center justify-between bg-lightBg rounded-button p-4">
              <span className="font-bold text-dark">Closed</span>
              <span className="text-primary font-extrabold">
                {stats?.closedEnquiries || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-borderSoft rounded-card shadow-card overflow-hidden">
          <div className="p-6 border-b border-borderSoft">
            <h3 className="text-xl font-extrabold text-dark">
              Latest Enquiries
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead className="bg-lightBg">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Mobile
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Course
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-dark">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {latestEnquiries.map((item) => (
                  <tr key={item._id} className="border-t border-borderSoft">
                    <td className="px-6 py-4">
                      <p className="font-bold text-dark">{item.fullName}</p>
                      <p className="text-sm text-textGray">{item.source}</p>
                    </td>

                    <td className="px-6 py-4 text-textGray">{item.mobile}</td>

                    <td className="px-6 py-4 text-textGray">
                      {item.interestedCourse || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-textGray">
                      {formatDate(item.createdAt)}
                    </td>
                  </tr>
                ))}

                {latestEnquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-textGray"
                    >
                      No enquiries yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;