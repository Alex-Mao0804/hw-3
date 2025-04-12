import { useState, useCallback } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Mousewheel } from "swiper/modules";
import clsx from "clsx";
import styles from "./PreviewSwiper.module.scss";
import ArrowSideIcon from "../icons/ArrowSideIcon";
import { ProductEntity } from "@/utils/types";
import { observer } from "mobx-react-lite";

interface IPreviewSwiper {
  productData: ProductEntity;
}

const PreviewSwiper: React.FC<IPreviewSwiper> = ({ productData }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSwiper = useCallback((swiper: SwiperCore) => {
    setSwiperInstance(swiper);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  return (
    <div className={styles.swiper}>
      <Swiper
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
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
              loading="lazy"
            />
          </SwiperSlide>
        ))}
        <button
          disabled={activeIndex === productData.images.length - 1}
          onClick={handleNext}
          className={clsx(styles.button, styles.button__next)}
        >
          <ArrowSideIcon className={clsx(styles.button__arrow)} />
        </button>
        <button
          disabled={activeIndex === 0}
          onClick={handlePrev}
          className={clsx(styles.button, styles.button__prev)}
        >
          <ArrowSideIcon className={clsx(styles.button__arrow)} />
        </button>
      </Swiper>
    </div>
  );
};

const ObservedPreviewSwiper = observer(PreviewSwiper);
export default ObservedPreviewSwiper;
