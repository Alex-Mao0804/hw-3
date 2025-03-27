const ROUTES = {
  HOME: "/",
  CATALOG: "/",
  PRODUCT: (id: string) => `/${id}`,
  CATEGORIES: "/categories",
  ABOUT: "/about",
  CART: "/cart",
  USER: "/user",
};

export default ROUTES;
