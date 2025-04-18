const ROUTES = {
  CATALOG: "/",
  PRODUCT: (id: string) => `/${id}`,
  CART: "/cart",
  USER: "/user",
  AUTHN: "/authn",
};

export default ROUTES;
