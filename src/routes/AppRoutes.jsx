import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import PublicLayout from "../layouts/PublicLayout";

// Home is imported directly so the homepage loads instantly
import Home from "../pages/public/Home";

// Lazy-loaded Public Pages
const About = lazy(() => import("../pages/public/About"));
const Courses = lazy(() => import("../pages/public/Courses"));
const CourseDetail = lazy(() => import("../pages/public/CourseDetail"));
const Placements = lazy(() => import("../pages/public/Placements"));
const Gallery = lazy(() => import("../pages/public/Gallery"));
const Blog = lazy(() => import("../pages/public/Blog"));
const BlogDetail = lazy(() => import("../pages/public/BlogDetail"));
const Contact = lazy(() => import("../pages/public/Contact"));
const ThankYou = lazy(() => import("../pages/public/ThankYou"));
const PrivacyPolicy = lazy(() => import("../pages/public/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/public/TermsAndConditions"));

// Lazy-loaded Admin Layout and Protection
const AdminProtectedRoute = lazy(() => import("../components/admin/AdminProtectedRoute"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

// Lazy-loaded Admin Pages
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const ManageHome = lazy(() => import("../pages/admin/ManageHome"));
const ManageCourses = lazy(() => import("../pages/admin/ManageCourses"));
const ManageBlogs = lazy(() => import("../pages/admin/ManageBlogs"));
const ManageReviews = lazy(() => import("../pages/admin/ManageReviews"));
const ManagePlacements = lazy(() => import("../pages/admin/ManagePlacements"));
const ManageGallery = lazy(() => import("../pages/admin/ManageGallery"));
const ViewEnquiries = lazy(() => import("../pages/admin/ViewEnquiries"));
const ManageSettings = lazy(() => import("../pages/admin/ManageSettings"));
const ManageBanners = lazy(() => import("../pages/admin/ManageBanners"));

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={null}>
        <Routes>
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
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
      </Suspense>
    </>
  );
};

export default AppRoutes;