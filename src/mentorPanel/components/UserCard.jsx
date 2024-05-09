/** @format */

import React, { useEffect, useState } from "react";
import styles from "./usercard.module.css";
import {
  FaUser,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaRegClock as FaClockIcon,
  FaCheckCircle,
  FaTimesCircle,
  FaPlaneDeparture,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserCard = ({ buttons, item, linkRequired }) => {
  const [studentData, setStudentData] = useState({});
  const [meetId, setMeetId] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/user/get/${item.student._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setStudentData(jsonData);
      // setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendLink = async () => {
    try {
      const url = `${import.meta.env.VITE_HOST_API}/meet/updatelink/${item._id}`;
      const requestBody = {
        meetingUrl: meetId,
      };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      alert(response.json().message);
      throw new Error("Failed to fetch data");
    }

    const jsonData = await response.json();
    console.log(jsonData);
    navigate("/mentor/upcomingsessions");
  } catch (error) {
    console.log(error);
  }

  };

  const approveMeet = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/meet/approval/${item._id}`
      );
      if (!response.ok) {
        alert(response.json().message);
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      navigate("/mentor/acceptedrequests");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.studentName}>{studentData.name}</div>
      <button className={styles.leftUserProfileButton}>View Profile</button>
      <div className={styles.meetCategory}>{item.type}</div>
      <div className={styles.meetDetails}>
        <span>
          <FaUser /> {item.topic}
        </span>
        <span>
          <FaClock /> {item.duration} minutes
        </span>
        <span>
          <FaDollarSign /> Rs. {item.price}
        </span>
        <span>
          <FaCalendarAlt /> {item.date}
        </span>
        <span>
          <FaClockIcon /> {item.startTime} - {item.endTime}
        </span>
      </div>
      {linkRequired && item.link == "" && (
        <div className={styles.linkBox}>
          <input
            type="text"
            placeholder="paste the meet link here..."
            value={meetId}
            onChange={(e) => setMeetId(e.target.value)}
          />
          <FaPlaneDeparture onClick={sendLink} />
        </div>
      )}
      {linkRequired && item.link != "" && (
        <a className={styles.linkhref} href={item.link}>{item.link}</a>
      )}
      {buttons.length !== 0 && (
        <>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.acceptButton}
              onClick={approveMeet}>
              <FaCheckCircle className={styles.icon} />
              Accept
            </button>
            <button className={styles.ignoreButton}>
              <FaTimesCircle className={styles.icon} />
              Ignore
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
