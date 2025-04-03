import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { TFiltersApi } from "@types";
import filterStore from "@stores/FilterStore";
import { initialFilters } from "@utils/constants";

const useSyncFiltersWithURL = (userFilters: TFiltersApi) => {
  const [searchParams] = useSearchParams();

  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || userFilters.limit;
  const title = searchParams.get("title") || "";
  const categoryId = Number(searchParams.get("categoryId")) || null;
  const page = limit ? Math.floor(offset / limit) + 1 : undefined;

  const priceRange_min = searchParams.get("price_min") || "";
  const priceRange_max = searchParams.get("price_max") || "";

  const urlFilters: TFiltersApi = {
    title,
    categoryId,
    page,
    limit,
    price_max: Number(priceRange_max),
    price_min: Number(priceRange_min),
  };

  const isFiltersDifferent = useMemo(() => {
    return (
      urlFilters.title !== userFilters.title ||
      urlFilters.categoryId !== userFilters.categoryId ||
      urlFilters.page !== userFilters.page ||
      urlFilters.limit !== userFilters.limit ||
      urlFilters.price_max !== userFilters.price_max ||
      urlFilters.price_min !== userFilters.price_min
    );
  }, [urlFilters]);

  useEffect(() => {
    if (
      isFiltersDifferent ||
      JSON.stringify(urlFilters) !== JSON.stringify(initialFilters)
    ) {
      filterStore.setFiltersValues(urlFilters);
    }
  }, [isFiltersDifferent, searchParams]);

  return { isFiltersReady: !isFiltersDifferent };
};

export default useSyncFiltersWithURL;
