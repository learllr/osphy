import React from "react";
import Body from "../common/Body.jsx";
import Features from "./Home/Features.jsx";
import Benefits from "./Home/Benefits.jsx";
import Security from "./Home/Security.jsx";
import Support from "./Home/Support.jsx";
import Hero from "./Home/Hero.jsx";
import FAQ from "./Home/FAQ.jsx";
import Newsletter from "./Home/Newsletter.jsx";

export default function Home() {
  return (
    <Body>
      <Hero />
      <Features />
      <Benefits />
      <Security />
      <Support />
      <Newsletter />
      <FAQ />
    </Body>
  );
}
