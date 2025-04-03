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

  const urlFilters: TFiltersApi = {
    title,
    categoryId,
    page,
    limit,
  };

  const isFiltersDifferent = useMemo(() => {
    return (
      urlFilters.title !== userFilters.title ||
      urlFilters.categoryId !== userFilters.categoryId ||
      urlFilters.page !== userFilters.page ||
      urlFilters.limit !== userFilters.limit
    );
  }, [urlFilters, userFilters]);

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
