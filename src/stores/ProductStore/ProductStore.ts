import { makeAutoObservable, reaction, runInAction } from "mobx";
import rootStore from "@/stores/RootStore";
import { FilterStore } from "@stores";
import { ProductEntity } from "@/utils/types";
import { TFiltersApi } from "@/api/type/product/list";
import { getProducts } from "@/api/handlers/product/list";
import { ILocalStore } from "@/utils/useLocalStore";
import { initialFilters } from "@/utils/constants";

class ProductStore implements ILocalStore {
  private _products: ProductEntity[] = [];
  private _isLoading: boolean = false;
  private _totalPages: number = 1;
  private _totalProducts: number = 0;
  private _filters: FilterStore;
  private _disposeReaction: () => void = () => {};

  constructor(paramsUrl: URLSearchParams) {
    makeAutoObservable(this);
    this._filters = new FilterStore(rootStore.query);

    if (paramsUrl.toString() === "") {
      this.fetchProducts(initialFilters);
    }
  }

  init() {
    this._disposeReaction = reaction(
      () => rootStore.query.getParams(),
      (params) => {
        if (Object.keys(params).length === 0) {
          this.setFiltersFromParams(initialFilters);
        } else {
          this.setFiltersFromParams(params);
        }
        this.fetchProducts(this._filters.filtersState);
      },
    );
  }

  private setFiltersFromParams(params: TFiltersApi) {
    this._filters.setFilters(params);
    if (params.title) this._filters.setTitle(String(params.title));
    if (params.price_max)
      this._filters.setPriceRangeMax(Number(params.price_max));
    if (params.price_min)
      this._filters.setPriceRangeMin(Number(params.price_min));
  }

  get fetchCatalog() {
    return rootStore.query.getParams();
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
    this._isLoading = true;

    try {
      const { page, limit, ...otherParams } = filters;
      const paginationParams = {
        page: page,
        limit: limit,
      };
      const data = await getProducts({ ...paginationParams, ...otherParams });
      const dataWithoutPagination = await getProducts(otherParams);
      runInAction(() => {
        this.setProducts(data);
        this.setTotalProducts(dataWithoutPagination.length);
        this.setTotalPages(dataWithoutPagination.length, limit);
      });
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  setProducts(data: ProductEntity[]) {
    this._products = data;
  }

  setTotalProducts(total: number) {
    this._totalProducts = total;
  }

  setTotalPages(total: number, limit?: number) {
    if (limit) {
      this._totalPages = Math.ceil(total / limit);
    }
  }
  destroy() {
    this._disposeReaction();
    this._filters.destroy();
    this._products = [];
    this._isLoading = false;
    this._totalPages = 1;
    this._totalProducts = 0;
  }
}

export default ProductStore;
