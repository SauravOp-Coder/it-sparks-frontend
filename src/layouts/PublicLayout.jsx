import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import TopBar from "../components/common/TopBar";

// Lazy-load floating popups and widgets
const WhatsAppButton = lazy(() => import("../components/common/WhatsAppButton"));
const EnquiryPopup = lazy(() => import("../components/common/EnquiryPopup"));

const PublicLayout = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer />
      
      <Suspense fallback={null}>
        <WhatsAppButton />
        <EnquiryPopup />
      </Suspense>
    </>
  );
};

export default PublicLayout;