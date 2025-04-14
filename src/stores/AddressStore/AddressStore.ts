import { makeAutoObservable, reaction, runInAction } from "mobx";
import { getCategories } from "@/api/handlers/directionCategory/details";
import { ILocalStore } from "@/utils/useLocalStore";
import MultiDropdownStore from "@/stores/MultyDropdownStore";
import { TSuggestionApi } from "@/api/type/directionProduct/list";
import { getDadataAddressApi } from "@/api/handlers/dadata/details";

export default class AddressStore implements ILocalStore {
  private _addressList: TSuggestionApi = { suggestions: [] };
  private _isLoading: boolean = false;
  private _multiDropdownStore: MultiDropdownStore;
  private _searchTimeout: NodeJS.Timeout | null = null;

  constructor () {
    makeAutoObservable(this);
    this._multiDropdownStore = new MultiDropdownStore();

    reaction(
      () => this._multiDropdownStore.search,
      (value) => {     
        if (this._searchTimeout) {
          clearTimeout(this._searchTimeout);
        }

        if (value.length < 3) {
          runInAction(() => {
            this._multiDropdownStore.setOptions([]); // очищаем, если мало символов
          });
          return;
        }

        this._searchTimeout = setTimeout(() => {
          this.fetchAddressList();
        }, 400); // задержка в 400 мс
      },
    );   
  }


  get multiDropdownStore() {
    return this._multiDropdownStore;
  }
  get isLoading() {
    return this._isLoading;
  }

  resetMultiDropdownValue() {
    this._multiDropdownStore.resetValue();
  }

  async fetchAddressList() {
    this._isLoading = true;
    try {
      const data = await getDadataAddressApi(this._multiDropdownStore.search);
      runInAction(() => {
        const options = data.suggestions.map((address, index) => ({
          key: address.id ?? `${address.value}-${index}`,
          value: address.value,
        }));
        this._multiDropdownStore.setOptions(options);
      });
    } catch (error) {
      console.error("Ошибка загрузки адреса:", error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }


  destroy() {
    this._multiDropdownStore.destroy();
    this._addressList = { suggestions: [] };
    this._isLoading = false;
  }
}
