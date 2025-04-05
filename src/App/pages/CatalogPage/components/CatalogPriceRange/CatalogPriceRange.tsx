import styles from "./CatalogPriceRange.module.scss";
import Button from "@components/Button";
import Input from "@components/Input";
import { runInAction } from "mobx";
import filterStore from "@stores/FilterStore";
import { observer } from "mobx-react-lite";
import useSetFilters from "@hooks/useSetFilterURL";
import ProductStore from "@/App/stores/ProductStore/ProductStore";

type TPriceRange = {
  productStore: ProductStore;
}

const CatalogPriceRange: React.FC<TPriceRange> = ({ productStore }) => {
  
  const updateFilters = useSetFilters(productStore.filters.filtersState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runInAction(() => {
      updateFilters({
        price_min: productStore.filters.filtersState.price_min,
        price_max: productStore.filters.filtersState.price_max,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.price_range}>
      <Input
        min={0}
        type="number"
        value={Number(productStore.filters.filtersState.price_min)}
        onChange={(e) => {
          runInAction(() => {
            productStore.filters.setPriceRange_min(Number(e));
          });
        }}
        placeholder="price from"
      />
      <Input
        min={0}
        type="number"
        value={Number(productStore.filters.filtersState.price_max)}
        onChange={(e) => {
          runInAction(() => {
            productStore.filters.setPriceRange_max(Number(e));
          });
        }}
        placeholder="price to"
      />
      <Button
        className={styles.price_range__button}
        disabled={
          productStore.filters.filtersState.price_max === 0 ||
          productStore.filters.filtersState.price_min === 0 ||
          Number(productStore.filters.filtersState.price_max) <
            Number(productStore.filters.filtersState.price_min)
        }
      >
        Filter by price
      </Button>

      <Button
        onClick={() => {
          runInAction(() => {
            productStore.filters.filtersState.price_max = null;
            productStore.filters.filtersState.price_min = null;
            updateFilters({
              price_min: null,
              price_max: null,
            });
          });
        }}
        className={styles.price_range__button}
      >
        Reset
      </Button>
    </form>
  );
};

export default observer(CatalogPriceRange);
