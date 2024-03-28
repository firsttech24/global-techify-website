import React, { useState } from "react";
import styles from "./authPage.module.css";

import StudentAuth from "../../components/auth/studentAuth/StudentAuth";
import MentorAuth from "../../components/auth/mentorAuth/MentorAuth";

export default function AuthPage() {
  const [selectAuth, setSelectAuth] = useState("student");
  return (
    <div className={styles.AuthPage}>
      <div className={styles.selectAuth}>
        <button
          onClick={() => setSelectAuth("student")}
          className={`${styles.btn} ${
            selectAuth === "student" ? styles.selectedAuth : ""
          }`}
        >
          STUDENT
        </button>
        <button
          onClick={() => setSelectAuth("mentor")}
          className={`${styles.btn} ${
            selectAuth === "mentor" ? styles.selectedAuth : ""
          }`}
        >
          MENTOR
        </button>
        <button
          onClick={() => setSelectAuth("college")}
          className={`${styles.btn} ${
            selectAuth === "college" ? styles.selectedAuth : ""
          }`}
        >
          COLLEGE
        </button>
      </div>

      <div className={styles.auth}>
        {selectAuth === "student" && <StudentAuth />}

        {selectAuth === "mentor" && <MentorAuth />}
      </div>
    </div>
  );
}
