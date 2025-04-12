import { action, computed, makeAutoObservable, observable, runInAction } from "mobx";
import { ProductEntity } from "@types";
import { getRelatedProducts } from "@api/handlers/directionProduct/related";
import { getProduct } from "@api/handlers/directionProduct/item";
import { ILocalStore } from "@/App/utils/useLocalStore";


type PrivateFields = '_item' | '_related';
class ItemStore implements ILocalStore {
  private _item: {
    error: string | null;
    product: ProductEntity | null;
    loading: boolean;
  } = {
    error: null,
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
    makeAutoObservable<ItemStore, PrivateFields>(this, {
      _item: observable,
      _related: observable,
      setItem: action,
      setRelated: action,
      item: computed,
      fetchItem: action.bound,
      fetchRelatedProducts: action.bound,
      fetchItemAndRelated: action.bound,
      
    });
    

    // this.fetchItem = this.fetchItem.bind(this);
    // this.fetchRelatedProducts = this.fetchRelatedProducts.bind(this);
    // this.fetchItemAndRelated = this.fetchItemAndRelated.bind(this);
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
      runInAction(() => {
        this.setItem(product);
      });
    
    } catch (error) {
      this.setItemError("Ошибка загрузки товара:" + String(error));
    } finally {
      runInAction(() => {
        this._item.loading = false;
      });
    }
  }

  setItemError(error: string) {
    this._item.error = error;
  }

  async fetchRelatedProducts(id: string) {
    this._related.loading = true;

    try {
      const related = await getRelatedProducts(id);
      runInAction(() => {
        this.setRelated(related);
      })
    } catch (error) {
      // console.error("Ошибка загрузки товаров:", error);
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
    this._item.product = null;
    this._item.loading = false;
    this._item.error = null;
  
    this._related.relatedProducts = null;
    this._related.loading = false;
  }
}

export default ItemStore;
