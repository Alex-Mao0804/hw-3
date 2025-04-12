import QueryParamsStore from "./QueryParamsStore";

class RootStore {

  readonly query = new QueryParamsStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static query: any;
}

const rootStore = new RootStore();

export default rootStore;
