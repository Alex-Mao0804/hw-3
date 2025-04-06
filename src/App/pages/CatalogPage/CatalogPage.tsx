import { useCallback, useEffect } from "react";
import styles from "./CatalogPage.module.scss";
import Input from "@components/Input";
import Button from "@components/Button";
import CatalogProducts from "./components/CatalogProducts";
import { observer } from "mobx-react-lite";
import { runInAction, toJS } from "mobx";
import Pagination from "@components/Pagination";
import MultiDropdown from "@components/MultiDropdown";
import CatalogPriceRange from "./components/CatalogPriceRange";
import { OptionMultiDropdown } from "@types";
import { getCategoryKey } from "@utils/getCategoryKey";
import Text from "@components/Text";
import useProductStore from "@/App/stores/RootStore/hooks/useProductStore";
import { useNavigate } from "react-router-dom";

const CatalogPage = observer(() => {
  const productStore = useProductStore(); // ✅ локальный store
  const filterStore = productStore.filters; // доступ к filters через prod
  const categoryStore = productStore.category;
  const navigate = useNavigate();

  useEffect(() => {
    filterStore.setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    categoryStore.fetchCategories();

    return () => {
      categoryStore.destroy();
      productStore.destroy();
      // filterStore.destroy();
    };
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      runInAction(() => {
        filterStore.updateAndSync({
          title: filterStore.filtersState.title,
        });
      });
    },
    [filterStore.filtersState.title],
  );
  const handleChangePage = useCallback((page: number) => {
    runInAction(() => {
      if (filterStore.filtersState.page !== page) {
        filterStore.updateAndSync({
          page: page,
        });
      }
    });
  }, []);

  const handleMultiDropdownChange = useCallback(
    (value: OptionMultiDropdown | OptionMultiDropdown[] | null) => {
      runInAction(() => {
        const selectedId = getCategoryKey(value);
        if (selectedId === Number(filterStore.filtersState.categoryId)) {
          filterStore.setCategoryId(null);  // Сброс категории в фильтре
          categoryStore.setCategoryMultiDropdownValue(null);  // Сброс выбранного значения
          filterStore.updateAndSync({ categoryId: null });
        } else {          
          categoryStore.setCategoryMultiDropdownValue(value);
          filterStore.updateAndSync({ categoryId: selectedId });
        }
      });
    },
    [filterStore, categoryStore],
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
            value={String(filterStore.filtersState.title)}
            onChange={(e) => {
              runInAction(() => {
                filterStore.setTitle(e);
              });
            }}
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
            value={toJS(categoryStore.categoryMultiDropdownValue)}
            onChange={handleMultiDropdownChange}
            isMulti={false}
            getTitle={categoryStore.getTitleMultiDropdown}
          />
          <CatalogPriceRange productStore={productStore} />
        </div>
      </div>
      <CatalogProducts
        products={toJS(productStore.products)}
        loading={toJS(productStore.isLoading)}
        total={toJS(productStore.totalProducts)}
        limit={toJS(filterStore.filtersState.limit)}
      />
      {filterStore.filtersState.page && (
        <Pagination
          totalPages={toJS(productStore.totalPages)}
          currentPage={toJS(filterStore.filtersState.page)}
          goToPage={handleChangePage}
        />
      )}
    </div>
  );
});

export default CatalogPage;
