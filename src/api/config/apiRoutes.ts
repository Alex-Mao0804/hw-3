export const API_ROUTES = {
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  PRODUCT: (id: string) => `/products/${id}`,
  RELATED_PRODUCTS: (id: string) => `/products/${id}/related`,
};

export const API_DADATA_ROUTES = {
  ADDRESS: "/suggest/address",
};
