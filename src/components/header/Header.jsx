import React, { useState } from "react";
import styles from "./header.module.css";
import logo from "./../../assets/logo.jpeg";
import DesktopNavbar from "./desktopNavbar/DesktopNavbar";
import MobileNavbar from "./mobileNavbar/MobileNavbar";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  return (
    <div className={styles.Header}>
      {/* logo */}
      <Link to={"/"}>
        <div className={styles.imgContainer}>
          <img src={logo} alt="logo" />
        </div>
      </Link>

      {/* search */}
      <div className={styles.searchContainer}>
        <input type="text" className={styles.input} placeholder="Search..." />
      </div>

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
        <FaBarsStaggered onClick={() => setIsShowSidebar(true)} />
      </div>
    </div>
  );
}
