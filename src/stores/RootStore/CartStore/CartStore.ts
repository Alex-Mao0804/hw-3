import { getProduct } from "@/api/handlers/directionProduct/item";
import AddressStore from "@/stores/AddressStore";
import { ProductEntity } from "@types";
import { action, computed, makeAutoObservable, makeObservable, observable, reaction, runInAction, toJS } from "mobx";


type PrivateFields = "_products";
type TProductLocalStorage = {
  id: number;
  quantity: number;
};
type ProductEntityWithQuantity = ProductEntity & { quantity: number };
export default class CartStore {
  private _products: ProductEntityWithQuantity[] = [];
  private _contactName: string = "";
  private _contactEmail: string = "";
  private _contactAddress: string = "";
  private _addressStore: AddressStore;

  constructor() {
    makeAutoObservable <CartStore, PrivateFields>(this, {
      _products: observable,
      products: computed,
      totalProducts: computed,
      addProduct: action,
      removeProduct: action,
    });

    this.init();


    this._addressStore = new AddressStore();
    reaction(
      () => this.totalProducts,
      total => {
        this.saveItemIdToLocalStorage();
        console.log("Корзина изменилась, всего товаров:", total);
      }
    );

    reaction(
      () => this.addressStore.multiDropdownStore.value,
      (search) => {
        this._contactAddress = search?.value ?? "";        
      }
    );
  }

  init () {
    this.loadFromLocalStorage();
  }

  get addressStore() {
    return this._addressStore;
  }

  saveItemIdToLocalStorage() {
    const itemsToSave: TProductLocalStorage[] = this._products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));
    localStorage.setItem("cart_items", JSON.stringify(itemsToSave));
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

  async loadFromLocalStorage() {
    const data = localStorage.getItem("cart_items");
    if (!data) return;
  
    try {
      const items: TProductLocalStorage[] = JSON.parse(data);
      
      const productPromises = items.map(async (item) => {
        try {
          const product = await getProduct(String(item.id));
          return { ...product, quantity: item.quantity } as ProductEntityWithQuantity;
        } catch (error) {
          console.error("Ошибка загрузки товара из localStorage:", error);
          return null;
        }
      });
  
      const products = (await Promise.all(productPromises)).filter(Boolean) as ProductEntityWithQuantity[];
  
      runInAction(() => {
        this._products = products;
      });
  
    } catch (e) {
      console.error("Ошибка при загрузке товаров из localStorage:", e);
    }
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
      this.saveItemIdToLocalStorage(); 
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

    async fetchItem(id: string) {
  
      try {
        const product = await getProduct(id);
        runInAction(() => {
          this.addProduct(product);
        });
      } catch (error) {
      } 
      
    }
}
