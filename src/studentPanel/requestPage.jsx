/** @format */

import React, { useEffect, useState } from "react";
import MeetCard from "./components/MeetCard";

const StudentRequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const studentId = localStorage.getItem("gtechify!#");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/meet/all/student/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const req = data.filter((item) => item.approval === false);
        setRequests(req);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5vw" }}>
      {requests.length
        ? requests?.map((item, key) => (
            <MeetCard
              key={key}
              buttons={[]}
              item={item}
            />
          ))
        : "no meet requests yet......"}
    </div>
  );
};

export default StudentRequestPage;
