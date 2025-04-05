import { useNavigate } from "react-router-dom";
import { TFiltersApi } from "../utils/types";

const useSetFilters = (filtersState: TFiltersApi) => {
  const navigate = useNavigate();

  const updateFilters = (filters: TFiltersApi) => {
    const params = new URLSearchParams(window.location.search);

    if (filters.page && filters.limit) {
      params.set(
        "offset",
        ((filters.page - 1) * filters.limit).toString(),
      );
      params.set("limit", filters.limit.toString());
    } else if (filters.limit) {
      params.set("offset", "0");
      params.set("limit", filters.limit.toString());
    }

    if (filters.title !== undefined) {
      if (filters.title) {
        params.set("title", filters.title);
      } else {
        params.delete("title");
      }
    }

    if (filters.price_max !== undefined) {
      if (filters.price_max) {
        params.set("price_max", filters.price_max.toString());
      } else {
        params.delete("price_max");
      }
    }

    if (filters.price_min !== undefined) {
      if (filters.price_min) {
        params.set("price_min", filters.price_min.toString());
      } else {
        params.delete("price_min");
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
