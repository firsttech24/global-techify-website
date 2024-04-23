import React, { useState, useRef } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";

import { SwitchTheme } from "./../switchTheme/SwitchTheme";

// import { FaSearch } from "react-icons/fa";
import DesktopNavbar from "./desktopNavbar/DesktopNavbar";
import MobileNavbar from "./mobileNavbar/MobileNavbar";
import logo from "./../../assets/logo.svg";

export default function Header({ setIsDarkTheme }) {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <div className={styles.Header}>
      {/* logo */}
      <Link to={"/"}>
        <div className={styles.imgContainer}>
          <img src={logo} alt="logo" />
        </div>
        <span>Global Techify</span>
      </Link>

      <div className={styles.navbarContainer}>
        <div className={styles.desktopNavbar}>
          <DesktopNavbar />
        </div>

        <div className={styles.mobileNavbar}>
          <MobileNavbar
            setIsShowSidebar={setIsShowSidebar}
            isShowSidebar={isShowSidebar}
          />
        </div>

        <div className={styles.switchTheme}>
          <SwitchTheme setIsDarkTheme={setIsDarkTheme} />
        </div>

        <FaBarsStaggered onClick={() => setIsShowSidebar(true)} />
      </div>
    </div>
  );
}
