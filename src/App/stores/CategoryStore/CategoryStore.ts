import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "@api";
import { CategoryEntity, OptionEntity } from "@types";
import ProductStore from "@stores/ProductStore";

export default class CategoryStore {
  private _categoryMultiDropdownValue: OptionEntity | null = null;
  private _categoriesMultiDropdown: OptionEntity[] = [];
  private _categories: CategoryEntity[] = [];
  private _isLoading: boolean = false;
  private productStore: ProductStore;

  constructor(productStore: ProductStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  private updateCategoryFromId(categoryId: number) {
    const categorySelected = this.categories.find(
      (cat) => cat.id === categoryId,
    );
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

  getTitleMultiDropdown(value: OptionEntity | OptionEntity[] | null) {
    if (Array.isArray(value)) {
      return value.map((option) => option.value).join(", ");
    } else if (value) {
      return value.value;
    } else {
      return "Выберите категорию";
    }
  }

  setCategoryMultiDropdownValue(value: OptionEntity | OptionEntity[] | null) {
    if (Array.isArray(value)) {
      this._categoryMultiDropdownValue = value[0] || null;
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
        this.updateCategoryFromId(
          Number(this.productStore.filters.filtersState.categoryId),
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

  destroy() {
    this._categoryMultiDropdownValue = null;
    this._categoriesMultiDropdown = [];
    this._categories = [];
    this._isLoading = false;
  }
}
