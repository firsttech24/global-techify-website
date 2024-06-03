import React, { useState } from "react";
import styles from "./mentorcard.module.css";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";
import CalenderModel from "./calenderModel";

const MentorCard = ({ mentor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CalenderModel isOpen={isOpen} setIsOpen={setIsOpen} mentor={mentor} />

      <div className={`flex-col-center ${styles.singleContainer}`}>
        {/* header */}
        <div className={`flex-row-center ${styles.cardHeader}`}>
          <div className={`flex-row-center ${styles.avatar}`}>
            <img src={mentor.profile} alt="Avatar" />
          </div>
          <h2 className={styles.name}>{mentor.name}</h2>
        </div>

        {/* details */}
        <div className={`flex-col-center ${styles.details}`}>
          <p className={`flex-row-center ${styles.companyPosition}`}>
            <FaBriefcase /> {mentor?.currentCompany?.position},{" "}
            {mentor?.currentCompany?.company}
          </p>
          <p className={`flex-row-center ${styles.profileInfo}`}>
            <FaUser />{" "}
            {mentor.areasOfInterest.length < 3
              ? mentor?.areasOfInterest?.join(", ")
              : mentor?.areasOfInterest.slice(0, 2).join(", ") +
                " +" +
                mentor.areasOfInterest.length +
                " more"}
          </p>
        </div>

        {/* btns */}
        <div className={`flex-row-center ${styles.buttonContainer}`}>
          <button className={styles.button}>View Profile</button>
          <button className={styles.button} onClick={() => setIsOpen(true)}>
            Book Schedule
          </button>
        </div>

        {/* social icons */}
        <div className={`flex-row-center ${styles.socialIcons}`}>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaGithub />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaEnvelope />
          </a>
        </div>

        {/* weekdays */}
        <div className={`flex-row-center ${styles.weekdays}`}>
          <span
            className={
              mentor?.schedule?.monday?.length ? styles.activedays : ""
            }
          >
            M
          </span>
          <span
            className={
              mentor?.schedule?.tuesday?.length ? styles.activedays : ""
            }
          >
            T
          </span>
          <span
            className={
              mentor?.schedule?.wednesday?.length ? styles.activedays : ""
            }
          >
            W
          </span>
          <span
            className={
              mentor?.schedule?.thursday?.length ? styles.activedays : ""
            }
          >
            T
          </span>
          <span
            className={
              mentor?.schedule?.friday?.length ? styles.activedays : ""
            }
          >
            F
          </span>
          <span
            className={
              mentor?.schedule?.saturday?.length ? styles.activedays : ""
            }
          >
            S
          </span>
          <span
            className={
              mentor?.schedule?.sunday?.length ? styles.activedays : ""
            }
          >
            S
          </span>
        </div>
      </div>
    </>
  );
};

export default MentorCard;
