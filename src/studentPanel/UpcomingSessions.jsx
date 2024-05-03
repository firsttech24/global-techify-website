/** @format */

import React, { useEffect, useState } from "react";
import MeetCard from "./components/MeetCard";

const StudentUpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const buttons = [];
  const upcomingMeetCard = true;
  const studentId = localStorage.getItem("gtechify!#");
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(
           `${import.meta.env.VITE_HOST_API}/meet/all/student/${studentId}`
         );
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         const data = await response.json();
         const req = data.filter(
           (item) => item.approval === true && item.payment === true
         );
         setSessions(req);
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     fetchData();
   }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5vw" }}>
      {sessions.length
        ? sessions?.map((item, key) => (
            <MeetCard
              key={key}
              buttons={buttons}
              upcomingMeetCard = {upcomingMeetCard}
              item={item}
            />
          ))
        : "No upcoming sessions for now......"}
    </div>
  );
};

export default StudentUpcomingSessions;
