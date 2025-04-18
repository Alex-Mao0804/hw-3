import Text from "@/components/Text";
import styles from "./Card.module.scss";
import clsx from "clsx";

type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <article
      className={clsx(styles.card, className)}
      onClick={onClick}
      role="button"
    >
      <img className={styles.card__image} src={image} alt="Card preview" />
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          {captionSlot && (
            <Text weight="medium" view="p-14" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text
            className={styles.card__title}
            maxLines={2}
            weight="medium"
            view="p-20"
          >
            {title}
          </Text>
          <Text
            className={styles.card__subtitle}
            maxLines={3}
            weight="normal"
            view="p-16"
            color="secondary"
          >
            {subtitle}
          </Text>
        </div>
        <div className={styles.card__footer}>
          {contentSlot && (
            <Text tag="p" weight="bold" view="p-18">
              {contentSlot}
            </Text>
          )}
          {actionSlot && (
            <Text tag="div" className={styles.card__footer__action}>
              {actionSlot}
            </Text>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
