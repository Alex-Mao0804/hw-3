import { TFiltersApi } from "@types";
import QueryParamsStore from "../RootStore/QueryParamsStore";
import FilterStore from "../FilterStore";
import { IReactionDisposer, reaction, runInAction } from "mobx";
import { RootStore } from "../RootStore";
import { ParsedQs } from "qs";


  export default class QueryFilterConnector {
    private queryParamsStore: QueryParamsStore;
    private filtersStore: FilterStore;
    private navigate?: Function; 
    private _qpReaction: IReactionDisposer;

    constructor(queryParamsStore: QueryParamsStore, filtersStore: FilterStore) {
      this.queryParamsStore = queryParamsStore;
      this.filtersStore = filtersStore;
   // Реакция на изменения параметров query
   this._qpReaction = reaction(
    () => ({
      title: RootStore.query.getParam("title"),
      categoryId: RootStore.query.getParam("categoryId"),
      price_min: RootStore.query.getParam("price_min"),
      price_max: RootStore.query.getParam("price_max"),
      page: RootStore.query.getParam("page"),
      limit: RootStore.query.getParam("limit"),
      offset: RootStore.query.getParam("offset"),
    }),
    (params: any) => {
      const { title, categoryId, price_min, price_max, page, limit, offset } = params;

      // Обновляем состояние фильтров на основе параметров из query
      runInAction(() => {
        if (title) this.filtersStore.setTitle(String(title));
        if (categoryId) this.filtersStore.setCategoryId(Number(categoryId));
        if (price_min) this.filtersStore.setPriceRange_min(Number(price_min));
        if (price_max) this.filtersStore.setPriceRange_max(Number(price_max));

        if (limit) this.filtersStore.setLimit(Number(limit));
        if (offset && limit) {
          const computedPage = Math.floor(Number(offset) / Number(limit)) + 1;
          this.filtersStore.setPage(computedPage);
        } else if (page) {
          this.filtersStore.setPage(Number(page));
        }
      });
    },
    { fireImmediately: true } // Запускаем реакцию сразу при создании
  );
}
  
    setNavigator(navigate: (url: string, options?: { replace?: boolean }) => void) {
      this.navigate = navigate;
    }

  // Установим УРЛ
  syncFiltersToQuery(filters: TFiltersApi) {
    const params = new URLSearchParams();
  
    if (filters.page && filters.limit) {
      params.set("offset", ((filters.page - 1) * filters.limit).toString());
      params.set("limit", filters.limit.toString());
    } else if (filters.limit) {
      params.set("offset", "0");
      params.set("limit", filters.limit.toString());
    }
  
    if (filters.title) {
      params.set("title", filters.title);
    }
  
    if (filters.price_max !== undefined && filters.price_max !== null) {
      params.set("price_max", filters.price_max.toString());
    }
  
    if (filters.price_min !== undefined && filters.price_min !== null) {
      params.set("price_min", filters.price_min.toString());
    }
  
    if (filters.categoryId !== undefined && filters.categoryId !== null) {
      params.set("categoryId", filters.categoryId.toString());
    }
  
    // Убедитесь, что параметры были добавлены
    this.queryParamsStore.setParams(params.toString());
  
    if (this.navigate) {
      this.navigate(`?${params.toString()}`, { replace: true });
    }
  }
  
}
