import { observer } from "mobx-react-lite";
import styles from "./UserHistory.module.scss";
import HistoryOrderStore from "@/stores/HistoryOrderStore";
import { useLocalStore } from "@/utils/useLocalStore";
import ItemOrder from "@pages/UserPage/components/ItemOrder";
import Text from "@/components/Text";
import Loader from "@/components/Loader";
import SkeletonItemOrder from "@pages/UserPage/components/ItemOrder/SkeletonItemOrder";
import EmptyList from "@/components/EmptyList";

const UserHistory = observer(() => {
  const historyOrderStore = useLocalStore(() => new HistoryOrderStore());

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
              <EmptyList text="No orders yet" />
            )}
            {historyOrderStore.orders.map((order) => (
              <ItemOrder key={order.id} order={order} />
            ))}
          </>
        )}
      </div>
    </div>
  );
});

export default UserHistory;
