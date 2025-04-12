import styles from "./Header.module.scss";
import HeaderLogo from "../icons/HeaderLogoIcon";
import HeaderTabs from "./components/HeaderTabs";
import HeaderActions from "./components/HeaderActions";
import { Link } from "react-router-dom";
import ROUTES from "@/utils/routes";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={ROUTES.CATALOG}>
          <HeaderLogo />
        </Link>
        <HeaderTabs />
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
