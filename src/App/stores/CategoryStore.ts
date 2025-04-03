import { makeAutoObservable, runInAction } from "mobx";
import { getCategories } from "@api";
import { CategoryEntity } from "@types";

class CategoryStore {
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

  async fetchCategories() {
    runInAction(() => {
      this._isLoading = true;
    });
    try {
      const data = await getCategories();
      runInAction(() => {
        this._categories = data;
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
