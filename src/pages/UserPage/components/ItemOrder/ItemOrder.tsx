import { TOrderByEmailResponse } from "@/api/type/directionSendOrder/list";
import styles from "./ItemOrder.module.scss";
import Text from "@/components/Text";
import { observer } from "mobx-react-lite";
import ROUTES from "@/utils/routes";
import { useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import rootStore from "@/stores/RootStore/RootStore";
import { runInAction } from "mobx";

type ItemOrderProps = {
  order: TOrderByEmailResponse;
};

const ItemOrder = observer(({ order }: ItemOrderProps) => {
  const navigate = useNavigate();
  const isoString = order.datetime;
  const date = new Date(isoString);
  const orderItems = order.items;
  const { addProductsWithQuantities } = rootStore.cart;

  const handleProductClick = (productId: string) => {
    navigate(ROUTES.PRODUCT(productId));
  };

  const handleOrderClick = () => {
    addProductsWithQuantities(orderItems);
  };

  const total = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <div className={styles.item_order}>
      <div className={styles.item_order__section}>
        <Text view="p-16" weight="bold" color="secondary">
          {date.toLocaleString()}
        </Text>
        <button
          type="button"
          onClick={handleOrderClick}
          className={styles.item_order__repeatOrder}
        >
          <ReplayIcon />
        </button>
      </div>
      <ul className={styles.item_order__products}>
        {order.items.map((item, index) => (
          <li key={index}>
            <article
              onClick={() =>
                runInAction(() => handleProductClick(String(item.id)))
              }
              role="button"
              className={styles.item_order__product}
            >
              <Text view="p-16">
                {item.quantity} x {item.title} x ${item.price}
              </Text>
              <Text view="p-16">${item.price * item.quantity}</Text>
            </article>
          </li>
        ))}
      </ul>

      <div className={styles.item_order__section}>
        <Text color="secondary" view="p-16">
          {order.address}
        </Text>
        <Text view="p-16" weight="bold" color="secondary">
          Total: ${total}
        </Text>
      </div>
    </div>
  );
});

export default ItemOrder;
