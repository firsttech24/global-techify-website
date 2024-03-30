import React, { useState } from "react";
import styles from "./collegeAuth.module.css";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

export default function CollegeAuth() {
  const [isSignin, setIsSignin] = useState(true);
  return (
    <div data-aos="fade-up" className={`${styles.CollegeAuth} `}>
      {/* left container */}
      <div
        className={` ${styles.authContainer} ${
          !isSignin ? styles.signedIn : ""
        }`}
      >
        {isSignin && <Signin />}
        {!isSignin && <Signup />}
      </div>

      {/* right container */}
      <div
        className={`${styles.selectAuth}  ${
          !isSignin ? styles.signedInTwo : ""
        }`}
      >
        {isSignin ? (
          <p className={`bigText ${styles.title}`}>
            Don't have an account ? Please &nbsp;&nbsp;&nbsp;&nbsp; sign up !
          </p>
        ) : (
          <p className={`bigText ${styles.title}`}>
            If you already have an account, Please sign in !
          </p>
        )}
        {!isSignin && (
          <button
            className={`btn1 ${styles.btn} ${
              !isSignin ? styles.selectedAuth : ""
            }`}
            onClick={() => setIsSignin(true)}
          >
            SIGNIN
          </button>
        )}

        {isSignin && (
          <button
            className={`btn1 ${styles.btn} ${
              !isSignin ? styles.selectedAuth : ""
            }`}
            onClick={() => setIsSignin(false)}
          >
            SIGNUP
          </button>
        )}
      </div>
    </div>
  );
}
