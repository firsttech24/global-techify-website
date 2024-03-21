import React from "react";
import styles from "./slider.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { sliderArr } from "../../../data/home/slider";

export default function Slider() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}
      className={styles.swiper}
    >
      {sliderArr?.map((item, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <div className={styles.leftContainer}>
            <p className={styles.title}>
              {item.title}{" "}
              <span className={styles.span}>{item.highlightedText}</span>
            </p>
          </div>
          <div className={styles.imgContainer}>
            <img src={item.img} alt="image" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
