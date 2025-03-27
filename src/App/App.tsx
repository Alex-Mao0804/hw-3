import { Route, Routes } from "react-router-dom";
import "./App.module.scss";
import "./styles/main.scss";
import CatalogPage from "./pages/CatalogPage";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage";
import ROUTES from "./utils/routes";
const App = () => {
  return (
    <div style={{background: '#fafafa', minHeight: '100vh'}}>
    <Header />
    <Routes>
      <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
      <Route path={ROUTES.PRODUCT(':id')} element={<ProductPage />} />
    </Routes>
    </div>
  );
};

export default App;
