import React, { useState } from "react";
import styles from "./authPage.module.css";

import StudentAuth from "../../components/auth/studentAuth/StudentAuth";
import MentorAuth from "../../components/auth/mentorAuth/MentorAuth";
import CollegeAuth from "../../components/auth/collegeAuth/CollegeAuth";

export default function AuthPage() {
  const [selectAuth, setSelectAuth] = useState("student");
  return (
    <div className={styles.AuthPage}>
      {/* categories */}
      <div data-aos="fade-up" className={styles.btns}>
        <button
          onClick={() => setSelectAuth("student")}
          className={`${styles.btn} ${
            selectAuth === "student" ? styles.filledBtn : ""
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setSelectAuth("mentor")}
          className={`${styles.btn} ${
            selectAuth === "mentor" ? styles.filledBtn : ""
          }`}
        >
          Mentor
        </button>
        <button
          onClick={() => setSelectAuth("college")}
          className={`${styles.btn} ${
            selectAuth === "college" ? styles.filledBtn : ""
          }`}
        >
          College
        </button>
      </div>

      <div className={styles.auth}>
        {selectAuth === "student" && <StudentAuth />}

        {selectAuth === "mentor" && <MentorAuth />}

        {selectAuth === "college" && <CollegeAuth />}
      </div>
    </div>
  );
}
