import { makeAutoObservable } from "mobx";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";

export default class SelectFilterStore {
  value: string = "";

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);
    this.syncWithQueryParams();
  }

  setValue(value: string) {
    this.value = value;
    this.queryParamsStore.setParam("select", value);
  }

  syncWithQueryParams() {
    const select = this.queryParamsStore.getParam("select");

    if (typeof select === "string") {
      this.value = select;
    } else {
      this.value = "";
    }
  }
}
