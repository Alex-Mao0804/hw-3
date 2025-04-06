import { makeAutoObservable } from "mobx";
import QueryParamsStore from "@stores/RootStore/QueryParamsStore";

export default class TextFilterStore {
  value: string = "";

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);
    this.syncWithQueryParams();
  }

  setValue(value: string) {
    this.value = value;
    this.queryParamsStore.setParam("text", value);
  }

  syncWithQueryParams() {
    const text = this.queryParamsStore.getParam("text");

    if (Array.isArray(text)) {
      this.value = text.join(",");
    } else if (typeof text === "object") {
      this.value = "";
    } else {
      this.value = text || "";
    }
  }
}
