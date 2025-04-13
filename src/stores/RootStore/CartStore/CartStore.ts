import { ProductEntity } from "@types";
import { action, computed, makeAutoObservable, makeObservable, observable, reaction, runInAction } from "mobx";


type PrivateFields = "_products";
type ProductEntityWithQuantity = ProductEntity & { quantity: number };
export default class CartStore {
  private _products: ProductEntityWithQuantity[] = [];
  private _contactName: string = "";
  private _contactEmail: string = "";
  private _contactAddress: string = "";

  constructor() {
    makeAutoObservable <CartStore, PrivateFields>(this, {
      _products: observable,
      products: computed,
      totalProducts: computed,
      addProduct: action,
      removeProduct: action,
    });
    reaction(
      () => this.totalProducts,
      total => {
        console.log("Корзина изменилась, всего товаров:", total);
      }
    );
  }

  submitOrder() {
    this.resetCart();
  }
  get products() {
    return this._products;
  }

  get totalProducts() {
    return this.products.length;
  }

  get contactName() {
    return this._contactName;
  }

  get contactEmail() {
    return this._contactEmail;
  }

  get contactAddress() {
    return this._contactAddress;
  }

  setContactName(value: string) {
    this._contactName = value;
  }

  setContactEmail(value: string) {
    this._contactEmail = value;
  }

  setContactAddress(value: string) {
    this._contactAddress = value;
  }

  addProduct(item: ProductEntity) {
    const existingProduct = this._products.find(
      (product) => product.id === item.id
    );
    if (!existingProduct) {
      this._products.push({ ...item, quantity: 1 });
    }
  }

  getProductQuantity = (itemId: number) => {
    const existingProduct = this._products.find(
      (product) => product.id === itemId
    );
    return existingProduct ? existingProduct.quantity : 0;
  };

  setProductQuantity = (itemId: number, quantity: number) => {
    const existingProduct = this._products.find(
      (product) => product.id === itemId
    );
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }
  };

  checkProduct(item: ProductEntity) {
    const existingProduct = this._products.find(
      (product) => product.id === item.id
    );
    if (!existingProduct) {
      return false;
    }
    return true;
  }
  

  removeProduct = (id: number) => {
    this._products = this._products.filter((product) => product.id !== id);
  }
  get totalPrice() {
    return this._products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }

  resetCart() {
    this._products = [];
  }
}
