import { observer } from "mobx-react-lite";
import MultiDropdown from "@/components/MultiDropdown"; // твой компонент
import { OptionEntity } from "@/utils/types";
import { extractOptionKey } from "@/utils/extractOptionKey";
import styles from "./CategoryFilter.module.scss";
import CategoryStore from "@/stores/CategoryStore";
import FilterStore from "@/stores/FilterStore";
import { runInAction, toJS } from "mobx";
import { useCallback } from "react";

type ICategoryFilter = {
  categoryStore: CategoryStore;
  filterStore: FilterStore;
};

const CategoryFilter: React.FC<ICategoryFilter> = observer(
  ({ categoryStore, filterStore }) => {
    const handleMultiDropdownChange = useCallback(
      (value: OptionEntity | OptionEntity[] | null) => {
        runInAction(() => {
          const selectedId = extractOptionKey(value);
          if (selectedId === Number(filterStore.filtersState.categoryId)) {
            categoryStore.resetCategoryMultiDropdownValue();
          } else {
            categoryStore.setCategoryMultiDropdownValue(value);
            filterStore.updateAndSync({ categoryId: selectedId });
          }
        });
      },
      [filterStore, categoryStore],
    );

    return (
      <MultiDropdown
        className={styles.categoryFilter__dropdown}
        options={toJS(categoryStore.categoriesMultiDropdown)}
        value={toJS(categoryStore.categoryMultiDropdownValue)}
        onChange={handleMultiDropdownChange}
        isMulti={false}
        getTitle={categoryStore.getTitleMultiDropdown}
      />
    );
  },
);

export default CategoryFilter;
