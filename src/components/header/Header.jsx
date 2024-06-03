import React, { useState, useRef, useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { SwitchTheme } from "./../switchTheme/SwitchTheme";

// import { FaSearch } from "react-icons/fa";
import DesktopNavbar from "./desktopNavbar/DesktopNavbar";
import MobileNavbar from "./mobileNavbar/MobileNavbar";
import logo from "./../../assets/logo.svg";

export default function Header({ setIsDarkTheme, isLogin, isLogout }) {
  const navigate = useNavigate();
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [panel, setPanel] = useState("");
  const [pic, setPic] = useState("");

  useEffect(() => {
    console.log("working");
    const log = JSON.parse(localStorage.getItem("gtechify!#"));
    if (log != null) {
      if (log.role == "mentor") {
        fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/${log.id}`)
          .then(response => {
            if (!response.ok) navigate("/");
            else setPanel("mentor");
            return response.json();
          })
          .then(data =>
            setPic(
              data.profile ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdiKmb2SRGbNJDB5sE1EzzxmNNRfxSLSKrA&s"
            )
          )
          .catch(error => {
            console.error("Error fetching mentor data:", error);
          });
      }
      if (log.role == "student") {
        fetch(`${import.meta.env.VITE_HOST_API}/user/get/${log.id}`)
          .then(response => {
            if (!response.ok) navigate("/");
            else setPanel("student");
            return response.json();
          })
          .then(data =>
            setPic(
              data.profile ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdiKmb2SRGbNJDB5sE1EzzxmNNRfxSLSKrA&s"
            )
          )
          .catch(error => {
            console.error("Error fetching mentor data:", error);
          });
      }
    } else {
      setPanel("");
      setPic("");
    }
  }, [isLogin, isLogout]);

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
          <DesktopNavbar panel={panel} pic={pic} />
        </div>

        <div className={styles.mobileNavbar}>
          <MobileNavbar
            setIsShowSidebar={setIsShowSidebar}
            isShowSidebar={isShowSidebar}
            panel={panel}
            pic={pic}
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
