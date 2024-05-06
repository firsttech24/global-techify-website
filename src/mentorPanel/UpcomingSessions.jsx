/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./components/UserCard";
import loader from "./../assets/loader.svg";

const UpcomingSessions = () => {
  const buttons = [];
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const linkRequires = true;
  const navigate = useNavigate();

  useEffect(() => {
    const mentorId = localStorage.getItem("gtechify!#");
    if (!mentorId) navigate("/auth");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_HOST_API}/meet/all/mentor/${mentorId}`
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
          <UserCard
            key={key}
            linkRequired={linkRequires}
            buttons={buttons}
            item={item}
          />
        ))
      ) : (
        "No upcoming sessions..."
      )}
    </div>
  );
};

export default UpcomingSessions;
