const ROUTES = {
  CATALOG: "/",
  PRODUCT: (id: string) => `/${id}`,
  CART: "/cart",
  USER: "/user",
  AUTH: "/auth",
};

export default ROUTES;
