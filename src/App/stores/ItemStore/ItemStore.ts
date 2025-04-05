import { makeAutoObservable, runInAction } from "mobx";
import { getProduct, getRelatedProducts } from "@api";
import { ProductEntity } from "@types";

class ItemStore {
  private _item: {
    product: ProductEntity | null;
    loading: boolean;
  } = {
    product: null,
    loading: false,
  };

  private _related: {
    relatedProducts: ProductEntity[] | null;
    loading: boolean;
  } = {
    relatedProducts: null,
    loading: false,
  };

  constructor() {
    makeAutoObservable(this);
    this.fetchItem = this.fetchItem.bind(this);
    this.fetchRelatedProducts = this.fetchRelatedProducts.bind(this);
    this.fetchItemAndRelated = this.fetchItemAndRelated.bind(this);
  }

  get item() {
    return this._item;
  }

  get related() {
    return this._related;
  }

  async fetchItem(id: string) {
    this._item.loading = true;

    try {
      const product = await getProduct(id);
      runInAction(() => {
        this._item.product = product;
        this._item.loading = false;
      });
    } catch (error) {
      console.error("Ошибка загрузки товара:", error);
      runInAction(() => {
        this._item.loading = false;
      });
    }
  }

  async fetchRelatedProducts(id: string) {
    this._related.loading = true;

    try {
      const related = await getRelatedProducts(id);
      runInAction(() => {
        this._related.relatedProducts = related;
        this._related.loading = false;
      });
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
      runInAction(() => {
        this._related.loading = false;
      });
    }
  }

  async fetchItemAndRelated(id: string) {
    await this.fetchItem(id);
    await this.fetchRelatedProducts(id);
  }

  destroy() {
    runInAction(() => {
      this._item = { product: null, loading: false };
      this._related = { relatedProducts: null, loading: false };
    });
  }
}

export default ItemStore;
