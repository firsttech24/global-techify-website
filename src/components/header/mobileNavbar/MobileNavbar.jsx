import React from "react";
import styles from "./mobileNavbar.module.css";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

export default function MobileNavbar({ setIsShowSidebar, isShowSidebar }) {
  return (
    <nav
      className={`${styles.MobileNavbar} ${
        isShowSidebar ? styles.showSidebar : ""
      }`}
    >
      <ul>
        <Link to={"/"} onClick={() => setIsShowSidebar(false)}>
          <li>Home</li>
        </Link>
        <Link to={"/about"} onClick={() => setIsShowSidebar(false)}>
          <li>About</li>
        </Link>
        <Link to={"/"} onClick={() => setIsShowSidebar(false)}>
          <li>Mentor</li>
        </Link>
        <Link to={"/services"} onClick={() => setIsShowSidebar(false)}>
          <li>Services</li>
        </Link>
        <Link to={"/team"} onClick={() => setIsShowSidebar(false)}>
          <li>Our Team</li>
        </Link>
        <Link to={"/contact"} onClick={() => setIsShowSidebar(false)}>
          <li>Contact</li>
        </Link>
        <IoIosCloseCircle
          onClick={() => setIsShowSidebar(false)}
          className={styles.close}
        />
      </ul>
    </nav>
  );
}
