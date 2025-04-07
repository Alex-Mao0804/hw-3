export type TFiltersApi = {
  title?: string;
  categoryId?: number | undefined | null;
  page?: number;
  limit?: number;
  price_min?: number | null;
  price_max?: number | null;
};
