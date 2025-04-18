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

export const COOKIE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};


export const INITIAL_USER_AVATAR = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
