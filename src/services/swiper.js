import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export const swiper = new Swiper(".swiper", {
  speed: 1000,
  spaceBetween: 30,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1.3,
  breakpoints: {
    320: {
      slidesPerView: 1.27,
      spaceBetween: 10,
    },
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiperOne = document.querySelector(".swiper").swiper;
// Now you can use all slider methods like
swiperOne.slideNext();
