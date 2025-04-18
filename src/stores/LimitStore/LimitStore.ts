import { IReactionDisposer, makeAutoObservable, reaction } from "mobx";
import ProductStore from "@/stores/ProductStore";
import { ILocalStore } from "@/utils/useLocalStore";
import rootStore from "@/stores/RootStore";
import MultiDropdownStore from "@/stores/MultyDropdownStore";
import { LIMIT } from "@/utils/constants";
import { OptionEntity } from "@/utils/types";

export default class LimitStore implements ILocalStore {
  private _limitValues: OptionEntity[] = LIMIT;
  private _productStore: ProductStore;
  private _multiDropdownStore: MultiDropdownStore;
  private _disposers: IReactionDisposer[] = [];

  constructor(productStore: ProductStore) {
    makeAutoObservable(this);
    this._productStore = productStore;
    this._multiDropdownStore = new MultiDropdownStore();
    this.init();
    this.setupReactions();
  }

  init() {
    this._multiDropdownStore.setOptions(this._limitValues);
    const limit = rootStore.query.getParam("limit");
    if (!limit) {
      this.updateLimit(this._limitValues[0].value);
    }
  }
  private setupReactions() {
    this._disposers.push(
      reaction(
        () => rootStore.query.getParams(),
        (params) => {
          if (Object.keys(params).length === 0) {
            this.updateLimit(this._limitValues[0].value);
          }
        },
      ),
      reaction(
        () => rootStore.query.getParam("limit"),
        (lim) => {
          if (lim) {
            this.updateLimit(lim.toString());
          }
        },
      ),
    );
  }

  private updateLimit(lim: string) {
    const limitSelected = this._limitValues.find((limit) => limit.key === lim);
    const value = limitSelected
      ? { key: limitSelected.key, value: limitSelected.value }
      : null;
    this._multiDropdownStore.setValue(value);
  }

  get multiDropdownStore() {
    return this._multiDropdownStore;
  }
  get limitValues() {
    return this._limitValues;
  }

  resetMultiDropdownValue() {
    this._productStore.filters.filtersState.categoryId = null;
    this._multiDropdownStore.resetValue();
    this._productStore.filters.updateAndSync({
      categoryId: null,
      page: 1,
    });
  }

  destroy() {
    this._disposers.forEach((dispose) => dispose());
    this._multiDropdownStore.destroy();
  }
}
