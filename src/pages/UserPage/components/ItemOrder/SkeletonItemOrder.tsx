import styles from "./ItemOrder.module.scss";
import ReplayIcon from "@mui/icons-material/Replay";

const SkeletonItemOrder = () => {
  return (
    <div className={styles.item_order}>
      <div className={styles.item_order__section}>
        <span className={styles.skeleton__datetime}></span>
        <button type="button" className={styles.item_order__repeatOrder}>
          <ReplayIcon />
        </button>
      </div>
      <ul className={styles.item_order__products}>
        <li>
          <article role="button" className={styles.item_order__product}>
            <span className={styles.skeleton__items}></span>

            <span className={styles.skeleton__price}></span>
          </article>
        </li>
      </ul>

      <div className={styles.item_order__section}>
        <span className={styles.skeleton__address}></span>

        <span className={styles.skeleton__total}></span>
      </div>
    </div>
  );
};

export default SkeletonItemOrder;
