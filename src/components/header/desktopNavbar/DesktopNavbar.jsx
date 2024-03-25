import React from "react";
import styles from "./desktopNavbar.module.css";
import { Link } from "react-router-dom";

export default function DesktopNavbar() {
  return (
    <nav className={styles.DesktopNavbar}>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/about"}>
          <li>About</li>
        </Link>
        <Link to={"/"}>
          <li>Mentor</li>
        </Link>
        <Link to={"/"}>
          <li>Services</li>
        </Link>
        <Link to={"/"}>
          <li>Our Team</li>
        </Link>
        <Link to={"/"}>
          <li>Contact</li>
        </Link>
        <Link to={"/auth"}>
          <li>Signin</li>
        </Link>
      </ul>
    </nav>
  );
}
