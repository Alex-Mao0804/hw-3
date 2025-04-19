import { useCallback, useEffect } from "react";
import styles from "./CatalogPage.module.scss";

import CatalogProducts from "./components/CatalogProducts";
import { observer } from "mobx-react-lite";
import CatalogPriceRange from "./components/CatalogPriceRange";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStore } from "@utils/useLocalStore";
import ProductStore from "@stores/ProductStore/ProductStore";
import CategoryFilter from "@pages/CatalogPage/components/CategoryFilter";
import LimitFilter from "./components/LimitFilter";
import { Text, Input, Button, Pagination } from "@components";

const CatalogPage = observer(() => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const productStore = useLocalStore(() => new ProductStore(params));
  const {
    filters: filterStore,
    category: categoryStore,
    limitStore,
  } = productStore;

  useEffect(() => {
    filterStore.setNavigate(navigate);
  }, [navigate, filterStore]);

  const isEqual =
    String(filterStore.fieldTitle) === String(filterStore.filtersState.title);
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isEqual) {
        filterStore.updateAndSync({
          title: filterStore.getFieldTitle(),
          page: 1,
        });
      } else {
        filterStore.setTitle("");
        filterStore.updateAndSync({
          title: "",
          page: 1,
        });
      }
    },
    [filterStore, isEqual],
  );
  const handleChangePage = useCallback(
    (page: number) => {
      filterStore.updateAndSync({ page });
    },
    [filterStore],
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
            value={String(filterStore.fieldTitle)}
            onChange={(e) => {
              filterStore.setTitle(e);
            }}
            placeholder="Product name"
          />
          <div className={styles.catalog_page__options__button_container}>
            <Button
              className={styles.catalog_page__options__button}
              disabled={!filterStore.fieldTitle}
            >
              {!isEqual || !filterStore.fieldTitle ? "Find now" : "Reset"}
            </Button>
          </div>
        </form>
        <div className={styles.catalog_page__options__filters}>
          <div className={styles.catalog_page__options__filters__top}>
            <CategoryFilter
              categoryStore={categoryStore}
              filterStore={filterStore}
            />
            <LimitFilter limitStore={limitStore} filterStore={filterStore} />
          </div>
          <CatalogPriceRange productStore={productStore} />
        </div>
      </div>
      <CatalogProducts
        products={productStore.products}
        loading={productStore.isLoading}
        total={productStore.totalProducts}
        limit={filterStore.filtersState.limit}
      />
      {filterStore.filtersState.page && (
        <Pagination
          totalPages={productStore.totalPages}
          currentPage={filterStore.filtersState.page}
          goToPage={handleChangePage}
        />
      )}
    </div>
  );
});

export default CatalogPage;
