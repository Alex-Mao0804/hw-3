import QueryParamsStore from '@stores/RootStore/QueryParamsStore';
import FilterStore from '@stores/FilterStore';
import { TFiltersApi } from '@types';
import { runInAction } from 'mobx';
import { NavigateFunction } from 'react-router-dom';

export default class QueryFilterConnector {
  private queryParamsStore: QueryParamsStore;
  private filterStore: FilterStore;
  private navigate: NavigateFunction | null = null;

  constructor(queryParamsStore: QueryParamsStore, filterStore: FilterStore) {
    this.queryParamsStore = queryParamsStore;
    this.filterStore = filterStore;
  }

  // Синхронизация фильтров с параметрами URL
  syncFiltersToQuery(filters: TFiltersApi) {
    runInAction(() => {
      const params: Record<string, any> = {};

      if (filters.title) params.title = filters.title;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.price_min) params.price_min = filters.price_min;
      if (filters.price_max) params.price_max = filters.price_max;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;

      // Обновляем параметры в глобальном хранилище
      this.queryParamsStore.setParams(new URLSearchParams(params).toString());

      // Если есть доступный navigate, обновляем URL
      if (this.navigate) {
        this.navigate(`?${new URLSearchParams(params).toString()}`);
      }
    });
  }

  // Устанавливаем функцию для навигации, если нужно обновить URL
  setNavigator(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  // Синхронизация глобальных параметров с фильтрами
  // syncParamsToFilters() {
  //   // Сначала убедитесь, что обращение к данным происходит внутри реактивного контекста
  //   const params = this.queryParamsStore.getParams(); 
  
  //   // Обновление состояния через runInAction, чтобы MobX мог отслеживать изменения
  //   runInAction(() => {
  //     const filters: TFiltersApi = {};
  //     console.log(`syncParamsToFilters`, params);
      
  //     if (params.title) filters.title = String(params.title);
  //     if (params.categoryId) filters.categoryId = Number(params.categoryId);
  //     if (params.price_min) filters.price_min = Number(params.price_min);
  //     if (params.price_max) filters.price_max = Number(params.price_max);
  //     if (params.page) filters.page = Number(params.page);
  //     if (params.limit) filters.limit = Number(params.limit);
  
  //     // Обновляем локальные фильтры
  //     this.filterStore.updateAndSync(filters);
  //   });
  // }
}
