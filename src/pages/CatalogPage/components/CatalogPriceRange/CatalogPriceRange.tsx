import styles from "./CatalogPriceRange.module.scss";
import { observer } from "mobx-react-lite";
import ProductStore from "@/stores/ProductStore/ProductStore";
import { useCallback, useEffect } from "react";
import { Text, Input, Button } from "@components";

type TPriceRange = {
  productStore: ProductStore;
};

const CatalogPriceRange: React.FC<TPriceRange> = observer(
  ({ productStore }) => {
    const { filters } = productStore;
    const price_min = filters.fieldPriceRangeMin;
    const price_max = filters.fieldPriceRangeMax;
    const price_min_query = Number(filters.filtersState.price_min) || 0;
    const price_max_query = Number(filters.filtersState.price_max) || 0;

    useEffect(() => {
      console.log(price_min_query, price_max_query);
    }, [price_min_query, price_max_query]);
    const handleSubmit = useCallback(
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasQueryValue = price_min_query || price_max_query;
        const isChanged =
          price_min !== price_min_query || price_max !== price_max_query;

        if (!hasQueryValue || isChanged) {
          filters.updateAndSync({
            price_min,
            price_max,
            page: 1,
          });
        } else {
          filters.setPriceRangeMin(0);
          filters.setPriceRangeMax(0);
          filters.updateAndSync({
            price_min: 0,
            price_max: 0,
            page: 1,
          });
        }
      },
      [filters, price_min, price_max, price_min_query, price_max_query],
    );

    const isDisabled =
      !price_min ||
      !price_max ||
      price_max === 0 ||
      price_min === 0 ||
      price_max < price_min;

    const showFilterButton =
      !(price_min_query || price_max_query) ||
      price_min !== price_min_query ||
      price_max !== price_max_query;

    return (
      <form onSubmit={handleSubmit} className={styles.price_range}>
        <Input
          className={styles.price_range__input}
          min={0}
          type="number"
          value={price_min || 0}
          onChange={(e) => {
            filters.setPriceRangeMin(Number(e));
          }}
          placeholder="price from"
          afterSlot={
            <div>
              <Text view="p-14" color="secondary">
                price
              </Text>
              <Text view="p-14" color="secondary">
                min
              </Text>
            </div>
          }
        />
        <Input
          className={styles.price_range__input}
          min={0}
          type="number"
          value={price_max || 0}
          onChange={(e) => {
            filters.setPriceRangeMax(Number(e));
          }}
          placeholder="price to"
          afterSlot={
            <div>
              <Text view="p-14" color="secondary">
                price
              </Text>
              <Text view="p-14" color="secondary">
                max
              </Text>
            </div>
          }
        />
        <div className={styles.price_range__button__container}>
          <Button className={styles.price_range__button} disabled={isDisabled}>
            {showFilterButton ? "Filter by price" : "Reset"}
          </Button>
        </div>
      </form>
    );
  },
);

export default CatalogPriceRange;
