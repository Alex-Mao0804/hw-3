import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { runInAction } from "mobx";
import filterStore from "@stores/FilterStore";
import productStore from "@stores/ProductStore";
import { initialFilters } from "@utils/constants";

const useSyncFiltersWithURL = () => {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);

    const title = params.get("title");
    const categoryId = params.get("categoryId");
    const offset = Number(params.get("offset")) || 0;
    const limit = Number(params.get("limit")) || initialFilters.limit;
    const page = limit ? Math.floor(offset / limit) + 1 : undefined;
    const priceRange_min = Number(params.get("price_min"));
    const priceRange_max = Number(params.get("price_max"));

    runInAction(() => {
      if (title !== filterStore.filtersState.title) {
        if (title) {
          filterStore.setTitle(title);
        }
      }
      if (categoryId !== filterStore.filtersState.categoryId) {
        if (categoryId) {
          filterStore.setCategoryId(Number(categoryId));
        }
      }
      if (priceRange_min !== filterStore.filtersState.price_min) {
        filterStore.setPriceRange_min(priceRange_min);
      }
      if (priceRange_max !== filterStore.filtersState.price_max) {
        filterStore.setPriceRange_max(priceRange_max);
      }

      if (page !== filterStore.filtersState.page) {
        filterStore.setPage(Number(page));
      }

      filterStore.setLimit(Number(limit));

      productStore.fetchProducts(filterStore.filtersState);
    });
  }, [search]);
};

export default useSyncFiltersWithURL;
