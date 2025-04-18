import styles from "./CatalogPriceRange.module.scss";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { observer } from "mobx-react-lite";
import ProductStore from "@/stores/ProductStore/ProductStore";
import { useCallback } from "react";

type TPriceRange = {
  productStore: ProductStore;
};

const CatalogPriceRange: React.FC<TPriceRange> = observer(
  ({ productStore }) => {
    const { filters } = productStore;
    const price_min = filters.fieldPriceRangeMin;
    const price_max = filters.fieldPriceRangeMax;

    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        filters.updateAndSync({
          price_min,
          price_max,
          page: 1,
        });
      },
      [filters, price_min, price_max],
    );

    const isDisabled =
      !price_min ||
      !price_max ||
      price_max === 0 ||
      price_min === 0 ||
      price_max < price_min;
    const handleReset = useCallback(() => {
      filters.setPriceRangeMin(0);
      filters.setPriceRangeMax(0);
      filters.updateAndSync({
        price_min: 0,
        price_max: 0,
        page: 1,
      });
    }, [filters]);

    return (
      <form onSubmit={handleSubmit} className={styles.price_range}>
        <Input
          min={0}
          type="number"
          value={price_min || 0}
          onChange={(e) => {
            filters.setPriceRangeMin(Number(e));
          }}
          placeholder="price from"
        />
        <Input
          min={0}
          type="number"
          value={price_max || 0}
          onChange={(e) => {
            filters.setPriceRangeMax(Number(e));
          }}
          placeholder="price to"
        />
        <Button className={styles.price_range__button} disabled={isDisabled}>
          Filter by price
        </Button>

        <Button
          type="button"
          onClick={handleReset}
          className={styles.price_range__button}
        >
          Reset
        </Button>
      </form>
    );
  },
);

export default CatalogPriceRange;
