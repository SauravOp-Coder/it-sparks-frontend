import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/logo/it-sparks-logo.webp";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");

    setMobileMenuOpen(false);
    navigate("/admin/login");
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-button font-semibold transition ${
      isActive
        ? "bg-primary text-white"
        : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 h-screen w-[270px] bg-dark text-white z-50 hidden lg:flex flex-col">
        <div className="h-[86px] flex items-center px-6 border-b border-white/10">
          <img
            src={logo}
            alt="IT Sparks Technologies"
            width="160"
            height="160"
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
                className={navItemClass}
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

      {/* ================= MOBILE ADMIN HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[60] h-[70px] bg-dark text-white border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="IT Sparks Technologies"
            width="160"
            height="160"
            className="h-[48px] w-auto bg-white rounded-button p-1.5"
          />

          <div>
            <p className="font-extrabold text-sm">
              IT Sparks
            </p>

            <p className="text-[11px] text-white/60">
              Admin Panel
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="h-11 w-11 rounded-button bg-white/10 border border-white/10 flex items-center justify-center"
          aria-label="Open admin menu"
        >
          <Menu size={23} />
        </button>
      </div>

      {/* ================= MOBILE BACKDROP ================= */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[70] bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-[80] h-screen w-[285px] max-w-[85vw] bg-dark text-white flex flex-col shadow-2xl transition-transform duration-300 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="h-[86px] flex items-center justify-between px-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="IT Sparks Technologies"
              width="160"
              height="160"
              className="h-[52px] w-auto bg-white rounded-card p-2"
            />

            <div>
              <p className="font-extrabold text-sm">
                IT Sparks
              </p>

              <p className="text-xs text-white/60">
                Admin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Close admin menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 px-4 py-5 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleMobileLinkClick}
                className={navItemClass}
              >
                <Icon size={20} />

                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-button font-semibold text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;