export type TFiltersState = Partial<{
  title: string | null;
  categoryId: number | null;
  page: number;
  limit: number;
  price_min: number | null;
  price_max: number | null;
}>;
