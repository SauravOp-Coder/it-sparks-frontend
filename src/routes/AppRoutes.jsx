import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Courses from "../pages/public/Courses";
import CourseDetail from "../pages/public/CourseDetail";
import Placements from "../pages/public/Placements";
import Gallery from "../pages/public/Gallery";
import Blog from "../pages/public/Blog";
import BlogDetail from "../pages/public/BlogDetail";
import Contact from "../pages/public/Contact";
import ThankYou from "../pages/public/ThankYou";

import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageHome from "../pages/admin/ManageHome";
import ManageCourses from "../pages/admin/ManageCourses";
import ManageBlogs from "../pages/admin/ManageBlogs";
import ManageReviews from "../pages/admin/ManageReviews";
import ManagePlacements from "../pages/admin/ManagePlacements";
import ManageGallery from "../pages/admin/ManageGallery";
import ViewEnquiries from "../pages/admin/ViewEnquiries";
import ManageSettings from "../pages/admin/ManageSettings";

import ManageBanners from "../pages/admin/ManageBanners";


  const AppRoutes = () => {
  return (
    <>

      <ScrollToTop />

      <Routes>
          <Route element={<ScrollToTop />} />

        <Route element={<PublicLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />

        </Route>


        <Route path="/admin/login" element={<AdminLogin />} />


        <Route element={<AdminProtectedRoute />}>

          <Route element={<AdminLayout />}>

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-home" element={<ManageHome />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/blogs" element={<ManageBlogs />} />
            <Route path="/admin/reviews" element={<ManageReviews />} />
            <Route path="/admin/banners" element={<ManageBanners />} />
            <Route path="/admin/placements" element={<ManagePlacements />} />
            <Route path="/admin/gallery" element={<ManageGallery />} />
            <Route path="/admin/enquiries" element={<ViewEnquiries />} />
            <Route path="/admin/settings" element={<ManageSettings />} />

          </Route>

        </Route>


      </Routes>

    </>
  );
};

export default AppRoutes;