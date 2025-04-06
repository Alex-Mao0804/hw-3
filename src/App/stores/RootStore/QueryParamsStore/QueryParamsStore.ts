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
      });
    }
  
  getParam (key: string) {
    return this._params[key];
  }

  getParams () {
    return this._params;
  }

  setParams (params: string) {
    this.setSearch(params);
  }

}
