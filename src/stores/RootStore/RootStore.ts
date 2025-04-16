import CartStore from "./CartStore";
import QueryParamsStore from "./QueryParamsStore";
import UserStore from "./UserStore";

class RootStore {
  readonly query = new QueryParamsStore();
  readonly cart = new CartStore();
  readonly user = new UserStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static query: any;
  static cart: any;
  static user: any;
}

const rootStore = new RootStore();

export default rootStore;
