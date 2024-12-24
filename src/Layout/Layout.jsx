// Layout.jsx
import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router";
import ToTopArrow from "../components/UI/ToTopArrow";
import CustomNavbar from "./CustomNavbar";
import "./Layout.css"; // Yeni CSS dosyasını import ediyoruz

function Layout() {
  return (
    <div className="layout-container">
      <CustomNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToTopArrow />
    </div>
  );
}

export default Layout;
