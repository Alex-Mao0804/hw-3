import { autorun, makeAutoObservable, runInAction } from "mobx";
import { ILocalStore } from "@/utils/useLocalStore";
import { TOrderByEmailResponse } from "@/api/type/directionSendOrder/list";
import rootStore from "@stores/RootStore";
import { mockGetOrdersByEmail } from "@/api/handlers/order/details";

export default class HistoryOrderStore implements ILocalStore {
  private _isLoading: boolean = false;
  private _orders: TOrderByEmailResponse[] = [];
  private _dispose: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);

    this._dispose = autorun(() => {
      if (rootStore.user.isAuth) {
        this.fetchOrders();
      }
    });
  }
  async fetchOrders() {
    const email = rootStore.user.user?.email;
    if (email) {
      runInAction(() => {
        this._isLoading = true;
      });
      const res = await mockGetOrdersByEmail(email);
      runInAction(() => {
        this._orders = res.map((order) => ({
          ...order,
          items: order.items.map((item) => ({ ...item })),
        }));
        this._isLoading = false;
      });
    }
  }

  get orders() {
    return this._orders;
  }

  get isLoading() {
    return this._isLoading;
  }

  destroy(): void {
    this._dispose?.();
    this._isLoading = false;
    this._orders = [];
  }
}
