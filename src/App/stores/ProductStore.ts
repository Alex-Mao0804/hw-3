import {
  IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
} from "mobx";
import { getProducts } from "@api";
import { ProductEntity, TFiltersApi } from "@types";
import rootStore from "./RootStore";
import FilterStore from "./FilterStore";

class ProductStore {
  private _products: ProductEntity[] = [];
  private _isLoading: boolean = false;
  private _totalPages: number = 1;
  private _totalProducts: number = 0;
  filters: FilterStore;
  private _qpReaction: IReactionDisposer;

  constructor() {
    makeAutoObservable(this);
    this.filters = new FilterStore();
    this._qpReaction = reaction(
      () => rootStore.query.getParams(),
      () => {
        this.fetchProducts(this.filters.filtersState);
      },
      {
        fireImmediately: true,
      },
    );
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
