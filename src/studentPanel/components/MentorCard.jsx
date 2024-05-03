/** @format */

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
      <CalenderModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mentor={mentor}
      />
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <img
            className={styles.avatar}
            src={mentor.profile}
            alt="Avatar"
          />
          <h2 className={styles.name}>{mentor.name}</h2>
        </div>
        <p className={styles.companyPosition}>
          <FaBriefcase /> {mentor?.currentCompany?.position},{" "}
          {mentor?.currentCompany?.company}
        </p>
        <p className={styles.profileInfo}>
          <FaUser />{" "}
          {mentor.areasOfInterest.length < 3
            ? mentor?.areasOfInterest?.join(", ")
            : mentor?.areasOfInterest.slice(0, 2).join(", ") +
              " +" +
              mentor.areasOfInterest.length +
              " more"}
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>View Profile</button>
          <button
            className={styles.button}
            onClick={() => setIsOpen(true)}>
            Book Schedule
          </button>
        </div>
        <div className={styles.socialIcons}>
          <span>
            <FaLinkedin />
          </span>
          <span>
            <FaGithub />
          </span>
          <span>
            <FaTwitter />
          </span>
          <span>
            <FaEnvelope />
          </span>
        </div>
        <div className={styles.weekdays}>
          <span
            className={
              mentor?.schedule?.monday?.length ? styles.activedays : ""
            }>
            M
          </span>
          <span
            className={
              mentor?.schedule?.tuesday?.length ? styles.activedays : ""
            }>
            T
          </span>
          <span
            className={
              mentor?.schedule?.wednesday?.length ? styles.activedays : ""
            }>
            W
          </span>
          <span
            className={
              mentor?.schedule?.thursday?.length ? styles.activedays : ""
            }>
            T
          </span>
          <span
            className={
              mentor?.schedule?.friday?.length ? styles.activedays : ""
            }>
            F
          </span>
          <span
            className={
              mentor?.schedule?.saturday?.length ? styles.activedays : ""
            }>
            S
          </span>
          <span
            className={
              mentor?.schedule?.sunday?.length ? styles.activedays : ""
            }>
            S
          </span>
        </div>
      </div>
    </>
  );
};

export default MentorCard;
