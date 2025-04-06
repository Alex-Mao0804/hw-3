import { makeAutoObservable } from 'mobx';
import QueryParamsStore from '@stores/RootStore/QueryParamsStore';

export default class TextFilterStore {
  value: string = '';

  constructor(private queryParamsStore: QueryParamsStore) {
    makeAutoObservable(this);
    this.syncWithQueryParams(); // синхронизация с глобальными параметрами при инициализации
  }

  setValue(value: string) {
    this.value = value;
    this.queryParamsStore.setParam('text', value); // обновляем параметры в глобальном сторе
  }

  syncWithQueryParams() {
    const text = this.queryParamsStore.getParam('text');

    // Если текст — это массив или объект, приводим его к строке
    if (Array.isArray(text)) {
      this.value = text.join(','); // или другой способ обработки массива, если нужно
    } else if (typeof text === 'object') {
      this.value = ''; // Можно назначить пустую строку или обработать объект
    } else {
      this.value = text || ''; // Если это строка, просто назначаем её
    }
  }
}
