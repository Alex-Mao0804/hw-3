import { TFiltersApi } from "@/api/type/product/list";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";
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

    const queryString = new URLSearchParams(params).toString();
    this._queryParamsStore.setParams(queryString);

    if (this._navigate) {
      this._navigate(`?${queryString}`);
    }
  }

  setNavigator(navigate: NavigateFunction) {
    this._navigate = navigate;
  }
}
