import styles from "./CatalogPriceRange.module.scss";
import Button from "@components/Button";
import Input from "@components/Input";
import { runInAction } from "mobx";
import filterStore from "@stores/FilterStore";
import { observer } from "mobx-react-lite";
import useSetFilters from "@hooks/useSetFilterURL";

const CatalogPriceRange: React.FC = () => {
  const updateFilters = useSetFilters();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runInAction(() => {
      updateFilters({
        priceRange: {
          min: String(filterStore.filtersState.price_min),
          max: String(filterStore.filtersState.price_max),
        },
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.price_range}>
      <Input
        min={0}
        type="number"
        value={Number(filterStore.filtersState.price_min)}
        onChange={(e) => filterStore.setPriceRange_min(e)}
        placeholder="price from"
      />
      <Input
        min={0}
        type="number"
        value={Number(filterStore.filtersState.price_max)}
        onChange={(e) => filterStore.setPriceRange_max(e)}
        placeholder="price to"
      />
      <Button
        className={styles.price_range__button}
        disabled={
          filterStore.filtersState.price_max === 0 &&
          filterStore.filtersState.price_min === 0
        }
      >
        Filter by price
      </Button>
    </form>
  );
};

export default observer(CatalogPriceRange);
