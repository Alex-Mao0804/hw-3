import { observer } from "mobx-react-lite";
import { OptionEntity } from "@/utils/types";
import { extractOptionKey } from "@/utils/extractOption";
import styles from "./LimitFilter.module.scss";
import { toJS } from "mobx";
import { useCallback } from "react";
import { Text, MultiDropdown } from "@components";
import { LimitStore, FilterStore } from "@stores";

type LimitFilterProps = {
  limitStore: LimitStore;
  filterStore: FilterStore;
};

const LimitFilter: React.FC<LimitFilterProps> = observer(
  ({ limitStore, filterStore }) => {
    const { multiDropdownStore } = limitStore;

    const handleMultiDropdownChange = useCallback(
      (value: OptionEntity | OptionEntity[] | null) => {
        const selectedId = extractOptionKey(value);
        multiDropdownStore.setValue(value);
        filterStore.updateAndSync({ limit: selectedId, page: 1 });
      },
      [filterStore, multiDropdownStore],
    );

    return (
      <div className={styles.limitFilter}>
        <Text
          className={styles.limitFilter__title}
          view="p-14"
          weight="medium"
          color="accent"
        >
          Limit
        </Text>
        <MultiDropdown
          className={styles.limitFilter__dropdown}
          options={toJS(multiDropdownStore.options)}
          value={toJS(multiDropdownStore.value)}
          onChange={handleMultiDropdownChange}
          isMulti={false}
          getTitle={(value) => multiDropdownStore.getTitle(value, "limit")}
        />
      </div>
    );
  },
);

export default LimitFilter;
