const ROUTES = {
  HOME: '/',
  CATALOG: '/',
  PRODUCT: (id: string) => `/${id}`,
  CATEGORIES: '/categories',
  ABOUT: '/about',
  CART: '/cart',
  USER: '/user',
  // LOGIN: '/login',
  // REGISTER: '/register',
  // CHECKOUT: '/checkout',
};

export default ROUTES;