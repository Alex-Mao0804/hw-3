import styles from "./CartPage.module.scss";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import CartDetails from "./components/CartDetails";
import CartList from "./components/CartList";
import rootStore from "@/stores/RootStore/RootStore";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routes";
import ButtonBack from "@/components/ButtonBack";
const CartPage = () => {
  const cartStore = rootStore.cart;
  const navigate = useNavigate();
  return (
    <div className={styles.cart_page}>
      <div className={styles.cart_page__header}>
        <ButtonBack />
        <Text
          className={styles.cart_page__header__title}
          view="title"
          weight="bold"
        >
          Cart
        </Text>
      </div>
      <div className={styles.cart_page__content}>
        {cartStore.products.length === 0 ? (
          <div className={styles.cart_page__empty}>
            <Text view="title" weight="bold">
              Cart is empty
            </Text>
            <Button
              className={styles.cart_page__empty__button}
              onClick={() => navigate(ROUTES.CATALOG)}
            >
              Go to catalog
            </Button>
          </div>
        ) : (
          <CartList
            products={cartStore.products}
            handleGetProductQuantity={cartStore.getProductQuantity}
            handleSetProductQuantity={cartStore.setProductQuantity}
            handleRemoveProduct={cartStore.removeProduct}
          />
        )}
        <CartDetails />
      </div>
    </div>
  );
};

export default observer(CartPage);
