/** @format */

import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("meetrequests");
  const [mentorData, setMentorData] = useState({});

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const mentorId = localStorage.getItem("gtechify!#");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/mentor/get/${mentorId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setMentorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.sidebar}>
      <img className={styles.imageInSidebar} src={mentorData.profile}/>
      <span>{mentorData.name}</span>
      <button className={styles.profileButton}>View profile</button>
      <div className={styles.navlist}>
        <Link to={"/mentor/meetrequests"}>
          <button
            className={
              activeButton === "meetrequests"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("meetrequests")}>
            Meet Requests
          </button>
        </Link>
        <Link to={"/mentor/acceptedrequests"}>
          <button
            className={
              activeButton === "acceptedrequests"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("acceptedrequests")}>
            Accepted Requests
          </button>
        </Link>
        <Link to={"/mentor/upcomingsessions"}>
          <button
            className={
              activeButton === "upcomingsessions"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("upcomingsessions")}>
            Upcoming Sessions
          </button>
        </Link>
        <Link to={"/mentor/completedsessions"}>
          <button
            className={
              activeButton === "completedsessions"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("completedsessions")}>
            Completed Sessions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
