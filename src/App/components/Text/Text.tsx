import * as React from "react";
import styles from "./Text.module.scss";
import clsx from "clsx";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: "title" | "button" | "p-20" | "p-18" | "p-16" | "p-14";
  /** Html-тег */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Начертание шрифта */
  weight?: "normal" | "medium" | "bold";
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: "primary" | "secondary" | "accent";
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag: Tag = "p",
  weight,
  children,
  color,
  maxLines,
}) => {
  return (
    <Tag
      className={clsx(
        styles.text,
        view && styles[view],
        weight && styles[weight],
        color && styles[color],
        className,
      )}
      style={
        maxLines
          ? {
              WebkitLineClamp: maxLines,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
};

export default Text;
