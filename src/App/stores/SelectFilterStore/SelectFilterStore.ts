import { action, makeAutoObservable } from 'mobx';
import QueryParamsStore from '@stores/RootStore/QueryParamsStore';

export default class SelectFilterStore {
  value: string = '';

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);
    this.syncWithQueryParams(); // синхронизация с глобальными параметрами при инициализации
  }

  setValue(value: string) {
    this.value = value;
    this.queryParamsStore.setParam('select', value); // обновляем параметры в глобальном сторе
  }

  syncWithQueryParams() {
    const select = this.queryParamsStore.getParam('select');

    // Проверяем, если параметр select — это строка, то устанавливаем его как значение
    if (typeof select === 'string') {
      this.value = select;
    } else {
      this.value = ''; // если параметр отсутствует или не строка, сбрасываем значение
    }
  }
}
