import { makeAutoObservable, runInAction } from "mobx";
import { TFiltersApi } from "@types";
import { initialFilters } from "@utils/constants";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";
import QueryFilterConnector from "@stores/QueryFilterConnector";
import { NavigateFunction } from "react-router-dom";

export default class FilterStore {
  private _fieldTitle: string = "";
  private _filedPriceRange_min: number | null = null;
  private _filedPriceRange_max: number | null = null;
  private _filtersState: TFiltersApi = initialFilters;
  private _connector: QueryFilterConnector;

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);

    this._connector = new QueryFilterConnector(this.queryParamsStore);

    this.syncFiltersWithQueryParams();
  }

  syncFiltersWithQueryParams() {
    const { title, categoryId, price_min, price_max, page, limit } =
      this.queryParamsStore.getParams();
    if (title) this.setTitle(String(title));
    if (categoryId) this.setCategoryId(Number(categoryId));
    if (price_min) this.setPriceRange_min(Number(price_min));
    if (price_max) this.setPriceRange_max(Number(price_max));
    if (page) this.setPage(Number(page));
    if (limit) this.setLimit(Number(limit));
  }

  get connector() {
    return this._connector;
  }

  get fieldTitle() {
    return this._fieldTitle;
  }

  get fieldPriceRange_min() {
    return this._filedPriceRange_min;
  }

  get fieldPriceRange_max() {
    return this._filedPriceRange_max;
  }

  updateAndSync(filters: TFiltersApi) {
    this.setFilters(filters);
    this.connector.syncFiltersToQuery(this.filtersState);
  }

  setFilters(filters: TFiltersApi) {
    this._filtersState = {
      ...this._filtersState,
      ...filters,
    };
  }

  setNavigate(navigate: NavigateFunction) {
    this.connector.setNavigator(navigate);
  }

  get filtersState() {
    return this._filtersState;
  }

  setTitle(title: string) {
    this._fieldTitle = title;
    this._filtersState.page = 1;
  }

  setCategoryId(categoryId: number | null) {
    this._filtersState.categoryId = categoryId;
    this._filtersState.page = 1;
  }

  setPriceRange_min(priceRange_min: number | null) {
    this._filedPriceRange_min = priceRange_min;
    this._filtersState.page = 1;
  }

  setPriceRange_max(priceRange_max: number | null) {
    this._filedPriceRange_max = priceRange_max;
    this._filtersState.page = 1;
  }

  setPage(page: number) {
    this._filtersState.page = page;
  }

  setLimit(limit: number) {
    this._filtersState.limit = limit;
  }

  destroy() {
    runInAction(() => {
      this._filtersState = initialFilters;
    });
  }
}
