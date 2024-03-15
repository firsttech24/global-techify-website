import React, { useState, useEffect } from "react";
import styles from "./countUp.module.css";
import CountUp from "react-countup";

{
  /* <CountUp start={0} end={100000} duration={3} />; */
}

export default function Count() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const targetPosition =
        document.getElementById("countUpSection").offsetTop;
      if (scrollPosition > targetPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const countUpArr = [
    {
      count: 200000,
      title: "Users",
    },
    {
      count: 10000,
      title: "Mentors",
    },
    {
      count: 1500,
      title: "Companies",
    },
    {
      count: 1900,
      title: "Colleges",
    },
    {
      count: 15000,
      title: "Opportunities",
    },
  ];
  return (
    <div id="countUpSection" className={styles.CountUp}>
      {countUpArr?.map((item, index) => (
        <div
          key={index}
          className={`${styles.countContainer} ${
            isVisible ? styles.visible : ""
          }`}
          data-aos={"fade-up"}
          data-aos-anchor-placement="bottom-bottom"
        >
          {isVisible && (
            <CountUp
              start={0}
              end={item.count}
              duration={3}
              className={styles.count}
            />
          )}
          <p className={styles.title}>{item.title}</p>
        </div>
      ))}
    </div>
  );
}
