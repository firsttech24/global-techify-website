/** @format */

import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import styles from "./mentordashboard.module.css";
import UserCard from "./components/UserCard";
import { Outlet } from "react-router-dom";

const MentorDashboard = () => {
  const mentorId = localStorage.getItem("gtechify!#");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/meet/all/mentor/${mentorId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        sessionStorage.setItem("gtechifyAllMentorMeets", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.mainDashboard}>
        <Outlet />
      </div>
    </div>
  );
};

export default MentorDashboard;
