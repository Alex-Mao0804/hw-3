import LogoIcon from "@/components/icons/LogoIcon";
import styles from "./CartDetails.module.scss";
import Text from "@components/Text";

import { observer } from "mobx-react-lite";
import rootStore from "@/stores/RootStore";

import Modal from "@/components/Modal";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import RatingChoice from "@/components/RatingChoice";

const CartDetails = () => {
  const cartStore = rootStore.cart;
  const { totalPrice: total, totalProducts: count } = cartStore;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await cartStore.submitOrder(); 
    setIsModalOpen(true); 
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <ContactForm handleSubmitOrder={handleSubmitOrder} />
        </div>
      </div>
      <Modal
        className={styles.modal}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        >
          <>
          <div className={styles.modal__content}>
            <Text view="title" weight="bold">
              Благодарим за заказ, {cartStore.contactName}
            </Text>
            <ul className={styles.modal__list}>
              {cartStore.products.map((product) => (
                <li key={product.id}>
                  <Text view="p-20">
                    {product.quantity} x {product.title}
                  </Text>
                </li>
              ))}
            </ul>
            <Text view="p-20">
              Наши менеджеры свяжутся с вами в ближайшее время по электронной
              почте {cartStore.contactEmail}
            </Text>
          </div>
          <RatingChoice />
          </>
        
        </Modal>
    </div>
  );
};

export default observer(CartDetails);
