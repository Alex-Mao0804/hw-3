import styles from "./HeaderActions.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import UserIcon from "@/components/icons/UserIcon";
import CartIcon from "@/components/icons/CartIcon";
import ROUTES from "@routes";
import rootStore from "@/stores/RootStore/RootStore";
import { observer } from "mobx-react-lite";
const HeaderActions = () => {
  const count = rootStore.cart.totalProducts;
  const login = rootStore.user.user;
  const location = useLocation();
  const navigate = useNavigate();

  const isActive =
    location.pathname === ROUTES.AUTHN || location.pathname === ROUTES.USER;

  const handleClickUser = () => {
    if (login) {
      navigate(ROUTES.USER);
    } else {
      navigate(ROUTES.AUTHN, {
        state: {
          background: location.pathname !== ROUTES.AUTHN && location,
        },
      });
    }
  };

  return (
    <div className={styles.header__actions}>
      <NavLink to={ROUTES.CART} className={styles.header__actions__cart}>
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
      <a onClick={handleClickUser} className={styles.header__actions__user}>
        <UserIcon color={isActive ? "accent" : "primary"} />
      </a>
    </div>
  );
};

export default observer(HeaderActions);
