
import ButtonBack from "@/components/ButtonBack";
import styles from "./HeaderWithArrow.module.scss";
import Text from "@/components/Text";
import clsx from "clsx";

type HeaderProps = {
title: string
className?: string
};

const HeaderWithArrow = ({ title, className }: HeaderProps) => {
  return (
    <div className={clsx(styles.header, className)}>
    <ButtonBack />
    <Text
      className={styles.header__title}
      view="title"
      weight="bold"
    >
      
      {title}
    </Text>
  </div>
  );
};

export default HeaderWithArrow;
