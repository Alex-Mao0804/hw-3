import { makeAutoObservable, runInAction } from "mobx";
import { TFiltersApi } from "@types";
import { initialFilters } from "@utils/constants";

class FilterStore {
  private _filtersState: TFiltersApi = initialFilters;

  constructor() {
    makeAutoObservable(this);
  }

  get filtersState() {
    return this._filtersState;
  }

  get title() {
    return this._filtersState.title;
  }

  setTitle(title: string) {
    runInAction(() => {
      this._filtersState.title = title;
    });
  }

  setCategoryId(categoryId: number | null) {
    runInAction(() => {
      this._filtersState.categoryId = categoryId;
    });
  }

  setPriceRange_min(priceRange_min: string) {
    runInAction(() => {
      this._filtersState.price_min = Number(priceRange_min);
    });
  }

  setPriceRange_max(priceRange_max: string) {
    runInAction(() => {
      this._filtersState.price_max = Number(priceRange_max);
    });
  }

  setPage(page: number) {
    runInAction(() => {
      this._filtersState.page = page;
    });
  }

  setLimit(limit: number) {
    runInAction(() => {
      this._filtersState.limit = limit;
    });
  }

  destroy() {
    runInAction(() => {
      this._filtersState = initialFilters;
    });
  }
}

export default new FilterStore();
