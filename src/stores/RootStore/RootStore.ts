import CartStore from "./CartStore";
import QueryParamsStore from "./QueryParamsStore";
import UserStore from "./UserStore";

class RootStore {
  readonly query: QueryParamsStore;
  readonly cart: CartStore;
  readonly user: UserStore;

  constructor() {
    this.query = new QueryParamsStore();
    this.user = new UserStore();
    this.cart = new CartStore(this);
  }
}


const rootStore = new RootStore();
export default rootStore;
export { RootStore };

