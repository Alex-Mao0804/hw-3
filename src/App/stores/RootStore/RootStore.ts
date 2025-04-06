import QueryParamsStore from "./QueryParamsStore";

export default class RootStore {
  readonly query = new QueryParamsStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static query: any;
}
