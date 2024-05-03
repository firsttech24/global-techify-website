import React, { useEffect, useState } from 'react'
import styles from "./acceptedRequested.module.css"
import {useNavigate} from "react-router-dom"
import UserCard from "./components/UserCard";

const AcceptedRequests = () => {
  const buttons= [];
  const linkRequires = true;
  const [meets, setMeets] = useState([]);
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
          (item) => item.approval === true && item.payment === false
        );
        setMeets(req);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5vw" }}>
      {meets.length
        ? meets?.map((item, key) => (
            <UserCard
              key={key}
              buttons={buttons}
              item={item}
            />
          ))
        : "loading......"}
      {/* <UserCard buttons={buttons}/> */}
    </div>
  );
}

export default AcceptedRequests
