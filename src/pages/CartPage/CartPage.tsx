import styles from "./CartPage.module.scss";
import { observer } from "mobx-react-lite";
import CartDetails from "./components/CartDetails";
import CartList from "./components/CartList";
import rootStore from "@/stores/RootStore/RootStore";
import HeaderWithArrow from "@/components/HeaderWithArrow";
import EmptyList from "@/components/EmptyList";
const CartPage = observer(() => {
  const cartStore = rootStore.cart;
  return (
    <div className={styles.cart_page}>
      <HeaderWithArrow title="Cart" />

      <div className={styles.cart_page__content}>
        {cartStore.products.length === 0 ? (
          <EmptyList text="Cart is empty" />
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
});

export default CartPage;
