import React from "react";
import styles from "./hero.module.css";
import heroIcon from "./../../../assets/home/hero/heroIcon.png";

export default function Hero() {
  return (
    <div className={styles.Hero}>
      <div className={styles.leftContainer}>
        <div className={styles.top}>
          <h1 data-aos="fade-up">
            Crack Your College Journey <br /> With{" "}
            <span className={styles.animatedText}>Global Techify</span>
          </h1>
          <p data-aos="fade-up" className="bigText">
            Over 1 million users trust us
          </p>
        </div>
        <button data-aos="fade-up" className={`bigOutlineBtn ${styles.btn}`}>
          Get Mentorship
        </button>
      </div>
      <div className={styles.rightContainer}>
        <div data-aos="fade-left" className={styles.imgContainer}>
          <img src={heroIcon} alt="hero-icon" />
        </div>
      </div>
    </div>
  );
}
