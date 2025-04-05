import { useLocation } from 'react-router';

import rootStore from '../instance';
import { useEffect } from 'react';
import { runInAction } from 'mobx';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  useEffect(() => {
    rootStore.query.setSearch(search);
    runInAction(() => {
      console.log(rootStore.query.getParams());

    })
        
  }, [search]);
};
