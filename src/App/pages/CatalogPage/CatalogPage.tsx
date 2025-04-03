import { useCallback, useEffect } from "react";
import styles from "./CatalogPage.module.scss";
import Text from "@components/Text";
import Input from "@components/Input";
import Button from "@components/Button";
import MultiDropdown from "@components/MultiDropdown";
import CatalogProducts from "./components/CatalogProducts";
import Pagination from "@components/Pagination";
import productStore from "@stores/ProductStore";
import filterStore from "@stores/FilterStore";
import categoryStore from "@stores/CategoryStore";
import { observer } from "mobx-react-lite";
import { OptionMultiDropdown } from "@/App/utils/types";
import { runInAction, toJS } from "mobx";
import useSetFilters from "@hooks/useSetFilterURL";
import { getCategoryKey } from "@utils/getCategoryKey";
import useSyncFiltersWithURL from "@hooks/useSyncFiltersWithURL";
import CatalogPriceRange from "./components/CatalogPriceRange";

const CatalogPage = observer(() => {
  const updateFilters = useSetFilters();

  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);

  const { isFiltersReady } = useSyncFiltersWithURL(filterStore.filtersState);

  useEffect(() => {
    runInAction(() => {
      if (filterStore.applyFilters()) {
        productStore.fetchProducts(filterStore.filtersState);
      }
    });
  }, [isFiltersReady]);

  const getTitle = useCallback(
    (value: OptionMultiDropdown | OptionMultiDropdown[] | null) => {
      if (Array.isArray(value)) {
        return value.map((option) => option.value).join(", ");
      } else if (value) {
        return value.value;
      } else {
        return "Выберите категорию";
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      runInAction(() => {
        updateFilters({
          title: filterStore.searchQuery,
        });
        filterStore.setTitle();
      });
    },
    [],
  );

  const handleChangePage = useCallback((page: number) => {
    runInAction(() => {
      updateFilters({
        page: page,
      });
      filterStore.setPage(page);
    });
  }, []);

  const handleMultiDropdownChange = useCallback(
    (value: OptionMultiDropdown | OptionMultiDropdown[] | null) => {
      runInAction(() => {
        if (getCategoryKey(value) === filterStore.filtersState.categoryId) {
          filterStore.setCategory(null);
          updateFilters({
            categoryId: null,
          });
        } else {
          filterStore.setCategory(value);
          updateFilters({
            categoryId: getCategoryKey(value),
          });
          filterStore.setCategoryId();
        }
      });
    },
    [],
  );

  return (
    <div className={styles.catalog_page}>
      <div className={styles.catalog_page__header}>
        <Text tag="h1" view="title" weight="bold">
          Products
        </Text>
        <Text
          className={styles.catalog_page__header__description}
          tag="p"
          view="p-20"
          weight="normal"
          color="secondary"
        >
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </div>
      <div className={styles.catalog_page__options}>
        <form
          onSubmit={handleSubmit}
          className={styles.catalog_page__options__search}
        >
          <Input
            value={toJS(filterStore.searchQuery)}
            onChange={(e) => filterStore.setSearchQuery(e)}
            placeholder="Product name"
          />
          <Button
            className={styles.catalog_page__options__button}
            disabled={false}
          >
            Find now
          </Button>
        </form>
        <div className={styles.catalog_page__options__filters}>
          <MultiDropdown
            className={styles.catalog_page__options__dropdown}
            options={toJS(categoryStore.categoriesMultiDropdown)}
            value={toJS(filterStore.category)}
            onChange={handleMultiDropdownChange}
            isMulti={false}
            getTitle={getTitle}
          />
          <CatalogPriceRange />
        </div>
      </div>
      <CatalogProducts
        products={toJS(productStore.products)}
        loading={toJS(productStore.isLoading)}
        total={toJS(productStore.totalProducts)}
        limit={toJS(filterStore.limit)}
      />
      {filterStore.page && (
        <Pagination
          totalPages={toJS(productStore.totalPages)}
          currentPage={toJS(filterStore.page)}
          goToPage={handleChangePage}
        />
      )}
    </div>
  );
});

export default CatalogPage;
