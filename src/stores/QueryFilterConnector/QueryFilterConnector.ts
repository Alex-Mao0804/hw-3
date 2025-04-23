import { TFiltersState } from "@/api/type/product/list";
import QueryParamsStore from "@/stores/RootStore/QueryParamsStore";
import FilterStore from "@/stores/FilterStore";
import { NavigateFunction } from "react-router-dom";
import { ILocalStore } from "@/utils/useLocalStore";
import * as qs from "qs";

export default class QueryFilterConnector implements ILocalStore {
  private _queryParamsStore: QueryParamsStore;
  private _filterStore: FilterStore;
  private _navigate: NavigateFunction | null = null;

  constructor(queryParamsStore: QueryParamsStore, filterStore: FilterStore) {
    this._queryParamsStore = queryParamsStore;
    this._filterStore = filterStore;
  }

  setNavigator(navigate: NavigateFunction) {
    this._navigate = navigate;
  }

  syncQueryToFilters() {
    const params = this._queryParamsStore.getParams();

    if (params.title) this._filterStore.setTitle(String(params.title));
    if (params.categoryId)
      this._filterStore.setCategoryId(Number(params.categoryId));
    if (params.price_min)
      this._filterStore.setPriceRangeMin(Number(params.price_min));
    if (params.price_max)
      this._filterStore.setPriceRangeMax(Number(params.price_max));
    if (params.page) this._filterStore.setPage(Number(params.page));
    if (params.limit) this._filterStore.setLimit(Number(params.limit));
  }

  syncFiltersToQuery() {
    const filters: TFiltersState = this._filterStore.filtersState;
    const queryString = qs.stringify(filters, {
      addQueryPrefix: false,
      skipNulls: true,
    });

    this._queryParamsStore.setParams(queryString);

    if (this._navigate) {
      this._navigate(`?${queryString}`);
    }
  }

  destroy() {
    this._queryParamsStore = new QueryParamsStore();
    this._filterStore = new FilterStore(this._queryParamsStore);
    this._navigate = null;
  }
}
