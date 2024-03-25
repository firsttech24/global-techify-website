import React, { useRef } from "react";
import styles from "./slider.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// import "swiper/css/navigation";
import { sliderArr } from "../../../data/home/slider";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

export default function Slider() {
  const swiperRef = useRef("");

  const slideNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const slidePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };
  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={50}
      slidesPerView={1}
      modules={[Navigation, Autoplay]}
      navigation
      loop={true}
      autoplay={{ delay: 3000 }}
      onSlideChange={() => console.log("chaning")}
      onSwiper={swiper => console.log(swiper)}
      className={styles.swiper}
    >
      {sliderArr?.map((item, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <div className={styles.leftContainer}>
            <p className={styles.title}>
              {item.title}
              <br />
              <span className={styles.span}>{item.highlightedText}</span>
            </p>
          </div>
          <div className={styles.imgContainer}>
            <img src={item.img} alt="image" />
          </div>
          <button onClick={slidePrev} className={styles.btnOne}>
            <TbPlayerTrackPrevFilled />
          </button>
          <button onClick={slideNext} className={styles.btnTwo}>
            <TbPlayerTrackNextFilled />
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
