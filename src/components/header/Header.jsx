import React from "react";
import styles from "./header.module.css";
import DesktopNavbar from "./desktopNavbar/DesktopNavbar";
import { Link } from "react-router-dom";
// import logoHeader from "./../../assets/header/logoHeader.png";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.logoContainer}>
        <Link to={"/"}>{/* <img src={logoHeader} alt="logo" /> */}</Link>
      </div>
      <div className={styles.rightContainer}>
        {/* desktop navbar */}
        <div className={styles.desktopNavbar}>
          <DesktopNavbar />
        </div>

        {/* mobile navbar */}
        {/* <div className={styles.DesktopNavbar}>
          <DesktopNavbar />
        </div> */}

        <div className={styles.bar}>
          <FaBarsStaggered />
        </div>
      </div>
    </header>
  );
}
