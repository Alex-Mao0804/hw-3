import { observer } from "mobx-react-lite";
import MultiDropdown from "@/components/MultiDropdown"; // твой компонент
import { OptionEntity } from "@/utils/types";
import styles from "./CartMultiDropdown.module.scss";

import { runInAction, toJS } from "mobx";
import { useCallback } from "react";
import AddressStore from "@/stores/AddressStore";
import { extractOptionValue } from "@/utils/extractOption";

type ICartMultiDropdown = {
  addressStore: AddressStore;
};

const CartMultiDropdown: React.FC<ICartMultiDropdown> = observer(
  ({ addressStore }) => {

    const { multiDropdownStore } = addressStore;

    const handleMultiDropdownChange = useCallback(
      (value: OptionEntity | OptionEntity[] | null) => {        
        runInAction(() => {
            const search = extractOptionValue(value);
            multiDropdownStore.setValue(value);
        });
      },
      [addressStore],
    );

    return (
      <MultiDropdown
        className={styles.cartMultiDropdown}
        options={toJS(multiDropdownStore.options)}
        value={toJS(multiDropdownStore.value)}
        onChange={handleMultiDropdownChange}
        isMulti={false}
        getTitle={multiDropdownStore.getTitle}
        onSearchInput={(text) => {
          multiDropdownStore.onSearchInput(text);
        }}
        searchable = {false}
      />
    );
  },
);

export default CartMultiDropdown;
