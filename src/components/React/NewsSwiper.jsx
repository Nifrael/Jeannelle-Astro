import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import swiperStyles from "./NewsSwiper.module.scss";

export default () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={15}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={swiperStyles.newsSwiperText}
      >
        <SwiperSlide>
          <div className={swiperStyles.cardText}>
            <h4>Actualité</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={swiperStyles.cardText}>
            <h4>Planning</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={swiperStyles.cardText}>
            <h4>Conférences</h4>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={swiperStyles.newsSwiper}
      >
        <SwiperSlide className={swiperStyles.slideNews}>
          <img src="src/assets/images/Planning/YinYoga.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/images/Planning/YinYoga.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/images/Planning/YinYoga.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
