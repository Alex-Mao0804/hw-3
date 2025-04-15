import { TFiltersApi } from "@/api/type/directionProduct/list";

export const initialFilters: TFiltersApi = {
  title: "",
  categoryId: null,
  page: 1,
  limit: 9,
  price_min: null,
  price_max: null,
};

export const LOCAL_STORAGE_KEYS = {
  CART_ITEMS: "cartItems",
  CART_CONTACTS: "cart_contacts",
};
