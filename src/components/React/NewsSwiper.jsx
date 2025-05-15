import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/free-mode";
import "swiper/scss/navigation";
import "swiper/scss/thumbs";
import swiperStyles from "./NewsSwiper.module.scss";

const NewsSwiper = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const handleMainSwiper = (swiper) => {
    setMainSwiper(swiper);
  };

  useEffect(() => {
    if (mainSwiper) {
      const updateIndex = () => {
        setActiveThumbIndex(mainSwiper.activeIndex);
      };

      updateIndex();

      mainSwiper.on("activeIndexChange", updateIndex);

      return () => {
        mainSwiper.off("activeIndexChange", updateIndex);
      };
    }
  }, [mainSwiper]);

  return (
    <>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={swiperStyles.newsSwiperText}
        onSlideChange={(swiper) => setActiveThumbIndex(swiper.activeIndex)}
      >
        {["Planning", "Nouveautés", "Actualité", "Conférences"].map(
          (title, index) => (
            <SwiperSlide
              key={index}
              className={`${swiperStyles.swiperSlide} ${
                index === activeThumbIndex ? swiperStyles.activeThumb : ""
              }`}
            >
              <div className={swiperStyles.cardText}>
                <h4>{title}</h4>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <Swiper
        onSwiper={handleMainSwiper}
        loop={false}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={swiperStyles.newsSwiper}
      >
        <SwiperSlide className={swiperStyles.slideNews}>
          <div className={swiperStyles.containerImage}>
            <img src="Planning/YinYoga.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={swiperStyles.slideNews}>
          <div className={swiperStyles.containerImage}>
            <div className={swiperStyles.titleSlide}>Massage Amma</div>
            <img src="Planning/Chair.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={swiperStyles.slideNews}>
          <div className={swiperStyles.containerImage}>
            <div className={swiperStyles.titleSlide}>A venir...</div>
            <img src="Icon/Plant.svg" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={swiperStyles.slideNews}>
          <div className={swiperStyles.containerImage}>
            <div className={swiperStyles.titleSlide}>Passée</div>
            <img src="Planning/Conference.png" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default NewsSwiper;
