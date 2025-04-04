import {
  makeAutoObservable,
  reaction,
  runInAction,
  IReactionDisposer,
} from "mobx";
import { getCategories } from "@api";
import { CategoryEntity, OptionMultiDropdown } from "@types";
import filterStore from "./FilterStore";

class CategoryStore {
  private _categoryMultiDropdownValue:
    | OptionMultiDropdown
    | OptionMultiDropdown[]
    | null = null;
  private _categoriesMultiDropdown: OptionMultiDropdown[] = [];
  private _categories: CategoryEntity[] = [];
  private _isLoading: boolean = false;

  private reactions: IReactionDisposer[] = [];

  constructor() {
    makeAutoObservable(this);

    this.reactions.push(
      reaction(
        () => this.isLoading,
        (isLoading) => {
          if (!isLoading) {
            this.initializeCategory();
          }
        },
      ),
      reaction(
        () => filterStore.filtersState.categoryId,
        (categoryId) => {
          if (categoryId) {
            this.updateCategoryFromId(categoryId);
          }
        },
      ),
    );

    this.initializeCategory();
  }

  destroy() {
    this.reactions.forEach((dispose) => dispose());
    this.reactions = [];

    runInAction(() => {
      this._categoryMultiDropdownValue = null;
      this._categoriesMultiDropdown = [];
      this._categories = [];
      this._isLoading = false;
    });
  }

  private initializeCategory() {
    const categoryId = filterStore.filtersState.categoryId;
    if (categoryId) {
      this.updateCategoryFromId(categoryId);
    }
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

  getTitleMultiDropdown(
    value: OptionMultiDropdown | OptionMultiDropdown[] | null,
  ) {
    if (Array.isArray(value)) {
      return value.map((option) => option.value).join(", ");
    } else if (value) {
      return value.value;
    } else {
      return "Выберите категорию";
    }
  }

  setCategoryMultiDropdownValue(
    value: OptionMultiDropdown | OptionMultiDropdown[] | null,
  ) {
    this._categoryMultiDropdownValue = value;
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
