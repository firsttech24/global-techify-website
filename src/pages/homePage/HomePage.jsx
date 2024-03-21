import React from "react";
import styles from "./homePage.module.css";
import {
  Hero,
  Count,
  WhyGlobalTechify,
  JoinAsMentor,
  Slider,
} from "../../components/home";

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      {/* hero */}
      <Hero />

      {/* count-up */}
      <Count />

      {/* why-global-techify */}
      <WhyGlobalTechify />

      {/* join-as-mentor */}
      <JoinAsMentor />

      {/* slider */}
      <Slider />
    </div>
  );
}
