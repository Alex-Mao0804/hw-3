import { makeAutoObservable, reaction, runInAction } from "mobx";
import { getProducts } from "@api";
import { ProductEntity, TFiltersApi } from "@types";
import rootStore from "@stores/RootStore";
import FilterStore from "@stores/FilterStore";
import CategoryStore from "@stores/CategoryStore";

class ProductStore {
  private _products: ProductEntity[] = [];
  private _isLoading: boolean = false;
  private _totalPages: number = 1;
  private _totalProducts: number = 0;
  private _filters: FilterStore;
  private _category: CategoryStore;

  constructor() {
    makeAutoObservable(this);
    this._filters = new FilterStore(rootStore.query);
    this._category = new CategoryStore(this);

    reaction(
      () => rootStore.query.getParams(),
      (newParams) => {
        const filters = this._filters.filtersState;

        if (newParams !== filters) {
          this._filters.setFilters(newParams);
          if (newParams.title) this._filters.setTitle(String(newParams.title));
          if (newParams.price_max)
            this._filters.setPriceRange_max(Number(newParams.price_max));
          if (newParams.price_min)
            this._filters.setPriceRange_min(Number(newParams.price_min));
          this.fetchProducts(this._filters.filtersState);
        }
      },
    );
  }

  get fetchCatalog() {
    return rootStore.query.getParams();
  }

  get category() {
    return this._category;
  }

  get filters() {
    return this._filters;
  }
  get products() {
    return this._products;
  }

  get totalPages() {
    return this._totalPages;
  }

  get isLoading() {
    return this._isLoading;
  }

  get totalProducts() {
    return this._totalProducts;
  }

  async fetchProducts(filters: TFiltersApi) {
    runInAction(() => {
      this._isLoading = true;
    });

    try {
      const { page, limit, ...otherParams } = filters;
      const paginationParams = {
        page: page,
        limit: limit,
      };
      const data = await getProducts({ ...paginationParams, ...otherParams });
      const dataWithoutPagination = await getProducts(otherParams);

      runInAction(() => {
        this._products = data;
        this._totalProducts = dataWithoutPagination.length;
        if (filters.limit) {
          this._totalPages = Math.ceil(
            dataWithoutPagination.length / filters.limit,
          );
        }
        this._isLoading = false;
      });
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  destroy() {
    runInAction(() => {
      this._products = [];
      this._isLoading = false;
      this._totalPages = 1;
      this._totalProducts = 0;
    });
  }
}

export default ProductStore;
