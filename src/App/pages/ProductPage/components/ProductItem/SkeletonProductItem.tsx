import React from "react";
import styles from "./ProductItem.module.scss";

const SkeletonProductItem: React.FC = () => {
  return (
    <div className={styles.product_item}>
      <span className={styles.skeleton__image}></span>
      <div className={styles.product_item__info}>
        <div className={styles.product_item__info__top}>
          <span className={styles.skeleton__title}></span>
          <span className={styles.skeleton__description}></span>
        </div>
        <div className={styles.product_item__info__bottom}>
          <span className={styles.skeleton__price}></span>

          <div className={styles.product_item__actions}>
            <span className={styles.skeleton__button}></span>
            <span className={styles.skeleton__button}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductItem;
