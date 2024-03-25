import React from "react";
import styles from "./aboutPage.module.css";

import about from "./../../assets/about/about.png";
import mission from "./../../assets/about/mission.svg";
import vision from "./../../assets/about/vision.svg";

export default function AboutPage() {
  const missionVisionArr = [
    {
      title: "Mission",
      des: "Our mission is to be passionate in anticipating and providing the best floating products and experiences that excite our customers.",
      img: mission,
    },
    {
      title: "Vision",
      des: "Our vision is to revolutionize the floatation industry through our quality & IP driven products and services.",
      img: vision,
    },
  ];
  return (
    <div className={styles.AboutPage}>
      <div className={styles.topContainer}>
        <div className={styles.left}>
          <h1 data-aos="fade-up">About</h1>
          <p data-aos="fade-up" className="normalText">
            Global Techify is a startup that provides mentorship to students. We
            empower students to stay up-to-date with the latest advancements in
            technology and connect them with experts from leading companies. Our
            goal is to help students explore their interests and pave their way
            towards a successful career in technology. At Global Techify, we
            believe in the power of mentorship and the potential of the next
            generation of tech leaders.
          </p>
        </div>
        <div data-aos="fade-left" className={styles.imgContainer}>
          <img src={about} alt="about" />
        </div>
      </div>

      <div className={styles.bottomContainer}>
        {missionVisionArr?.map((item, index) => (
          <div
            data-aos="zoom-in"
            className={styles.singleContainer}
            key={index}
          >
            <h2 className={styles.title}>{item.title}</h2>
            <div className={styles.bottom}>
              <div className={styles.imgContainer}>
                <img src={item.img} alt={item.title} className={styles.img} />
              </div>
              <p className={styles.des}>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
