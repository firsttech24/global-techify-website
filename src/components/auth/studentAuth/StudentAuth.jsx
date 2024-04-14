import React, { useState } from "react";
import styles from "./studentAuth.module.css";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";

import { ColorRing } from "react-loader-spinner";

export default function StudentAuth() {
  const [isSignin, setIsSignin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div data-aos="fade-up" className={`${styles.StudentAuth} `}>
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
