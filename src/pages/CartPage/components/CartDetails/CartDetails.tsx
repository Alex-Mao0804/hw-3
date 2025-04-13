import LogoIcon from "@/components/icons/LogoIcon";
import styles from "./CartDetails.module.scss";
import Text from "@components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { observer } from "mobx-react-lite";
import rootStore from "@/stores/RootStore";
import MultiDropdown from "@/components/MultiDropdown";

const CartDetails = () => {
  const cartStore = rootStore.cart;
  const { totalPrice: total, totalProducts: count } = cartStore;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    cartStore.submitOrder();
  };
  return (
    <div className={styles.cart_details}>
      <div className={styles.cart_details__menu}>
        <div className={styles.cart_details__container}>
          <div className={styles.cart_details__wrapper}>
            <LogoIcon
              className={styles.cart_details__logo}
              viewBox="0 0 42 42"
              preserveAspectRatio="none"
            />
          </div>
          <Text view="p-20" weight="bold" tag="h2">
            Cart details
          </Text>
          <div className={styles.cart_details__total}>
            <Text view="p-20">Total:</Text>
            <span>$ {total}</span>
          </div>
          <div className={styles.cart_details__count}>
            <Text view="p-20">Count:</Text>
            <span>{count}</span>
          </div>
        </div>
        <div className={styles.cart_details__container}>
          <div className={styles.cart_details__wrapper}>
            <LogoIcon
              className={styles.cart_details__logo}
              viewBox="0 0 42 42"
              preserveAspectRatio="none"
            />
          </div>
          <Text view="p-20" weight="bold" tag="h2">
            Form order
          </Text>
          <form
            onSubmit={handleSubmitOrder}
            className={styles.cart_details__form}
          >
            <Input
              required
              type="text"
              value={String(cartStore.contactName)}
              onChange={(e) => {
                cartStore.setContactName(e);
              }}
              placeholder="Name"
            />
            <Input
              required
              type="email"
              value={String(cartStore.contactEmail)}
              onChange={(e) => {
                cartStore.setContactEmail(e);
              }}
              placeholder="Email"
            />
{/* 
<MultiDropdown
        className={styles.categoryFilter__dropdown}
        options={toJS(categoryStore.categoriesMultiDropdown)}
        value={toJS(categoryStore.categoryMultiDropdownValue)}
        onChange={handleMultiDropdownChange}
        isMulti={false}
        getTitle={categoryStore.getTitleMultiDropdown}
      /> */}

            <Button>Submit order</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(CartDetails);
