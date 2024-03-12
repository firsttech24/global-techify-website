import React from "react";
import styles from "./desktopNavbar.module.css";
import { Link } from "react-router-dom";

export default function DesktopNavbar() {
  return (
    <nav className={styles.DesktopNavbar}>
      <Link to={"/"} className={styles.navLink}>
        Products
      </Link>
      <Link to={"/"} className={styles.navLink}>
        Chat with Us
      </Link>
      <Link to={"/"} className={`${styles.navLink} ${styles.signIn} btn1`}>
        Sign in
      </Link>
    </nav>
  );
}
