/** @format */

import React, { useEffect, useState } from "react";
import MeetCard from "./components/MeetCard";
import loader from "./../assets/loader.svg";

const StudentRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem("gtechify!#")).id;
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/meet/all/student/${studentId}`
        );
        if (!response.ok) {
          alert(response.json().message || "server error");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const req = data.filter((item) => item.approval === false);
        setRequests(req);
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
      ) : requests.length ? (
        requests.map((item, key) => (
          <MeetCard
            key={key}
            buttons={[]}
            item={item}
          />
        ))
      ) : (
        "No meet requests yet......"
      )}
    </div>
  );
};

export default StudentRequestPage;
