import styles from "./Header.module.scss";
import HeaderLogo from "../icons/HeaderLogoIcon";
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
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
