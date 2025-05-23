import LogoIcon from "@components/icons/LogoIcon";
import NameIcon from "@components/icons/NameIcon";
import styles from "./HeaderLogoIcon.module.scss";

const HeaderLogoIcon = () => {
  return (
    <div className={styles.header__logo}>
      <LogoIcon width={42} height={42} />
      <NameIcon className={styles.header__logo__name} width={77} height={20} />
    </div>
  );
};

export default HeaderLogoIcon;
