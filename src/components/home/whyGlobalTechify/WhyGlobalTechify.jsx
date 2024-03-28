import React from "react";
import styles from "./whyGlobalTechify.module.css";

import { whyGlobalTechifyArr } from "../../../data/home/whyGlobalTechify";

export default function WhyGlobalTechify() {
  return (
    <div className={styles.WhyGlobalTechify}>
      <h1 data-aos="fade-up" className={styles.heading}>
        Why Global Techify
      </h1>
      <div data-aos="zoom-out" className={styles.container}>
        {whyGlobalTechifyArr?.map((item, index) => (
          <div className={styles.singleContainer} key={index}>
            <h2 data-aos="zoom-out" className={styles.title}>
              {item.title}
            </h2>
            <div data-aos="zoom-out" className={styles.bottom}>
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
