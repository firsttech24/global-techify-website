/** @format */

import React, { useEffect, useState } from "react";
import MentorCard from "./components/MentorCard";
import loader from "./../assets/loader.svg";

const Allmentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllMentors = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/approved`)
      .then((response) => {
        if (!response.ok) {
          alert(response.json().message || "server error");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMentors(data.all);
      })
      .catch((error) => {
        console.error("Error fetching mentors:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5vw" }}>
        {loading ? (
          <img
            src={loader}
            alt="Loading..."
          />
        ) : (
          mentors?.map((mentor, key) => (
            <MentorCard
              key={key}
              mentor={mentor}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Allmentors;
