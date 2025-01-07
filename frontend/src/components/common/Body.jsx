import React from "react";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";

export default function Body({ children, hasFooter = true }) {
  return (
    <>
      <NavBar />
      <main className="flex-grow p-8">{children}</main>
      {hasFooter && <Footer />}
    </>
  );
}
