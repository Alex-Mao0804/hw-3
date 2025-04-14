import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import "@styles/main.scss";
import CatalogPage from "@/pages/CatalogPage";
import Header from "@/components/Header";
import ProductPage from "@/pages/ProductPage";
import ROUTES from "@/utils/routes";
import ScrollToTop from "@/components/ScrollToTop";
import { useQueryParamsStoreInit } from "@/stores/RootStore/hooks/useQueryParamsStoreInit";
import CartPage from "@pages/CartPage";
import  useCartNotifications  from "@hooks/useCartNotifications";
import rootStore from "./stores/RootStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const cartStore = rootStore.cart.products
  useQueryParamsStoreInit();
  useCartNotifications(cartStore.length);
  return (
    <div className={styles.app}>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
        <Route path={ROUTES.PRODUCT(":id")} element={<ProductPage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path={ROUTES.CART} element={<CartPage />} />
      </Routes>
    </div>
  );
};

export default observer(App);
