import { makeAutoObservable, reaction, runInAction } from "mobx";
import { OptionMultiDropdown, TFiltersApi } from "@types";
import { initialFilters } from "@utils/constants";
import { getCategoryKey } from "@utils/getCategoryKey";
import categoryStore from "@stores/CategoryStore";

class FilterStore {
  private _searchQuery: string = "";
  private _category: OptionMultiDropdown | OptionMultiDropdown[] | null = null;
  private _priceRange: {
    min: string;
    max: string;
  } = {
    min: "",
    max: "",
  };
  private _filtersState: TFiltersApi = initialFilters;

  private _prevFilters: TFiltersApi | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this._filtersState.price_max,
      (max) => {
        if (max && this._priceRange.max !== String(max)) {
          this._priceRange.max = String(max);
        }
      },
    );
    reaction(
      () => this._filtersState.price_min,
      (min) => {
        if (min && this._priceRange.min !== String(min)) {
          this._priceRange.min = String(min);
        }
      },
    );

    reaction(
      () => this._filtersState.title,
      (title) => {
        if (title) this._searchQuery = title;
      },
    );

    reaction(
      () => categoryStore.isLoading,
      (isLoading) => {
        if (!isLoading) {
          this.initializeCategory();
        }
      },
    );

    reaction(
      () => this._filtersState.categoryId,
      (categoryId) => {
        if (categoryId) {
          this.updateCategoryFromId(categoryId);
        }
      },
    );

    this.initializeCategory();
  }

  private initializeCategory() {
    const categoryId = this._filtersState.categoryId;
    if (categoryId) {
      this.updateCategoryFromId(categoryId);
    }
  }

  private updateCategoryFromId(categoryId: number) {
    const categorySelected = categoryStore.categories.find(
      (cat) => cat.id === categoryId,
    );
    this._category = categorySelected
      ? { key: String(categorySelected.id), value: categorySelected.name }
      : null;
  }

  get priceRange() {
    return this._priceRange;
  }
  get filtersState() {
    return this._filtersState;
  }

  get title() {
    return this._filtersState.title;
  }

  get category() {
    return this._category;
  }

  get page() {
    return this._filtersState.page;
  }

  get limit() {
    return this._filtersState.limit;
  }

  get searchQuery() {
    return this._searchQuery;
  }

  setPriceRangeFilters() {
    runInAction(() => {
      this._filtersState.price_min = Number(this._priceRange.min);
      this._filtersState.price_max = Number(this._priceRange.max);
    });
  }

  setPriceRange(min?: string, max?: string) {
    runInAction(() => {
      if (min !== undefined) this._priceRange.min = min;
      if (max !== undefined) this._priceRange.max = max;
    });
  }
  setSearchQuery(query: string) {
    runInAction(() => {
      this._searchQuery = query;
    });
  }

  setTitle() {
    runInAction(() => {
      this._filtersState.title = this._searchQuery;
    });
  }

  setCategoryId() {
    runInAction(() => {
      this._filtersState.categoryId = getCategoryKey(this._category)!;
    });
  }
  setCategory(category: OptionMultiDropdown | OptionMultiDropdown[] | null) {
    runInAction(() => {
      this._category = category;
    });
  }

  setPage(page: number) {
    runInAction(() => {
      this._filtersState.page = page;
    });
  }

  setFiltersValues(filters: TFiltersApi) {
    runInAction(() => {
      this._filtersState = filters;
    });
  }

  applyFilters() {
    const filtersChanged =
      JSON.stringify(this._filtersState) !== JSON.stringify(this._prevFilters);
    if (filtersChanged) {
      this._prevFilters = { ...this._filtersState };
      return true;
    }
    return false;
  }
}

export default new FilterStore();
