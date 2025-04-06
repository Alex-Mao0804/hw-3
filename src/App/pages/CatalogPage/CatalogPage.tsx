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
import { OptionEntity } from "@types";
import { extractOptionKey } from "@/App/utils/extractOptionKey";
import Text from "@components/Text";
import useProductStore from "@stores/RootStore/hooks/useProductStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { initialFilters } from "@utils/constants";

const CatalogPage = observer(() => {
  const productStore = useProductStore();
  const filterStore = productStore.filters;
  const categoryStore = productStore.category;
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.toString() === "") {
      productStore.fetchProducts(initialFilters);
    }
  }, [productStore, params]);

  useEffect(() => {
    filterStore.setNavigate(navigate);
  }, [navigate, filterStore]);

  useEffect(() => {
    categoryStore.fetchCategories();

    return () => {
      categoryStore.destroy();
      productStore.destroy();
      filterStore.destroy();
    };
  }, [categoryStore, productStore, filterStore]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      runInAction(() => {
        filterStore.updateAndSync({
          title: filterStore.fieldTitle,
        });
      });
    },
    [filterStore],
  );
  const handleChangePage = useCallback(
    (page: number) => {
      runInAction(() => {
        if (filterStore.filtersState.page !== page) {
          filterStore.updateAndSync({
            page: page,
          });
        }
      });
    },
    [filterStore],
  );

  const handleMultiDropdownChange = useCallback(
    (value: OptionEntity | OptionEntity[] | null) => {
      runInAction(() => {
        const selectedId = extractOptionKey(value);
        if (selectedId === Number(filterStore.filtersState.categoryId)) {
          filterStore.setCategoryId(null);
          categoryStore.setCategoryMultiDropdownValue(null);
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
            value={String(filterStore.fieldTitle)}
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
