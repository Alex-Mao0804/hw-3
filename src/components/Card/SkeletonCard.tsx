import styles from "./Card.module.scss";
import clsx from "clsx";

export type SkeletonCardProps = {
  className?: string;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <article className={clsx(styles.card, className)} role="button">
      <div className={clsx(styles.card__image, styles.skeleton__image)} />
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          <span className={styles.skeleton__captionSlot}></span>

          <span className={styles.skeleton__title}></span>
          <div
            className={clsx(styles.card__subtitle, styles.skeleton__subtitle)}
          >
            <span className={styles.skeleton__subtitle__child}></span>
            <span className={styles.skeleton__subtitle__child}></span>
            <span className={styles.skeleton__subtitle__child}></span>
          </div>
        </div>
        <div className={styles.card__footer}>
          <span
            className={clsx(
              styles.card__footer__action,
              styles.skeleton__button,
            )}
          ></span>
        </div>
      </div>
    </article>
  );
};

export default SkeletonCard;
