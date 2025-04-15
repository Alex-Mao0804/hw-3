import CartMultiDropdown from "@pages/CartPage/components/CartMultiDropdown";
import Input from "@/components/Input";
import Button from "@/components/Button";
import rootStore from "@/stores/RootStore";
import { observer } from "mobx-react-lite";
import styles from "./ContactForm.module.scss";

type ContactFormProps = {
  handleSubmitOrder?: (e: React.FormEvent<HTMLFormElement>) => void;
};
const ContactForm = ({ handleSubmitOrder }: ContactFormProps) => {
  const cartStore = rootStore.cart;
  const disableButton =
    !cartStore.totalProducts ||
    !cartStore.contactName.trim() ||
    !cartStore.contactEmail.trim();

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
          disabled={disableButton}
          type="submit"
        >
          Submit order
        </Button>
      )}
    </form>
  );
};

export default observer(ContactForm);
