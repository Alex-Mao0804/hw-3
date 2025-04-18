import { makeAutoObservable, reaction, runInAction } from "mobx";
import { CategoryEntity, OptionEntity } from "@/utils/types";
import ProductStore from "@/stores/ProductStore";
import { getCategories } from "@/api/handlers/directionCategory/details";
import { ILocalStore } from "@/utils/useLocalStore";
import rootStore from "@/stores/RootStore";

export default class CategoryStore implements ILocalStore {
  private _categoryMultiDropdownValue: OptionEntity | null = null;
  private _categoriesMultiDropdown: OptionEntity[] = [];
  private _categories: CategoryEntity[] = [];
  private _isLoading: boolean = false;
  private _productStore: ProductStore;

  constructor(productStore: ProductStore) {
    makeAutoObservable(this);
    this._productStore = productStore;

    reaction(
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

  resetCategoryMultiDropdownValue() {
    this._productStore.filters.filtersState.categoryId = null;
    this._categoryMultiDropdownValue = null;
    this._productStore.filters.updateAndSync({
      categoryId: null,
      page: 1,
    });
  }

  setCategoryMultiDropdownValue(value: OptionEntity | OptionEntity[] | null) {
    if (Array.isArray(value)) {
      this._categoryMultiDropdownValue = value[0] || null;
    } else {
      this._categoryMultiDropdownValue = value;
    }
  }

  async fetchCategories() {
    this._isLoading = true;
    try {
      const data = await getCategories();
      runInAction(() => {
        this._categories = data;
        this._categoriesMultiDropdown = data.map((category) => ({
          key: String(category.id),
          value: category.name,
        }));
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
    this._categoryMultiDropdownValue = null;
    this._categoriesMultiDropdown = [];
    this._categories = [];
    this._isLoading = false;
  }
}
