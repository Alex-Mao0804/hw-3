import { useNavigate } from "react-router-dom";
import filterStore from "@stores/FilterStore";

const useSetFilters = () => {
  const navigate = useNavigate();

  const updateFilters = (filters: {
    page?: number;
    title?: string;
    categoryId?: number | number[] | null;
    priceRange?: { min: string; max: string };
  }) => {
    const params = new URLSearchParams(window.location.search);

    // Берём priceRange из `filters` или оставляем текущее значение из `filterStore`
    const priceMin = filters.priceRange?.min ?? filterStore.priceRange.min;
    const priceMax = filters.priceRange?.max ?? filterStore.priceRange.max;

    if (priceMin) params.set("price_min", priceMin);
    else params.delete("price_min");

    if (priceMax) params.set("price_max", priceMax);
    else params.delete("price_max");

    if (filters.page && filterStore.filtersState.limit) {
      params.set(
        "offset",
        ((filters.page - 1) * filterStore.filtersState.limit).toString(),
      );
      params.set("limit", filterStore.filtersState.limit.toString());
    } else if (filterStore.filtersState.limit) {
      params.set("offset", "0");
      params.set("limit", filterStore.filtersState.limit.toString());
    }

    if (filters.title !== undefined) {
      if (filters.title) {
        params.set("title", filters.title);
      } else {
        params.delete("title");
      }
    }

    if (filters.categoryId !== undefined) {
      if (filters.categoryId) {
        params.set("categoryId", filters.categoryId.toString());
      } else {
        params.delete("categoryId");
      }
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  return updateFilters;
};

export default useSetFilters;
