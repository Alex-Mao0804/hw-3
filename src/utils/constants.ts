import { TFiltersState } from "@/api/type/product/list";
import { OptionEntity } from "@types";

export const initialFilters: TFiltersState = {
  title: null,
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

export const LIMIT: OptionEntity[] = [
  {
    key: "9",
    value: "9",
  },
  {
    key: "18",
    value: "18",
  },
  {
    key: "27",
    value: "27",
  },
];
export const INITIAL_USER_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
