import React, { useState } from "react";
import styles from "./mentorAuth.module.css";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

export default function MentorAuth() {
  const [isSignin, setIsSignin] = useState(true);
  return (
    <div className={styles.MentorAuth}>
      <div className={styles.authContainer}>
        {isSignin && <Signin />}
        {!isSignin && <Signup />}
      </div>

      <div className={styles.selectAuth}>
        <button
          className={`${styles.btn} ${isSignin ? styles.selectedAuth : ""}`}
          onClick={() => setIsSignin(true)}
        >
          SIGNIN
        </button>
        <button
          className={`${styles.btn} ${!isSignin ? styles.selectedAuth : ""}`}
          onClick={() => setIsSignin(false)}
        >
          SIGNUP
        </button>
      </div>
    </div>
  );
}
