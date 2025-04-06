import { makeAutoObservable, reaction, runInAction, toJS } from "mobx";
import { getCategories } from "@api";
import { CategoryEntity, OptionMultiDropdown } from "@types";
import ProductStore from "./ProductStore";

export default class CategoryStore {
  private _categoryMultiDropdownValue: OptionMultiDropdown | null = null;
  private _categoriesMultiDropdown: OptionMultiDropdown[] = [];
  private _categories: CategoryEntity[] = [];
  private _isLoading: boolean = false;
  private productStore: ProductStore;

  constructor(productStore: ProductStore) {
    makeAutoObservable(this);
    this.productStore = productStore;

  }

  private updateCategoryFromId(categoryId: number) {
    const categorySelected = this.categories.find((cat) => cat.id === categoryId);    
    this._categoryMultiDropdownValue = categorySelected
      ? { key: String(categorySelected.id), value: categorySelected.name }
      : null;
  }

  get isLoading() {
    return this._isLoading;
  }

  get categories() {
    return this._categories;
  }

  get categoriesMultiDropdown() {
    return this._categoriesMultiDropdown;
  }

  get categoryMultiDropdownValue() {
    return this._categoryMultiDropdownValue;
  }

  getTitleMultiDropdown(value: OptionMultiDropdown | OptionMultiDropdown[] | null) {
    if (Array.isArray(value)) {
      return value.map((option) => option.value).join(", ");
    } else if (value) {
      return value.value;
    } else {
      return "Выберите категорию";
    }
  }

  setCategoryMultiDropdownValue(
    value: OptionMultiDropdown | OptionMultiDropdown[] | null
  ) {
    if (Array.isArray(value)) {
      this._categoryMultiDropdownValue = value[0] || null; // Преобразуем массив в одиночный элемент
    } else {
      this._categoryMultiDropdownValue = value;
    }
  }
  async fetchCategories() {
    runInAction(() => {
      this._isLoading = true;
    });
    try {
      const data = await getCategories();
      runInAction(() => {
        this._categories = data;
        this._categoriesMultiDropdown = data.map((category) => ({
          key: String(category.id),
          value: category.name,
        }));
        this.updateCategoryFromId(Number(this.productStore.filters.filtersState.categoryId));

      });
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  destroy() {
    this._categoryMultiDropdownValue = null;
    this._categoriesMultiDropdown = [];
    this._categories = [];
    this._isLoading = false;
  }
}
