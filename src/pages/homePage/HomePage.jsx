import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css";
import {
  Hero,
  Count,
  WhyGlobalTechify,
  JoinAsMentor,
  Slider,
} from "../../components/home";

export default function HomePage({ role }) {
  return (
    <div className={styles.HomePage}>
      {/* hero */}
      <Hero role={role} />

      {/* count-up */}
      <Count />

      {/* why-global-techify */}
      <WhyGlobalTechify />

      {/* join-as-mentor */}
      <JoinAsMentor role={role} />

      {/* slider */}
      <Slider />
    </div>
  );
}
