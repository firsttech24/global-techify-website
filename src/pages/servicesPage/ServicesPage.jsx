import React from "react";
import styles from "./servicesPage.module.css";
import careerAdvice from "./../../assets/services/careerAdvice.png";
import interviewPrep from "./../../assets/services/interviewPrep.png";
import mentorship from "./../../assets/services/mentorship.png";
import skillDevelop from "./../../assets/services/skillDevelop.png";
import techNews from "./../../assets/services/techNews.png";
import hackathon from "./../../assets/services/hackathon.png";
import groupDiscuss from "./../../assets/services/groupDiscuss.png";

export default function ServicesPage() {
  const servicesArr = [
    {
      title: "Career Advice",
      img: careerAdvice,
      des: "Our experts provide career advice to students who want to pursue a career in the tech industry. Get guidance on job search, interviews, and more.",
    },
    {
      title: "Interview Prep",
      img: interviewPrep,
      des: "Develop and provide comprehensive interview preparation modules covering various industries and job positions. Include mock interview sessions and feedback to enhance practical skills and confidence.",
    },
    {
      title: "Mentorship",
      img: mentorship,
      des: "Our mentorship program provides students with the opportunity to connect with experts in various fields of technology. Students can gain valuable insights and knowledge from these industry professionals.",
    },
    {
      title: "Skill Development",
      img: skillDevelop,
      des: "Offering tailored programs and resources to enhance individuals' skills, ensuring they stay competitive in the ever-evolving job market",
    },
    {
      title: "Tech News",
      img: techNews,
      des: "Our website provides the latest news and updates on technology trends, innovations and companies. Stay informed and ahead of the curve with Global Techify.",
    },
    {
      title: "Hackathon Support",
      img: hackathon,
      des: "Offer specialized resources and training for hackathon participants, aiding them in developing problem-solving skills and innovative thinking.",
    },
    /* {
      title: "Group Discussion",
      img: groupDiscuss,
      des: "Facilitating interactive and collaborative discussions among individuals to share ideas, perspectives, and knowledge on career-related topics, fostering learning and networking opportunities.",
    }, */
  ];
  return (
    <div className={styles.ServicesPage}>
      <h1 data-aos="fade-up">Services</h1>
      <div data-aos="zoom-out" className={styles.container}>
        {servicesArr?.map((item, index) => (
          <div className={styles.singleContainer}>
            <div className={styles.top}>
              <div data-aos="zoom-out" className={styles.imgContainer}>
                <img src={item.img} alt="icons" />
              </div>
              <p data-aos="zoom-out" className="normalText">
                {item.title}
              </p>
            </div>
            <div data-aos="zoom-out" className={styles.down}>
              {item.des}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
