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
      filterStore.setPriceRangeFilters();
      updateFilters({
        priceRange: filterStore.priceRange,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.price_range}>
      <Input
        type="number"
        value={filterStore.priceRange.min}
        onChange={(e) => filterStore.setPriceRange(e, undefined)}
        placeholder="price from"
      />
      <Input
        type="number"
        value={filterStore.priceRange.max}
        onChange={(e) => filterStore.setPriceRange(undefined, e)}
        placeholder="price to"
      />
      <Button
        className={styles.price_range__button}
        disabled={
          filterStore.priceRange.min.length === 0 ||
          filterStore.priceRange.max.length === 0
        }
      >
        Filter by price
      </Button>
    </form>
  );
};

export default observer(CatalogPriceRange);
