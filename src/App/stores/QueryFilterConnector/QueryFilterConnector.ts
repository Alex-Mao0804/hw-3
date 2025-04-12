import { TFiltersApi } from "@api/type/directionProduct/list";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";
import { runInAction } from "mobx";
import { NavigateFunction } from "react-router-dom";

export default class QueryFilterConnector {
  private _queryParamsStore: QueryParamsStore;
  private _navigate: NavigateFunction | null = null;

  constructor(queryParamsStore: QueryParamsStore) {
    this._queryParamsStore = queryParamsStore;
  }

  syncFiltersToQuery(filters: TFiltersApi) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: Record<string, any> = {};

      if (filters.title) params.title = filters.title;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.price_min) params.price_min = filters.price_min;
      if (filters.price_max) params.price_max = filters.price_max;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;

      this._queryParamsStore.setParams(new URLSearchParams(params).toString());

      if (this._navigate) {
        this._navigate(`?${new URLSearchParams(params).toString()}`);
      }
  }

  setNavigator(navigate: NavigateFunction) {
    this._navigate = navigate;
  }
}
