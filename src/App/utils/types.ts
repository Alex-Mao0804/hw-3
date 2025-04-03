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
  key: string;
  value: string;
};

export type TFiltersApi = {
  title?: string;
  categoryId?: number | undefined | null;
  page?: number;
  limit?: number;
};
