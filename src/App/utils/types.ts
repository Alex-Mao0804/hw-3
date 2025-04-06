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

export type OptionEntity<K = string, V = string> = {
  value: K;
  key: V;
};

export type TFiltersApi = {
  title?: string;
  categoryId?: number | undefined | null;
  page?: number;
  limit?: number;
  price_min?: number | null;
  price_max?: number | null;
};
