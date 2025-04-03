import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "@api";
import { CategoryEntity, OptionMultiDropdown } from "@types";

class CategoryStore {
  private _categoriesMultiDropdown: OptionMultiDropdown[] = [];
  private _categoryMultiDropdownValue: OptionMultiDropdown | null = null;
  private _categories: CategoryEntity[] = [];
  private _isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
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

  setCategoryMultiDropdownValue(value: OptionMultiDropdown | null) {
    runInAction(() => {
      this._categoryMultiDropdownValue = value;
    });
  }

  setCategoryMultiDropdownValueId(id: number) {
    runInAction(() => {
      this._categoryMultiDropdownValue =
        this._categoriesMultiDropdown.find(
          (category) => category.key === String(id),
        ) || null;
    });
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
      });
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}

export default new CategoryStore();
