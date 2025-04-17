import { getProduct } from "@api/handlers/directionProduct/item";
import { mockSendOrder } from "@api/handlers/directionOrder/details";
import AddressStore from "@stores/AddressStore";
import { LOCAL_STORAGE_KEYS } from "@utils/constants";
import { ProductEntity, ProductEntityWithQuantity } from "@types";
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { RootStore } from "@stores/RootStore/RootStore";

type PrivateFields = "_products";
type TProductLocalStorage = {
  id: number;
  quantity: number;
};
export default class CartStore {
  private _products: ProductEntityWithQuantity[] = [];
  private _contactName: string = "";
  private _contactEmail: string = "";
  private _contactAddress: string = "";
  private _addressStore: AddressStore;
  private _loading: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable<CartStore, PrivateFields>(this, {
      _products: observable,
      products: computed,
      totalProducts: computed,
      addProduct: action,
      removeProduct: action,
      addProductsWithQuantities: action.bound,
    });

    this._addressStore = new AddressStore();

    this.init();
    reaction(
      () => [this._contactName, this._contactEmail, this._contactAddress],
      () => {
        this.saveContactsToLocalStorage();
      },
    );

    reaction(
      () => this.totalProducts,
      () => {
        this.saveItemIdToLocalStorage();
      },
    );

    reaction(
      () => this.addressStore.multiDropdownStore.value,
      (search) => {
        this._contactAddress = search?.value ?? "";
      },
    );

    reaction(
      () => rootStore.user.isAuth,
      (isAuth) => {
        if (isAuth) {
          runInAction(() => {
            this._contactName = rootStore.user.user?.name || "";
            this._contactEmail = rootStore.user.user?.email || "";
          });
        }
      },
    );
  }

  init() {
    this.loadFromLocalStorage();
    this.loadContactsFromLocalStorage();
  }

  get loading() {
    return this._loading;
  }

  get addressStore() {
    return this._addressStore;
  }

  saveContactsToLocalStorage() {
    const contacts = {
      name: this._contactName,
      email: this._contactEmail,
      address: this._contactAddress,
    };
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CART_CONTACTS,
      JSON.stringify(contacts),
    );
  }

  saveItemIdToLocalStorage() {
    const itemsToSave: TProductLocalStorage[] = this._products.map(
      (product) => ({
        id: product.id,
        quantity: product.quantity,
      }),
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CART_ITEMS,
      JSON.stringify(itemsToSave),
    );
  }

  submitOrder(): Promise<void> {
    this._loading = true;

    const orderItems = this._products.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.price,
      count: product.quantity,
    }));

    return mockSendOrder(this._contactEmail, this._contactAddress, orderItems)
      .then(() => {
        runInAction(() => {
          this.resetCart();
          this._loading = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this._loading = false;
        });
      });
  }

  submitQuickOrder(
    product: ProductEntity,
    quantity: number,
    discount: number,
  ): Promise<void> {
    this._loading = true;

    const quickOrderItem = {
      id: product.id,
      name: product.title,
      price: product.price * (1 - discount / 100),
      count: quantity,
    };

    return mockSendOrder(this._contactEmail, this._contactAddress, [
      quickOrderItem,
    ])
      .then(() => {
        runInAction(() => {
          this._loading = false;
        });
      })
      .catch((error) => {
        console.error("Ошибка отправки быстрого заказа:", error);
        runInAction(() => {
          this._loading = false;
        });
      });
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
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_ITEMS);
    if (!data) return;

    try {
      const items: TProductLocalStorage[] = JSON.parse(data);

      const productPromises = items.map(async (item) => {
        try {
          const product = await getProduct(String(item.id));
          return {
            ...product,
            quantity: item.quantity,
          } as ProductEntityWithQuantity;
        } catch (error) {
          console.error("Ошибка загрузки товара из localStorage:", error);
          return null;
        }
      });

      const products = (await Promise.all(productPromises)).filter(
        Boolean,
      ) as ProductEntityWithQuantity[];

      runInAction(() => {
        this._products = products;
      });
    } catch (e) {
      console.error("Ошибка при загрузке товаров из localStorage:", e);
    }
  }

  loadContactsFromLocalStorage() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_CONTACTS);
    if (!data) return;

    try {
      const { name, email, address } = JSON.parse(data);
      runInAction(() => {
        this._contactName = name || "";
        this._contactEmail = email || "";
        this._addressStore.multiDropdownStore.setValueString(address || "");
        this._contactAddress = address || "";
      });
    } catch (e) {
      console.error("Ошибка при загрузке контактов из localStorage:", e);
    }
  }

  get totalQuantity() {
    return this._products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
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
      (product) => product.id === item.id,
    );
    if (!existingProduct) {
      this._products.push({ ...item, quantity: 1 });
    }
  }

  getProductQuantity = (itemId: number) => {
    const existingProduct = this._products.find(
      (product) => product.id === itemId,
    );
    return existingProduct ? existingProduct.quantity : 0;
  };

  setProductQuantity = (itemId: number, quantity: number) => {
    const existingProduct = this._products.find(
      (product) => product.id === itemId,
    );
    if (existingProduct) {
      existingProduct.quantity = quantity;
      this.saveItemIdToLocalStorage();
    }
  };

  addProductsWithQuantities(items: ProductEntityWithQuantity[]) {
    items.forEach((item) => {
      const existingProduct = this._products.find(
        (product) => product.id === item.id,
      );
      if (!existingProduct) {
        this._products.push({ ...item });
      } else {
        existingProduct.quantity += item.quantity;
      }
    });
  }

  checkProduct(item: ProductEntity) {
    const existingProduct = this._products.find(
      (product) => product.id === item.id,
    );
    if (!existingProduct) {
      return false;
    }
    return true;
  }

  removeProduct = (id: number) => {
    this._products = this._products.filter((product) => product.id !== id);
  };
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
      console.error("Ошибка загрузки товара:", error);
    }
  }
}
