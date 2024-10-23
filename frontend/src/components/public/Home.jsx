import React from "react";
import PublicNavBar from "../public/PublicNavBar.jsx";
import Footer from "../common/Footer.jsx";
import Schedule from "../private/Schedule.jsx";

export default function Home() {
    return (
        <div>
            <PublicNavBar />
        <h1>Home</h1>
        <Schedule />
        <Footer />
        </div>
    );
}