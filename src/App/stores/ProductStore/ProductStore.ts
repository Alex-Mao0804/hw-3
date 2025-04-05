import {
  autorun,
  IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
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
    this._filters = new FilterStore();
    this._category = new CategoryStore(this);
  // 💡 Если нет query-параметров — выполняем дефолтный запрос
  const initialParams = rootStore.query.getParams();
  const hasAnyParams = Object.keys(initialParams).length > 0;
  console.log("hasAnyParams", hasAnyParams);
  
  if (!hasAnyParams) {
    console.log("Нет query-параметров, выполняем дефолтный запрос");
    
    // 👇 Тут задаём параметры по умолчанию
    this.fetchProducts({ page: 1, limit: 10 });
  }
    // Реакция на изменение параметров query
    this._qpReaction = reaction(
      () => rootStore.query.getParams(), // Отслеживаем изменения в query
      (newParams) => {
        console.log("newParams", newParams);
        // Проверяем, что параметры query действительно изменились и требуют запроса
        const filters = this._filters.filtersState;
        const paramsChanged =
          newParams.page !== filters.page ||
          newParams.limit !== filters.limit ||
          newParams.title !== filters.title ||
          newParams.categoryId !== filters.categoryId ||
          newParams.price_min !== filters.price_min ||
          newParams.price_max !== filters.price_max;

        if (paramsChanged
      ) {
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
