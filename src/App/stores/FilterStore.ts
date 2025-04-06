import { action, makeAutoObservable, runInAction } from 'mobx';
import { TFiltersApi } from "@types";
import { initialFilters } from "@utils/constants";
import QueryParamsStore from "./RootStore/QueryParamsStore";
import QueryFilterConnector from "./QueryFilterConnector";
import { NavigateFunction } from "react-router-dom";

export default class FilterStore {
  private _filtersState: TFiltersApi = initialFilters;
  private _connector: QueryFilterConnector;

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);

    // Инициализация коннектора, который будет синхронизировать параметры с фильтрами
    this._connector = new QueryFilterConnector(this.queryParamsStore, this);

    // Синхронизируем начальные параметры при инициализации
    this.syncFiltersWithQueryParams();
  }

  // Метод для синхронизации фильтров с параметрами в query
  syncFiltersWithQueryParams() {
    const { title, categoryId, price_min, price_max, page, limit } = this.queryParamsStore.getParams();

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

  // Метод для обновления и синхронизации фильтров
  updateAndSync(filters: TFiltersApi) {
    this.setFilters(filters);
    this.connector.syncFiltersToQuery(this.filtersState); // синхронизация фильтров с query
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

  // Методы для обновления конкретных фильтров
  setTitle(title: string) {
    this._filtersState.title = title;
  }

  setCategoryId(categoryId: number | null) {
    this._filtersState.categoryId = categoryId;
  }

  setPriceRange_min(priceRange_min: number | null) {
    this._filtersState.price_min = priceRange_min;
  }

  setPriceRange_max(priceRange_max: number | null) {
    this._filtersState.price_max = priceRange_max;
  }

  setPage(page: number) {
    this._filtersState.page = page;
  }

  setLimit(limit: number) {
    this._filtersState.limit = limit;
  }

  // Очистка фильтров
  destroy() {
    runInAction(() => {
      this._filtersState = initialFilters;
    });
  }
}
