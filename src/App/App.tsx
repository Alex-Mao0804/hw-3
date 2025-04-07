import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import "@styles/main.scss";
import CatalogPage from "@pages/CatalogPage";
import Header from "@components/Header";
import ProductPage from "@pages/ProductPage";
import ROUTES from "@routes";
import ScrollToTop from "@components/ScrollToTop";
import { useQueryParamsStoreInit } from "@stores/RootStore/hooks/useQueryParamsStoreInit";

const App = () => {
  useQueryParamsStoreInit();

  return (
    <div className={styles.app}>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
        <Route path={ROUTES.PRODUCT(":id")} element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default App;
