import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import "@styles/main.scss";
import CatalogPage from "@/pages/CatalogPage";
import Header from "@/components/Header";
import ProductPage from "@/pages/ProductPage";
import ROUTES from "@/utils/routes";
import ScrollToTop from "@/components/ScrollToTop";
import { useQueryParamsStoreInit } from "@/stores/RootStore/hooks/useQueryParamsStoreInit";
import CartPage from "@pages/CartPage";
import useCartNotifications from "@hooks/useCartNotifications";
import rootStore from "./stores/RootStore";
import { observer } from "mobx-react-lite";
import AuthnPage from "./pages/AuthnPage";
import ProtectedRoute from "@components/protected-route/ProtectedRoute";
import UserPage from "./pages/UserPage";

const App = () => {
  const { products} = rootStore.cart;
  useQueryParamsStoreInit();
  useCartNotifications(products.length);
  const location = useLocation();
  const background = location.state?.background;
  return (
    <div className={styles.app}>
      <Header />
      <ScrollToTop />
      <Routes location={background || location}>
        <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
        <Route path={ROUTES.PRODUCT(":id")} element={<ProductPage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route
          path={ROUTES.AUTHN}
          element={
            <ProtectedRoute onlyUnAuth>
              <AuthnPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.USER}
          element={<ProtectedRoute>{<UserPage />}</ProtectedRoute>}
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={ROUTES.AUTHN}
            element={
              <ProtectedRoute onlyUnAuth>
                <AuthnPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default observer(App);
