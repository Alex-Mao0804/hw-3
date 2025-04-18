import styles from "./HeaderActions.module.scss";
import { Link } from "react-router-dom";
import UserIcon from "@/components/icons/UserIcon";
import CartIcon from "@/components/icons/CartIcon";

const HeaderActions = () => {
  return (
    <div className={styles.header__actions}>
      <Link to={"ROUTES.CART"}>
        <CartIcon />
      </Link>
      <Link to={"ROUTES.USER"}>
        <UserIcon />
      </Link>
    </div>
  );
};

export default HeaderActions;
