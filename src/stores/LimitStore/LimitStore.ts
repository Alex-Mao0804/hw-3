import { makeAutoObservable, reaction } from "mobx";
import { MultiDropdownStore } from "@stores";
import { ILocalStore } from "@/utils/useLocalStore";
import { LIMIT } from "@/utils/constants";
import { OptionEntity } from "@/utils/types";
import QueryParamsStore from "@/stores/RootStore/QueryParamsStore";

export default class LimitStore implements ILocalStore {
  private _limitValues: OptionEntity[] = LIMIT;
  private _multiDropdownStore = new MultiDropdownStore();
  private _dispose: (() => void) | null = null;

  constructor(private _queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);
    this._multiDropdownStore.setOptions(this._limitValues);
    this.init();
  }

  init() {
    const limit = this._queryParamsStore.getParam("limit");
    if (!limit) {
      this.setLimitValueByKey(LIMIT[0].key);
    }
    this._dispose = reaction(
      () => this.queryParamsStore.getParams(),
      (params) => {
        const lim = params.limit;
        if (lim) {
          this.setLimitValueByKey(lim.toString());
        } else {
          this.setLimitValueByKey(LIMIT[0].key);
        }
      },
    );
  }

  get queryParamsStore() {
    return this._queryParamsStore;
  }

  setLimitValueByKey(key: string) {
    const value = this._limitValues.find((l) => l.key === key) || null;
    this._multiDropdownStore.setValue(value);
  }

  get multiDropdownStore() {
    return this._multiDropdownStore;
  }

  destroy() {
    this._dispose?.();
    this._multiDropdownStore.destroy();
  }
}
