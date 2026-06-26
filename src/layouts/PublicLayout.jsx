import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import EnquiryPopup from "../components/common/EnquiryPopup";
import TopBar from "../components/common/TopBar";

const PublicLayout = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
      <EnquiryPopup />
    </>
  );
};

export default PublicLayout;