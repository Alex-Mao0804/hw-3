import styles from "./HeaderActions.module.scss";
import { Link, NavLink } from "react-router-dom";
import UserIcon from "@/components/icons/UserIcon";
import CartIcon from "@/components/icons/CartIcon";
import ROUTES from "@routes";
import rootStore from "@/stores/RootStore/RootStore";
import { observer } from "mobx-react-lite";
const HeaderActions = () => {
  const count = rootStore.cart.totalProducts;
  return (
    <div className={styles.header__actions}>
      <NavLink
        to={ROUTES.CART}
        className={styles.header__actions__cart}
      >
        {({ isActive }) => (
          <>
            <div className={styles.header__actions__cart__count}>
              <span>{count}</span>
            </div>

            <CartIcon
              width={30}
              height={30}
              color={isActive ? "accent" : "primary"}
            />
          </>
        )}
      </NavLink>
      <Link to={ROUTES.USER}>
        <UserIcon />
      </Link>
    </div>
  );
};

export default observer(HeaderActions);
