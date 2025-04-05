import { action, makeObservable, observable, runInAction } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      setParam: action,
      removeParam: action,
    });
  }

    // Установить строку поискового запроса
    setSearch(search: string) {
      search = search.startsWith('?') ? search.slice(1) : search;
      if (this._search !== search) {
        this._search = search;
        this._params = qs.parse(search);
      }
    }
  
    // Установить конкретный параметр
    setParam(key: string, value: any) {
      runInAction(() => {
        this._params[key] = value;
        this.updateSearch();
      });
    }
  
    // Удалить параметр
    removeParam(key: string) {
      runInAction(() => {
        delete this._params[key];
        this.updateSearch();
      });
    }
  
    // Обновить строку запроса
    private updateSearch() {
      const search = qs.stringify(this._params, { addQueryPrefix: true });
      if (this._search !== search) {
        this._search = search;
      }
    }
  
  getParam (key: string) {
    return this._params[key];
  }

  getParams () {
    return this._params;
  }

}
