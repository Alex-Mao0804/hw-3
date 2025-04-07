import { makeAutoObservable, runInAction } from "mobx";
import { ProductEntity } from "@types";
import { getRelatedProducts } from "@api/handlers/directionProduct/related";
import { getProduct } from "@api/handlers/directionProduct/item";

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

  setItem(item: ProductEntity) {
    this._item.product = item;
  }

  get related() {
    return this._related;
  }

  setRelated(related: ProductEntity[]) {
    this._related.relatedProducts = related;
  }

  async fetchItem(id: string) {
    this._item.loading = true;

    try {
      const product = await getProduct(id);
      this.setItem(product);
    } catch (error) {
      console.error("Ошибка загрузки товара:", error);
    } finally {
      runInAction(() => {
        this._item.loading = false;
      });
    }
  }

  async fetchRelatedProducts(id: string) {
    this._related.loading = true;

    try {
      const related = await getRelatedProducts(id);
      this.setRelated(related);
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
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
    this._item = { product: null, loading: false };
    this._related = { relatedProducts: null, loading: false };
  }
}

export default ItemStore;
