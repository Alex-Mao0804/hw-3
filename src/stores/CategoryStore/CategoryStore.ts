import {
  IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
} from "mobx";
import { CategoryEntity } from "@/utils/types";
import ProductStore from "@/stores/ProductStore";
import { getCategories } from "@/api/handlers/category/details";
import { ILocalStore } from "@/utils/useLocalStore";
import rootStore from "@/stores/RootStore";
import MultiDropdownStore from "@/stores/MultyDropdownStore";

export default class CategoryStore implements ILocalStore {
  private _categories: CategoryEntity[] = [];
  private _isLoading: boolean = false;
  private _productStore: ProductStore;
  private _multiDropdownStore: MultiDropdownStore;
  private _disposer?: IReactionDisposer;

  constructor(productStore: ProductStore) {
    makeAutoObservable(this);
    this._productStore = productStore;
    this._multiDropdownStore = new MultiDropdownStore();

    this._disposer = reaction(
      () => this._categories,
      (categories) => {
        const categoryId = rootStore.query.getParam("categoryId");
        if (categoryId && categories.length > 0) {
          this.updateCategoryFromId(Number(categoryId));
        }
      },
    );
  }

  private updateCategoryFromId(categoryId: number) {
    const categorySelected = this.categories.find(
      (cat) => cat.id === categoryId,
    );
    const value = categorySelected
      ? { key: String(categorySelected.id), value: categorySelected.name }
      : null;
    this._multiDropdownStore.setValue(value);
  }

  get multiDropdownStore() {
    return this._multiDropdownStore;
  }
  get isLoading() {
    return this._isLoading;
  }

  get categories() {
    return this._categories;
  }

  resetCategoryMultiDropdownValue() {
    this._productStore.filters.filtersState.categoryId = null;
    this._multiDropdownStore.resetValue();
    this._productStore.filters.updateAndSync({
      categoryId: null,
      page: 1,
    });
  }

  async fetchCategories() {
    this._isLoading = true;
    try {
      const data = await getCategories();
      runInAction(() => {
        this._categories = data;
        const options = data.map((category) => ({
          key: String(category.id),
          value: category.name,
        }));
        this._multiDropdownStore.setOptions(options);
        this.updateCategoryFromId(
          Number(this._productStore.filters.filtersState.categoryId),
        );
      });
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  init() {
    this.fetchCategories();
  }

  destroy() {
    this._multiDropdownStore.destroy();
    this._disposer?.();
    this._categories = [];
    this._isLoading = false;
  }
}
