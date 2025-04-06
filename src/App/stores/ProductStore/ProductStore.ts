import {
  autorun,
  IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
  toJS,
} from "mobx";
import { getProducts } from "@api";
import { ProductEntity, TFiltersApi } from "@types";
import rootStore from "../RootStore";
import FilterStore from "../FilterStore";
import CategoryStore from "../CategoryStore";

class ProductStore {
  private _products: ProductEntity[] = [];
  private _isLoading: boolean = false;
  private _totalPages: number = 1;
  private _totalProducts: number = 0;
  private _filters: FilterStore;
  private _category: CategoryStore

  private _qpReaction: IReactionDisposer;

  constructor() {
    makeAutoObservable(this);
    this._filters = new FilterStore(rootStore.query);
    this._category = new CategoryStore(this);

    this._qpReaction = reaction(
      () => rootStore.query.getParams(), // Отслеживаем изменения в query
      (newParams) => {
        const filters = this._filters.filtersState;
        const paramsChanged =
          newParams.page !== filters.page ||
          newParams.limit !== filters.limit ||
          newParams.title !== filters.title ||
          newParams.categoryId !== filters.categoryId ||
          newParams.price_min !== filters.price_min ||
          newParams.price_max !== filters.price_max;

        if (paramsChanged) {
          this._filters.setFilters(newParams);          
          this.fetchProducts(this._filters.filtersState);
        }
      },

    );
  
  }

  get fetchCatalog() {
    return rootStore.query.getParams()
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
