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
  /*   const searchRef = useRef(null);

  const handleMouseHover = e => {
    searchRef.current.setAttribute("style", "width: 20vw");
  };

  const handleMouseOut = () => {
    setTimeout(() => {
      searchRef.current.setAttribute("style", "width: 0");
    }, 5000);
  }; */

  return (
    <div className={styles.Header}>
      {/* logo */}
      <Link to={"/"}>
        <div className={styles.imgContainer}>
          <img src={logo} alt="logo" />
        </div>
        <span>Global Techify</span>
      </Link>

      {/* search */}
      {/*  <div
        className={styles.searchContainer}
        onMouseOver={handleMouseHover}
        onMouseOut={handleMouseOut}
      >
        <input
          ref={searchRef}
          type="text"
          className={styles.input}
          placeholder="Search..."
        />
        <FaSearch />
      </div> */}

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
