/** @format */

import React, { useEffect, useState } from "react";
import MentorCard from "./components/MentorCard";

const Allmentors = () => {
  const [mentors, setMentors] = useState([]);
  const fetchAllMentors = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/approved`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMentors(data.all)
      });
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5vw" }}>
        {mentors?.length &&
          mentors?.map((mentor, key) => (
            <MentorCard
              key={key}
              mentor={mentor}
            />
          ))}
      </div>
    </>
  );
};

export default Allmentors;
