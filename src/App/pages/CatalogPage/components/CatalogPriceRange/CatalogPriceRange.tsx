import styles from "./CatalogPriceRange.module.scss";
import Button from "@components/Button";
import Input from "@components/Input";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import ProductStore from "@/App/stores/ProductStore/ProductStore";

type TPriceRange = {
  productStore: ProductStore;
}

const CatalogPriceRange: React.FC<TPriceRange> = ({ productStore }) => {
  
  const { filters } = productStore;  // Деструктуризация для удобства
  const { price_min, price_max } = filters.filtersState;

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
      filters.setPriceRange_min(0);
      filters.setPriceRange_max(0);
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
        value={price_min || 0}  // Для предотвращения undefined
        onChange={(e) => {
          runInAction(() => {
            filters.setPriceRange_min(Number(e));
          });
        }}
        placeholder="price from"
      />
      <Input
        min={0}
        type="number"
        value={price_max || 0}  // Для предотвращения undefined
        onChange={(e) => {
          runInAction(() => {
            filters.setPriceRange_max(Number(e));
          });
        }}
        placeholder="price to"
      />
      <Button
        className={styles.price_range__button}
        disabled={ !price_max || !price_min ||
          price_max === 0 || price_min === 0 || 
          price_max < price_min
        }
      >
        Filter by price
      </Button>

      <Button
        onClick={handleReset}  // Сброс фильтров
        className={styles.price_range__button}
      >
        Reset
      </Button>
    </form>
  );
};

export default observer(CatalogPriceRange);
