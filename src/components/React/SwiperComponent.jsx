import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import styles from "./SwiperComponent.module.scss";

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectCoverflow]}
      effect="coverflow"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      navigation
      pagination={{
        dynamicBullets: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1.27,
          spaceBetween: 10,
        },
      }}
      speed={1000}
      loop={true}
      centeredSlides={true}
      className={styles.swiper}
    >
      <SwiperSlide className={styles.swiper}>
        <div className={styles.card}>
          <img
            src="Swiper/Plant.svg"
            alt="Plante"
            className={styles["therapeutic-icon"]}
          />
          <div>
            <h2>Naturopathie</h2>
            <h2>Nutritionniste / Micronutritionniste</h2>
          </div>
          <div>
            <p>
              Pour améliorer vos habitudes et hygiène de vie, et donner au corps
              et aux émonctoires leurs pleins potentiels de fonctionnement.
            </p>
            <p>
              Pour améliorer et comprendre les symptômes, les maux, que le corps
              nous signale.
            </p>
          </div>
          <p>Durée de la séance : 1h à 1h15.</p>
          <span className={styles["price"]}>65 €</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.card}>
          <img
            src="Swiper/Feet.svg"
            alt="Feet"
            className={styles["therapeutic-icon"]}
          />
          <div>
            <h2>Réflexologie plantaire</h2>
            <h2>Energétique chinoise</h2>
          </div>
          <div>
            <p>
              Redonner au corps et aux organes leur plein potentiel en agissant
              sur les zones réflexes du pied.
            </p>
            <p>
              Lever les blocages énergétiques, relancer et restaurer la
              circulation dans les méridiens.
            </p>
          </div>
          <p>Durée de la séance : 45 minutes.</p>
          <span className={styles["price"]}>50 €</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.card}>
          <img
            src="Swiper/Brain.svg"
            alt="Brain"
            className={styles["therapeutic-icon"]}
          />
          <div>
            <h2>Psychopraticienne</h2>
          </div>
          <div>
            <p>
              Être entendu dans sa sensibilité et ses ressentis, au-delà des
              mots et des faits.
            </p>
            <p>
              Être entendu et accompagné sans jugement remet du sens et de la
              clarté sur nos questionnements, en soi et dans les épreuves que
              l'on traverse.
            </p>
            <p>Chaleureuse rencontre avec soi-même.</p>
          </div>
          <p>Durée de la séance : 1h à 1h30.</p>
          <span className={styles["price"]}>65 €</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.card}>
          <img
            src="Swiper/Yin.svg"
            alt="Yin Yoga"
            className={styles["therapeutic-icon"]}
          />
          <div>
            <h2>Yin Yoga</h2>
          </div>
          <div>
            <p>
              Revenir à soi, dans des postures non engageantes, ne nécessitant
              ni force, ni équilibre ou souplesse particulière.
              {/* Le premier
              ennemi du mental est le mental lui-même : offrons-lui pause et
              silence. */}
            </p>
            <p>
              Cette pratique introspective permet de se poser dans le moment
              présent, de relâcher les tensions et de réduire le stress. Agir
              sur les méridiens et les fascias favorise la santé des organes
              internes, améliore la digestion, le sommeil, soulage les douleurs
              et ramène de la clarté et de l'apaisement à l'esprit.
            </p>
          </div>
          <p>Cours collectif d'une heure.</p>
          <span className={styles["price"]}>13 €</span>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.card}>
          <img
            src="Swiper/Chair.svg"
            alt="Massage assis"
            className={styles["therapeutic-icon"]}
          />
          <div>
            <h2>Massage Amma</h2>
          </div>
          <div>
            <p>"Apaiser avec les mains."</p>
            <p>
              Technique manuelle de massage sur personne habillée et assise.
            </p>
            <p>
              Dos, bras et mains, nuque et crâne, et si vous le souhaitez,
              cuisses, jambes et pieds.
            </p>
            <p>
              Un massage qui travaille d'un point de vue musculaire et
              énergétique par de nombreuses pressions et acupressions.
            </p>
          </div>
          <p>Durée de la séance : 30 minutes.</p>
          <span className={styles["price"]}>30 €</span>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
