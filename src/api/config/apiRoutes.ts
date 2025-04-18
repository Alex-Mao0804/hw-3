export const API_ROUTES = {
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  PRODUCT: (id: string) => `/products/${id}`,
  RELATED_PRODUCTS: (id: string) => `/products/${id}/related`,
  LOGIN: "/auth/login",
  PROFILE: "/auth/profile",
  REFRESH_TOKEN: "/auth/refresh-token",
  CREATE_USER: "/users",
  UPDATE_USER: (id: number) => `/users/${id}`,
};

export const API_DADATA_ROUTES = {
  ADDRESS: "/suggest/address",
};
