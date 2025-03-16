import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/free-mode";
import "swiper/scss/navigation";
import "swiper/scss/thumbs";
import swiperStyles from "./NewsSwiper.module.scss";

export default () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={5}
        slidesPerView={3}
        freeMode={false}
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
        <SwiperSlide className={swiperStyles.slideNews}>
          <img src="src/assets/images/Planning/YinYoga.jpg" />
        </SwiperSlide>
        <SwiperSlide className={swiperStyles.slideNews}>
          <img src="src/assets/images/Planning/YinYoga.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
