import React from "react";
import styles from "./SkeletonCard.module.scss";
import clsx from "clsx";

export type SkeletonCardProps = {
  className?: string;
};

const Card: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <article className={clsx(styles.card, className)} role="button">
      <div className={styles.card__image} />
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          <span className={styles.skeleton__captionSlot}></span>

          <span className={styles.skeleton__title}></span>

          <span className={styles.skeleton__subtitle}></span>
          <span className={styles.skeleton__subtitle}></span>
          <span className={styles.skeleton__subtitle}></span>
        </div>
        <div className={styles.card__footer}>
          <span className={styles.card__footer__action}></span>
        </div>
      </div>
    </article>
  );
};

export default Card;
