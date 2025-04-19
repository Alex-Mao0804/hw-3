import { NavLink } from "react-router-dom";
import clsx from "@libs/clsx";

import styles from "./HeaderTabs.module.scss";
import Text from "@/components/Text";
import ROUTES from "@/utils/routes";

const HeaderTabs = () => {
  return (
    <nav className={styles.header__tabs}>
      <ul className={styles.header__tabs__list}>
        <li className={styles.header__tabs__list__item}>
          <NavLink
            to={ROUTES.CATALOG}
            className={({ isActive }) =>
              clsx(
                styles.header__tabs__list__item__navLink,
                isActive && styles.active,
              )
            }
          >
            {({ isActive }) => (
              <Text
                view="p-18"
                weight={isActive ? "bold" : "normal"}
                color={isActive ? "accent" : "primary"}
              >
                Products
              </Text>
            )}
          </NavLink>
        </li>
        <li className={styles.header__tabs__list__item}>
          <NavLink
            to={"ROUTES.CATEGORIES"}
            className={({ isActive }) =>
              clsx(
                styles.header__tabs__list__item__navLink,
                isActive && styles.active,
              )
            }
          >
            {({ isActive }) => (
              <Text
                view="p-18"
                weight={isActive ? "bold" : "normal"}
                color={isActive ? "accent" : "primary"}
              >
                Categories
              </Text>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderTabs;
