import { makeAutoObservable, reaction, toJS } from "mobx";
import { initialFilters } from "@utils/constants";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";
import QueryFilterConnector from "@stores/QueryFilterConnector";
import { NavigateFunction } from "react-router-dom";
import { TFiltersApi } from "@api/type/directionProduct/list";

export default class FilterStore {
  private _fieldTitle: string = "";
  private _filedPriceRangeMin: number | null = null;
  private _filedPriceRangeMax: number | null = null;
  private _filtersState: TFiltersApi = initialFilters;
  private _connector: QueryFilterConnector;

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);

    this._connector = new QueryFilterConnector(this.queryParamsStore);

    // reaction(
    //   () => this.queryParamsStore.getParams(),
       
    //   () => {
    //     this.syncFiltersWithQueryParams();
    //   }
    // )
    this.syncFiltersWithQueryParams();
  }

  syncFiltersWithQueryParams() {
        
    const params =
      this.queryParamsStore.getParams();

    const { title, categoryId, price_min, price_max, page, limit } = params;
      console.log('dddd', this.queryParamsStore.getParams());
      

    if (title) this.setTitle(String(title));
    if (categoryId) this.setCategoryId(Number(categoryId));
    if (price_min) this.setPriceRangeMin(Number(price_min));
    if (price_max) this.setPriceRangeMax(Number(price_max));
    if (page) this.setPage(Number(page));
    if (limit) this.setLimit(Number(limit));

    // this.updateAndSync(params);
    console.log("filtersState:", toJS(this.filtersState));
  }

  get connector() {
    return this._connector;
  }

  get fieldTitle() {
    return this._fieldTitle;
  }

  get fieldPriceRangeMin() {
    return this._filedPriceRangeMin;
  }

  get fieldPriceRangeMax() {
    return this._filedPriceRangeMax;
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

  setPriceRangeMin(priceRange_min: number | null) {
    this._filedPriceRangeMin = priceRange_min;
    this._filtersState.page = 1;
  }

  setPriceRangeMax(priceRange_max: number | null) {
    this._filedPriceRangeMax = priceRange_max;
    this._filtersState.page = 1;
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
