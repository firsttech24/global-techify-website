import React, { useState } from "react";
import styles from "./studentAuth.module.css";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

export default function StudentAuth() {
  const [isSignin, setIsSignin] = useState(true);
  return (
    <div className={styles.StudentAuth}>
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
