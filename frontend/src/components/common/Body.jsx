import React from "react";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

export default function Body({ children, hasFooter = true }) {
  return (
    <>
      <NavBar />
      <main className="flex-grow mt-14">{children}</main>
      {hasFooter && <Footer />}
    </>
  );
}
