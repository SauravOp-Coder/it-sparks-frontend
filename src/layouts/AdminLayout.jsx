import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-lightBg">
      <AdminSidebar />

      <div className="lg:ml-[270px] min-h-screen">
        <AdminTopbar />

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;