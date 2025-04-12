import { useLocation } from "react-router";

import rootStore from "@/stores/RootStore";
import { useEffect } from "react";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);
};
