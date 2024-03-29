import React from "react";
import styles from "./mentorPage.module.css";
import { TbFilterEdit } from "react-icons/tb";

export default function MentorPage() {
  return (
    <div className={styles.MentorPage}>
      <div className={styles.leftContainer}>
        <div className={styles.heading}>
          <TbFilterEdit />
          Filters
        </div>
        <div className={styles.search}></div>
      </div>
      <div className={styles.rightContainer}>all mentors</div>
    </div>
  );
}
