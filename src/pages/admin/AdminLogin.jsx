import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo/it-sparks-logo.png";
import { loginAdminApi } from "../../api/authApi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginAdminApi(loginData);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lightBg to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-borderSoft rounded-card shadow-soft overflow-hidden">
        <div className="bg-dark text-white p-7 text-center">
          <img
            src={logo}
            alt="IT Sparks Technologies"
            className="h-[72px] w-auto bg-white rounded-card p-2 mx-auto mb-5"
          />

          <h1 className="text-2xl font-extrabold">Admin Login</h1>
          <p className="text-white/70 mt-2">
            Login to manage website content
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-7 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 rounded-button px-4 py-3 text-sm font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-bold text-dark">
              Email Address
            </label>
            <div className="mt-2 flex items-center gap-3 border border-borderSoft rounded-button px-4 py-3 focus-within:border-primary">
              <Mail size={19} className="text-textGray" />
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="admin@itsparks.com"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-dark">Password</label>
            <div className="mt-2 flex items-center gap-3 border border-borderSoft rounded-button px-4 py-3 focus-within:border-primary">
              <Lock size={19} className="text-textGray" />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="primary-btn w-full">
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link
            to="/"
            className="block text-center text-sm font-bold text-primary hover:text-primaryDark transition"
          >
            Back to Website
          </Link>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;