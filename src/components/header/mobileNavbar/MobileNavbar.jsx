import React, { useState } from "react";
import styles from "./mobileNavbar.module.css";
import { Link } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function MobileNavbar({ setIsShowSidebar, isShowSidebar }) {
  const [showPanelsDropDown, setShowPanelsDropDown] = useState(false);
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
        {/* <Link to={"/mentor"} onClick={() => setIsShowSidebar(false)}>
          <li>Mentor</li>
        </Link> */}
        <Link to={"/services"} onClick={() => setIsShowSidebar(false)}>
          <li>Services</li>
        </Link>
        {/* panels */}
        <li onClick={() => setShowPanelsDropDown(prev => !prev)}>
          <div className={styles.name}>
            Panels{" "}
            {!showPanelsDropDown && (
              <RiArrowDropDownLine className={styles.dropDownIcon} />
            )}
            {showPanelsDropDown && (
              <RiArrowDropUpLine className={styles.dropDownIcon} />
            )}
          </div>
          {/* panels dropdown */}
          {showPanelsDropDown && (
            <div className={styles.dropDownContainer}>
              <Link
                href={"/mentor-panel"}
                onClick={() => setIsShowSidebar(false)}
              >
                <li>Mentor Panel</li>
              </Link>
              <Link
                href={"/student-panel"}
                onClick={() => setIsShowSidebar(false)}
              >
                <li>Student Panel</li>
              </Link>
            </div>
          )}
        </li>

        <Link to={"/team"} onClick={() => setIsShowSidebar(false)}>
          <li>Our Team</li>
        </Link>
        <Link to={"/contact"} onClick={() => setIsShowSidebar(false)}>
          <li>Contact</li>
        </Link>

        <Link to={"/auth"} onClick={() => setIsShowSidebar(false)}>
          <li>Signin</li>
        </Link>
        <IoIosCloseCircle
          onClick={() => setIsShowSidebar(false)}
          className={styles.close}
        />
      </ul>
    </nav>
  );
}
