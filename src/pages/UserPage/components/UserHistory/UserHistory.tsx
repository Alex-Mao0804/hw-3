import { observer } from "mobx-react-lite";
import styles from "./UserHistory.module.scss";
import HistoryOrderStore from "@/stores/HistoryOrderStore";
import { useLocalStore } from "@/utils/useLocalStore";
import ItemOrder from "../ItemOrder";
import Text from "@/components/Text";
import Loader from "@/components/Loader";
import SkeletonItemOrder from "../ItemOrder/SkeletonItemOrder";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import ROUTES from "@/utils/routes";
const UserHistory = () => {
  const historyOrderStore = useLocalStore(() => new HistoryOrderStore());
  const navigate = useNavigate();
  
  const loading = historyOrderStore.isLoading;
  const total = historyOrderStore.orders.length;

  return (
    <div className={styles.user_history}>
      <div className={styles.user_history__title}>
        <Text
          tag="h2"
          className={styles.user_history__title__text}
          weight="bold"
        >
          Total orders
        </Text>
        <Text tag="span" view="p-20" weight="bold" color="accent">
          {loading ? <Loader size="s" /> : total}
        </Text>
      </div>
      <div className={styles.user_history__orders}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonItemOrder key={index} />
          ))
        ) : (
          <>
          {historyOrderStore.orders.length === 0 && (
            <div className={styles.user_history__empty}>
              <Text view="title" weight="bold">
                No orders
              </Text>
              <Button
              onClick={() => navigate(ROUTES.CATALOG)}
            >
              Go to catalog
            </Button>
            </div>
          )}
            {historyOrderStore.orders.map((order) => (
              <div key={order.id}>
                <ItemOrder order={order} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default observer(UserHistory);
