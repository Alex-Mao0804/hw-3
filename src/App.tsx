import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import "@styles/main.scss";
import { CatalogPage, ProductPage, CartPage, AuthPage, UserPage } from "@pages";
import { Header } from "@/components/shared";
import ROUTES from "@routes";
import { useQueryParamsStoreInit } from "@stores/RootStore/hooks/useQueryParamsStoreInit";
import useCartNotifications from "@hooks/useCartNotifications";
import rootStore from "@stores/RootStore";
import { observer } from "mobx-react-lite";
import { ProtectedRoute, ScrollToTop } from "@components";

const App = () => {
  const { totalQuantity } = rootStore.cart;
  useQueryParamsStoreInit();
  useCartNotifications(totalQuantity);
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
          path={ROUTES.AUTH}
          element={
            <ProtectedRoute onlyUnAuth>
              <AuthPage />
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
            path={ROUTES.AUTH}
            element={
              <ProtectedRoute onlyUnAuth>
                <AuthPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

const AppObserver = observer(App);
export default AppObserver;
