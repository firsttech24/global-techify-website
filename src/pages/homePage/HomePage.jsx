import React from "react";
import styles from "./homePage.module.css";
import { Hero } from "../../components/home";

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      {/* hero */}
      <Hero />
    </div>
  );
}
