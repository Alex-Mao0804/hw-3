import styles from "./EmptyList.module.scss";
import Button from "@components/Button";
import Text from "@components/Text";
import { useNavigate } from "react-router-dom";
import ROUTES from "@utils/routes";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

type EmptyListProps = {
  text: string;
};

const EmptyList = ({ text }: EmptyListProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.emptyList}>
      <ShoppingBasketIcon
        color="secondary"
        className={styles.emptyList__icon}
      />
      <Text
        view="p-20"
        color="secondary"
        weight="bold"
        className={styles.emptyList__text}
      >
        {text}
      </Text>
      <Button
        className={styles.cart_page__empty__button}
        onClick={() => navigate(ROUTES.CATALOG)}
      >
        Go to catalog
      </Button>
    </div>
  );
};

export default EmptyList;
