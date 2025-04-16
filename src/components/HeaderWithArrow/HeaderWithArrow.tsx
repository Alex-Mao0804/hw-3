
import ButtonBack from "@/components/ButtonBack";
import styles from "./HeaderWithArrow.module.scss";
import Text from "@/components/Text";

type HeaderProps = {
title: string
};

const HeaderWithArrow = ({ title }: HeaderProps) => {
  return (
    <div className={styles.header}>
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
