import {
  IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
} from "mobx";
import { CategoryEntity } from "@/utils/types";
import { MultiDropdownStore, FilterStore } from "@stores";
import { getCategories } from "@/api/handlers/category/details";
import { ILocalStore } from "@/utils/useLocalStore";

export default class CategoryStore implements ILocalStore {
  private _categories: CategoryEntity[] = [];
  private _isLoading = false;
  private _multiDropdownStore = new MultiDropdownStore();
  private _disposer: IReactionDisposer | null = null;

  constructor(private _filterStore: FilterStore) {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    this.fetchCategories();
    this._disposer = reaction(
      () => this._filterStore.queryParamsStore.getParams(),
      (params) => {
        const categoryId = params.categoryId;
        if (categoryId && this._categories.length > 0) {
          this.setCategoryById(Number(categoryId));
        } else {
          this._multiDropdownStore.resetValue();
        }
      },
    );
  }

  async fetchCategories() {
    this._isLoading = true;
    try {
      const data = await getCategories();
      runInAction(() => {
        this._categories = data;
        const options = data.map((cat) => ({
          key: String(cat.id),
          value: cat.name,
        }));
        this._multiDropdownStore.setOptions(options);
        const initialCategoryId =
          this._filterStore.queryParamsStore.getParam("categoryId");
        if (initialCategoryId) {
          this.setCategoryById(Number(initialCategoryId));
        }
      });
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }

  setCategoryById(categoryId: number) {
    const category = this._categories.find((c) => c.id === categoryId);
    const value = category
      ? { key: String(category.id), value: category.name }
      : null;
    this._multiDropdownStore.setValue(value);
  }

  resetCategoryMultiDropdownValue() {
    this._filterStore.filtersState.categoryId = null;
    this._multiDropdownStore.resetValue();
    this._filterStore.updateAndSync({
      categoryId: null,
      page: 1,
    });
  }

  get categories() {
    return this._categories;
  }

  get isLoading() {
    return this._isLoading;
  }

  get multiDropdownStore() {
    return this._multiDropdownStore;
  }

  destroy() {
    this._multiDropdownStore.destroy();
    this._disposer?.();
  }
}
