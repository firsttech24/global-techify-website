import React from 'react'
import styles from "./usercard.module.css"
// import { ImProfile } from "react-icons/im";

const UserCard = ({buttons}) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.leftUserCard}>
        <img
          src=""
          alt=""
          className={styles.profileImage}
        />
        <button className={styles.leftUserProfileButton}>View Profile</button>
      </div>
      <div className={styles.rightUserCard}>
        <div className={styles.studentName}>Student Name</div>
        <div className={styles.meetCategory}>category</div>
        <div className={styles.meetDetails}>
          {" "}
          <span> profile</span> <span>duration</span> <span>price</span>
          <span>date</span> <span>time</span>
        </div>

        <div>
            {buttons.map(item => <button key={item}>{item}</button>)}
        </div>
      </div>
    </div>
  );
}

export default UserCard
