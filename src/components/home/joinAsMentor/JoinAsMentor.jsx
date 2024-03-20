import React from "react";
import styles from "./joinAsMentor.module.css";
import { FaRegLightbulb } from "react-icons/fa";
import { IoPricetagOutline, IoBuildOutline } from "react-icons/io5";

import mentorIcon from "./../../../assets/home/joinAsMentor/mentorIcon.svg";

export default function JoinAsMentor() {
  return (
    <div className={styles.JoinAsMentor}>
      <div className={styles.leftContainer}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>
            Want to join as a <span className={styles.span}>Mentor ?</span>
          </h1>
          <p className="minorText">
            Joining us as a mentor has many benefits, which are:
          </p>
        </div>
        <ul className={styles.listContainer}>
          <li className={styles.list}>
            <FaRegLightbulb />
            <span className="normalText">
              you can connect and earn without any hassle
            </span>
          </li>
          <li className={styles.list}>
            <IoPricetagOutline />
            <span className="normalText">
              set your own price and availability
            </span>
          </li>
          <li className={styles.list}>
            <IoBuildOutline />
            <span className="normalText">Build your own personal brand</span>
          </li>
        </ul>
        <button className={`btn1 ${styles.btn}`}>Become a Mentor</button>
      </div>
      <div className={styles.rightContainer}>
        <img src={mentorIcon} alt="mentor" />
      </div>
    </div>
  );
}
