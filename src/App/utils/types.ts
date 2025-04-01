export type ProductEntity = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryEntity;
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export type CategoryEntity = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type OptionMultiDropdown = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};
