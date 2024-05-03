/** @format */

import React, { useEffect, useState } from "react";
import styles from "./studentDashboard.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const StudentDashboard = () => {
  const [mentors, setMentors] = useState([]);
  const fetchAllMentors = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/approved`)
      .then((response) => response.json())
      .then((data) => {
        const all = JSON.stringify(data.all);
      });
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  const studentId = localStorage.getItem("gtechify!#");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/meet/all/student/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        sessionStorage.setItem("gtechifyAllStudentMeets", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.studentPanel}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.mainDashboard}>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
