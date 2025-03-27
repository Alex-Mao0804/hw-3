import React from "react";
import styles from "./Header.module.scss";
import HeaderLogo from "./components/HeaderLogo";
import HeaderTabs from "./components/HeaderTabs";
import HeaderActions from "./components/HeaderActions";
import { Link } from "react-router-dom";
import ROUTES from "@routes";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to={ROUTES.HOME}>
          <HeaderLogo />
        </Link>
        <HeaderTabs />
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
