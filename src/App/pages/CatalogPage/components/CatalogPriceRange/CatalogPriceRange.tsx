import styles from "./CatalogPriceRange.module.scss";
import Button from "@components/Button";
import Input from "@components/Input";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import ProductStore from "@stores/ProductStore/ProductStore";

type TPriceRange = {
  productStore: ProductStore;
};

const CatalogPriceRange: React.FC<TPriceRange> = observer(
  ({ productStore }) => {
    const { filters } = productStore;
    const price_min = filters.fieldPriceRangeMin;
    const price_max = filters.fieldPriceRangeMax;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      runInAction(() => {
        filters.updateAndSync({
          price_min,
          price_max,
        });
      });
    };

    const handleReset = () => {
      runInAction(() => {
        filters.setPriceRangeMin(0);
        filters.setPriceRangeMax(0);
        filters.updateAndSync({
          price_min: 0,
          price_max: 0,
        });
      });
    };

    return (
      <form onSubmit={handleSubmit} className={styles.price_range}>
        <Input
          min={0}
          type="number"
          value={price_min || 0}
          onChange={(e) => {
            runInAction(() => {
              filters.setPriceRangeMin(Number(e));
            });
          }}
          placeholder="price from"
        />
        <Input
          min={0}
          type="number"
          value={price_max || 0}
          onChange={(e) => {
            runInAction(() => {
              filters.setPriceRangeMax(Number(e));
            });
          }}
          placeholder="price to"
        />
        <Button
          className={styles.price_range__button}
          disabled={
            !price_max ||
            !price_min ||
            price_max === 0 ||
            price_min === 0 ||
            price_max < price_min
          }
        >
          Filter by price
        </Button>

        <Button onClick={handleReset} className={styles.price_range__button}>
          Reset
        </Button>
      </form>
    );
  },
);

export default CatalogPriceRange;
