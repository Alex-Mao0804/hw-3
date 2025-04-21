import { observer } from "mobx-react-lite";
import MultiDropdown from "@/components/MultiDropdown";
import { OptionEntity } from "@/utils/types";
import { extractOptionKey } from "@/utils/extractOption";
import styles from "./CategoryFilter.module.scss";
import { runInAction, toJS } from "mobx";
import { useCallback } from "react";
import { CategoryStore, FilterStore } from "@stores";

type ICategoryFilter = {
  categoryStore: CategoryStore;
  filterStore: FilterStore;
};

const CategoryFilter: React.FC<ICategoryFilter> = observer(
  ({ categoryStore, filterStore }) => {
    const { multiDropdownStore } = categoryStore;

    const handleMultiDropdownChange = useCallback(
      (value: OptionEntity | OptionEntity[] | null) => {
        runInAction(() => {
          const selectedId = extractOptionKey(value);
          if (selectedId === Number(filterStore.filtersState.categoryId)) {
            categoryStore.resetCategoryMultiDropdownValue();
          } else {
            multiDropdownStore.setValue(value);
            filterStore.updateAndSync({ categoryId: selectedId, page: 1 });
          }
        });
      },
      [filterStore, categoryStore, multiDropdownStore],
    );

    return (
      <MultiDropdown
        className={styles.categoryFilter__dropdown}
        options={toJS(multiDropdownStore.options)}
        value={toJS(multiDropdownStore.value)}
        onChange={handleMultiDropdownChange}
        isMulti={false}
        getTitle={(value) =>
          multiDropdownStore.getTitle(value, "Choose category")
        }
      />
    );
  },
);

export default CategoryFilter;
