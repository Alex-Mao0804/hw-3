import { TFiltersApi } from "@api/type/directionProduct/list";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";
import { runInAction } from "mobx";
import { NavigateFunction } from "react-router-dom";

export default class QueryFilterConnector {
  private queryParamsStore: QueryParamsStore;
  private navigate: NavigateFunction | null = null;

  constructor(queryParamsStore: QueryParamsStore) {
    this.queryParamsStore = queryParamsStore;
  }

  syncFiltersToQuery(filters: TFiltersApi) {
    runInAction(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: Record<string, any> = {};

      if (filters.title) params.title = filters.title;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.price_min) params.price_min = filters.price_min;
      if (filters.price_max) params.price_max = filters.price_max;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;

      this.queryParamsStore.setParams(new URLSearchParams(params).toString());

      if (this.navigate) {
        this.navigate(`?${new URLSearchParams(params).toString()}`);
      }
    });
  }

  setNavigator(navigate: NavigateFunction) {
    this.navigate = navigate;
  }
}
