const AdminTopbar = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");

  return (
    <header className="h-20 bg-white border-b border-borderSoft px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-extrabold text-dark">Admin Panel</h1>
        <p className="text-sm text-textGray">
          Manage IT Sparks Technologies website
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="font-extrabold text-dark">
            {adminInfo?.name || "Admin"}
          </p>
          <p className="text-sm text-textGray">
            {adminInfo?.email || "admin@itsparks.com"}
          </p>
        </div>

        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold">
          {(adminInfo?.name || "Admin").charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;