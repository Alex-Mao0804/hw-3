import styles from "./PreviewSwiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import {Mousewheel } from "swiper/modules"; 
import { ProductEntity } from "@/App/utils/types";

interface IPreviewSwiper {
  productData: ProductEntity;
}

const PreviewSwiper: React.FC<IPreviewSwiper> = ({ productData }) => {
  return (
    <div className={styles.swiper}>
      <Swiper
        className={styles.swiper__main}
        modules={[Mousewheel]}
        mousewheel={{ forceToAxis: true }} 
        touchStartPreventDefault={false}
        simulateTouch={true} 
      >
        {productData.images.map((image, idx) => (
          <SwiperSlide key={idx} className={styles.swiper__slide}>
            <img
              className={styles.swiper__slide__img}
              src={image}
              alt={productData.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PreviewSwiper;
