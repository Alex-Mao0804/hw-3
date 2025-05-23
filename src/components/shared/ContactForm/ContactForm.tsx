import CartMultiDropdown from "@pages/CartPage/components/CartMultiDropdown";
import rootStore from "@/stores/RootStore";
import { observer } from "mobx-react-lite";
import styles from "./ContactForm.module.scss";
import { Button, Input } from "@components";

type ContactFormProps = {
  handleSubmitOrder?: (e: React.FormEvent<HTMLFormElement>) => void;
};
const ContactForm = observer(({ handleSubmitOrder }: ContactFormProps) => {
  const cartStore = rootStore.cart;

  return (
    <form onSubmit={handleSubmitOrder} className={styles.contactForm}>
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
      <CartMultiDropdown addressStore={cartStore.addressStore} />

      {handleSubmitOrder && (
        <Button
          loading={cartStore.loading}
          disabled={!cartStore.checkFields() || cartStore.products.length === 0}
          type="submit"
        >
          Submit order
        </Button>
      )}
    </form>
  );
});

export default ContactForm;
