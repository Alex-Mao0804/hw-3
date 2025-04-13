import CartStore from "./CartStore";
import QueryParamsStore from "./QueryParamsStore";

class RootStore {
  readonly query = new QueryParamsStore();
  readonly cart = new CartStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static query: any;
  static cart: any;
}

const rootStore = new RootStore();

export default rootStore;
