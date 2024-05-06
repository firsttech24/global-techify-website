/** @format */

import React, { useEffect, useState } from "react";
import styles from "./meetcard.module.css";
import {
  FaUser,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaRegClock as FaClockIcon,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const MeetCard = ({ buttons, item, upcomingMeetCard }) => {
  const studentId = localStorage.getItem("gtechify!#");
  const fetchMeetData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/meet/all/student/${studentId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("gtechifyAllStudentMeets", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const checkOutHandler = async (amount) => {
  const response = await fetch(
    `${import.meta.env.VITE_HOST_API}/meet/paymentgateway`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 5000 }),
    }
  );

  const order = await response.json(); // Parse response as JSON
  const options = {
    key: "rzp_test_BbdZCd9xvyEEFa",
    amount: order.amount,
    currency: "INR",
    name: "6 Pack Programmer",
    description: "Tutorial of RazorPay",
    image: "https://avatars.githubusercontent.com/u/25058652?v=4",
    order_id: order.id,
    callback_url: `${import.meta.env.VITE_HOST_API}/meet/checkout`,
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#121212",
    },
    payment_method: {
      method: "upi",
    },
  };
  const razor = new window.Razorpay(options);
  razor.open();
};


  const approvePayMeet = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/meet/payment/done/${item._id}/0394`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      fetchMeetData();
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.studentName}>{item.mentor.name}</div>
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

      {
       ( upcomingMeetCard && item.link != "") && (
        <a target="_blank" href={item.link} className={styles.linkhref}>
           join
        </a>
       )
      }
      {
       ( upcomingMeetCard && item.link == "") && (
        <button>
          request for meet link
        </button>
       )
      }
      {buttons.length !== 0 && (
        <div className={styles.buttonsContainer}>
          <button
            className={styles.acceptButton}
            onClick={checkOutHandler}>
            <FaCheckCircle className={styles.icon} />
            Pay ${item.price}
          </button>
          <button className={styles.ignoreButton}>
            <FaTimesCircle className={styles.icon} />
            Ignore
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetCard;
