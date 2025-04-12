export type TFiltersApi = Partial<{
  title: string;
  categoryId: number | null;
  page: number;
  limit: number;
  price_min: number | null;
  price_max: number | null;
}>;
