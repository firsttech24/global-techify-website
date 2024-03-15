import React from "react";
import styles from "./homePage.module.css";
import { Hero, Count } from "../../components/home";

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      {/* hero */}
      <Hero />

      {/* count-up */}
      <Count />
    </div>
  );
}
