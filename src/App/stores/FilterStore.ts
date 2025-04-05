import { makeAutoObservable, reaction, runInAction } from "mobx";
import { TFiltersApi } from "@types";
import { initialFilters } from "@utils/constants";
import RootStore from "./RootStore";

export default class FilterStore {
  private _filtersState: TFiltersApi = initialFilters;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({
        title: RootStore.query.getParam("title"),
        categoryId: RootStore.query.getParam("categoryId"),
        price_min: RootStore.query.getParam("price_min"),
        price_max: RootStore.query.getParam("price_max"),
        page: RootStore.query.getParam("page"),
        limit: RootStore.query.getParam("limit"),
        offset: RootStore.query.getParam("offset"),
      }),
      (params) => {
        const { title, categoryId, price_min, price_max, page, limit, offset } = params;

        if (title) this.setTitle(String(title));
        if (categoryId) this.setCategoryId(Number(categoryId));
        if (price_min) this.setPriceRange_min(Number(price_min));
        if (price_max) this.setPriceRange_max(Number(price_max));

        if (limit) this.setLimit(Number(limit));
        if (offset && limit) {
          const computedPage = Math.floor(Number(offset) / Number(limit)) + 1;
          this.setPage(computedPage);
        } else if (page) {
          this.setPage(Number(page));
        }
      },
      { fireImmediately: true }
    );
  }

  get filtersState() {
    return this._filtersState;
  }

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

  destroy() {
    runInAction(() => {
      this._filtersState = initialFilters;
    });
  }
}
