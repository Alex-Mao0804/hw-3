import { makeAutoObservable, reaction } from "mobx";
import {  OptionEntity } from "@/utils/types";
import { ILocalStore } from "@/utils/useLocalStore";

export default class MultyDropdownStore implements ILocalStore {
  private _value: OptionEntity | null = null;
  private _options: OptionEntity[] = [];
  private _isLoading: boolean = false;
  private _search: string = "";

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this._search,
      (search) => {
        if (search.length === 0) {
          this._options = [];
          this._value = null;
        }
      },
    );
  }

  get isLoading() {
    return this._isLoading;
  }

  get search() {
    return this._search;
  }

  onSearchInput(search: string) {
    this._search = search;
  }


  get options() {
    return this._options;
  }

  get value() {
    return this._value;
  }


  getTitle(value: OptionEntity | OptionEntity[] | null, emptyValue = "Выберите категорию") {
    if (Array.isArray(value)) {
      return value.map((option) => option.value).join(", ");
    } else if (value) {      
      return value.value;
    } else {    
      return emptyValue;
    }
  }

  resetValue() {
    this._value = null;
  }

  setValueString(value: string) {
    this.setValue({ key: value, value: value });
  }

  setValue(value: OptionEntity | OptionEntity[] | null) {
    if (Array.isArray(value)) {
      this._value = value[0] || null;
      this._search = "";
    } else {
      this._value = value;
    }
  }

  setOptions(options: OptionEntity[]) {
    this._options = options;
  }

  destroy() {
    this._value = null;
    this._options = [];
    this._isLoading = false;
  }
}
