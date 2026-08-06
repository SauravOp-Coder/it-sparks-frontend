import { useNavigate, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  BookOpen,
  Newspaper,
  Star,
  Trophy,
  Image,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo/it-sparks-logo.png";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Home",
    path: "/admin/manage-home",
    icon: Home,
  },
  {
    title: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Blogs",
    path: "/admin/blogs",
    icon: Newspaper,
  },
  {
    title: "Reviews",
    path: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Placements",
    path: "/admin/placements",
    icon: Trophy,
  },
  {
    title: "Gallery",
    path: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Manage Banners",
    path: "/admin/banners",
    icon: Image,
  },
  {
    title: "Enquiries",
    path: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[270px] bg-dark text-white z-50 hidden lg:flex flex-col">
      <div className="h-[86px] flex items-center px-6 border-b border-white/10">
        <img
          src={logo}
          alt="IT Sparks Technologies"
          className="h-[58px] w-auto bg-white rounded-card p-2"
        />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-button font-semibold transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-button font-semibold text-white/70 hover:bg-white/10 hover:text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;