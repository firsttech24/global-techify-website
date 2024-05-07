/** @format */

import React, { useEffect, useState } from "react";
import MeetCard from "./components/MeetCard";
import loader from "./../assets/loader.svg";

const StudentUpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const buttons = [];
  const upcomingMeetCard = true;
  const studentId = JSON.parse(localStorage.getItem("gtechify!#")).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/meet/all/student/${studentId}`
        );
        if (!response.ok) {
          alert(response.json().message || "server error");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const req = data.filter(
          (item) => item.approval === true && item.payment === true
        );
        setSessions(req);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5vw" }}>
      {loading ? (
        <img
          src={loader}
          alt="Loading..."
        />
      ) : sessions.length ? (
        sessions.map((item, key) => (
          <MeetCard
            key={key}
            buttons={buttons}
            upcomingMeetCard={upcomingMeetCard}
            item={item}
          />
        ))
      ) : (
        "No upcoming sessions for now......"
      )}
    </div>
  );
};

export default StudentUpcomingSessions;
