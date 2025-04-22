import { makeAutoObservable } from "mobx";
import { initialFilters } from "@/utils/constants";
import QueryParamsStore from "@/stores/RootStore/QueryParamsStore";
import QueryFilterConnector from "@/stores/QueryFilterConnector";
import { NavigateFunction } from "react-router-dom";
import { TFiltersApi } from "@/api/type/product/list";
import { ILocalStore } from "@/utils/useLocalStore";
import LimitStore from "../LimitStore";
import CategoryStore from "../CategoryStore";

export default class FilterStore implements ILocalStore {
  private _fieldTitle: string = "";
  private _fieldPriceRangeMin: number | null = null;
  private _fieldPriceRangeMax: number | null = null;
  private _filtersState: TFiltersApi = initialFilters;
  private _connector: QueryFilterConnector;
  private _limitStore: LimitStore;
  private _categoryStore: CategoryStore;

  constructor(private _queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);

    this._connector = new QueryFilterConnector(this.queryParamsStore, this);
    this._connector.syncQueryToFilters();

    this._limitStore = new LimitStore(this.queryParamsStore);
    this._categoryStore = new CategoryStore(this);
  }

  get queryParamsStore() {
    return this._queryParamsStore;
  }

  get connector() {
    return this._connector;
  }

  get limitStore() {
    return this._limitStore;
  }

  get categoryStore() {
    return this._categoryStore;
  }

  get fieldTitle() {
    return this._fieldTitle;
  }

  getFieldTitle() {
    return this._fieldTitle;
  }

  get fieldPriceRangeMin() {
    return this._fieldPriceRangeMin;
  }

  get fieldPriceRangeMax() {
    return this._fieldPriceRangeMax;
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
  }

  setCategoryId(categoryId: number | null) {
    this._filtersState.categoryId = categoryId;
  }

  setPriceRangeMin(priceRange_min: number | null) {
    this._fieldPriceRangeMin = priceRange_min;
  }

  setPriceRangeMax(priceRange_max: number | null) {
    this._fieldPriceRangeMax = priceRange_max;
  }

  setPage(page: number) {
    this._filtersState.page = page;
  }

  setLimit(limit: number) {
    this._filtersState.limit = limit;
  }

  destroy() {
    this._filtersState = initialFilters;
  }
}
