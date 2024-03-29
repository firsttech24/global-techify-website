import React, { useEffect, useState } from "react";
import styles from "./ourTeamPage.module.css";

import leader01 from "./../../assets/ourTeam/leader01.png";
import leader02 from "./../../assets/ourTeam/leader02.png";
import leader03 from "./../../assets/ourTeam/leader03.png";
import member01 from "./../../assets/ourTeam/member01.png";
import member02 from "./../../assets/ourTeam/member02.png";
import advisor01 from "./../../assets/ourTeam/advisor01.png";
import ourTeam from "./../../assets/ourTeam/ourTeam.png";

const leadersArr = [
  {
    img: leader01,
    name: "Amisha Prajapati",
    position: "Technical Executive",
    contactInfo: "https://www.linkedin.com/in/amisha-prajapati-7b4aa9200/",
  },
  {
    img: leader02,
    name: "Ritiwij Singh",
    position: "Technical Executive",
    contactInfo: "https://www.linkedin.com/in/ritiwij-singh-69a6b4226/",
  },
  {
    img: leader03,
    name: "Vineet Soni",
    position: "Technical Executive",
    contactInfo: "https://www.linkedin.com/in/vineet-soni-00997222a/",
  },
];

const membersArr = [
  {
    img: member01,
    name: "Apoorv Dubey",
    position: "Technical Executive",
    contactInfo: "https://www.linkedin.com/in/apoorv-dubey-a5b4ab26a/",
  },
  {
    img: member02,
    name: "Abhishek Shukla",
    position: "Technical Executive",
    contactInfo: "https://www.linkedin.com/in/abhishek-shukla-350713255/",
  },
];

const advisorArr = [
  {
    img: advisor01,
    name: "Swatantra Soni",
    position: "Technical Executive",
    contactInfo: "#",
  },
];

export default function OurTeamPage() {
  const [category, setCategory] = useState("leaders");
  const [team, setTeam] = useState(leadersArr);

  useEffect(() => {
    if (category === "leaders") {
      setTeam(leadersArr);
    } else if (category === "members") {
      setTeam(membersArr);
    } else {
      setTeam(advisorArr);
    }
  }, [category]);

  return (
    <div className={styles.OurTeamPage}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <h1 data-aos="fade-up">Our Team</h1>
          <p data-aos="fade-up" className="normalText">
            Our aim is to create a better world in the floatation industry
            through our innovative and IP driven products and services. Our Team
            consists of a group of engineers from IIT (BHU) Varanasi, having
            industrial experience in Finance, Marketing, Business Development,
            Administration and Research & Development. Professors and Mentors
            from IIT (BHU) Varanasi are technical advisors to our company and
            guide us to deliver quality and technology driven products
            pertaining to Global Industrial Standards.
          </p>
        </div>
        <div data-aos="fade-left" className={styles.right}>
          <img src={ourTeam} alt="ourTeam" />
        </div>
      </div>

      {/* categories */}
      <div data-aos="fade-up" className={styles.btns}>
        <button
          onClick={() => setCategory("leaders")}
          className={`${styles.btn} ${
            category === "leaders" ? styles.filledBtn : ""
          }`}
        >
          Leaders
        </button>
        <button
          onClick={() => setCategory("members")}
          className={`${styles.btn} ${
            category === "members" ? styles.filledBtn : ""
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setCategory("advisors")}
          className={`${styles.btn} ${
            category === "advisors" ? styles.filledBtn : ""
          }`}
        >
          Advisors
        </button>
      </div>

      {/* team */}
      <div data-aos="fade-up" className={styles.teamContainer}>
        {team?.map((item, index) => (
          <div className={styles.singleContainer} key={index}>
            <div className={styles.imgContainer}>
              <img src={item.img} alt="team" />
            </div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.position}>{item.position}</p>
            <a href={item.contactInfo} className={styles.contactInfo}>
              Contact Info
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
