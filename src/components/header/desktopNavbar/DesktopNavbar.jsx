/** @format */

import React, { useEffect, useState } from "react";
import styles from "./desktopNavbar.module.css";
import { Link } from "react-router-dom";

export default function DesktopNavbar({ panel, pic }) {
  return (
    <nav className={styles.DesktopNavbar}>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/about"}>
          <li>About</li>
        </Link>
        {/* <Link to={"/mentor"}>
          <li>Mentor</li>
        </Link> */}
        <Link to={"/services"}>
          <li>Services</li>
        </Link>
        <Link to={"/team"}>
          <li>Our Team</li>
        </Link>
        <Link to={"/contact"}>
          <li>Contact</li>
        </Link>

        {/* panels */}
        {panel == "" && (
          <li className={`${styles.products}`}>
            <span className={styles.span}>Panels</span>
            <ul className={styles.productsHoverContainer}>
              <Link to={"/mentor/meetrequests"}>
                <li className={styles.list}>Mentor Panel</li>
              </Link>

              <Link to={"/student/mentors"}>
                <li className={styles.list}>Student Panel</li>
              </Link>
            </ul>
          </li>
        )}
        {panel == "student" && (
          <Link to={"/student/mentors"}>
            <li>Panel</li>
          </Link>
        )}
        {panel == "mentor" && (
          <Link to={"/mentor/meetrequests"}>
            <li>Panel</li>
          </Link>
        )}

        {pic == "" && (
          <Link to={"/auth"}>
            <li>Signin</li>
          </Link>
        )}
        {pic != "" && (
          <Link to={`${panel}-profile`}>
            <img
              src={pic}
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                border: "2px solid var(--themeColor)",
              }}
            ></img>{" "}
          </Link>
        )}
      </ul>
    </nav>
  );
}
