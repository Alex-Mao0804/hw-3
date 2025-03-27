import  {useEffect, useState } from "react";
import styles from "./CatalogPage.module.scss";
import Text from "../../components/Text";
import Input from "../../components/Input";
import Button from "../../components/Button";
import MultiDropdown from "../../components/MultiDropdown";
import CatalogProducts from "./components/CatalogProducts";
import Pagination from "../../components/Pagination";
import { getCategories, getProductsTotal, getProductsWithLimit } from "../../utils/api";
import { TCategory, TProduct } from "../../utils/types";

const CatalogPage = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ key: string; value: string }[]>([]);
  const dataLimit = 9;

  useEffect(() => {
    getProductsTotal().then((total) => {
      setPageCount(Math.round(total / dataLimit));
      setTotal(total);
    });
    getCategories().then((categories) => {
      setCategories(categories);
    });

  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsWithLimit(page, dataLimit);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, dataLimit]);

  // Преобразуем категории в нужный формат
  const categoriesType = categories.map((category) => ({
    key: String(category.id),
    value: category.name,
  }));

  return (
    <div className={styles.catalog_page}>
      <div className={styles.catalog_page__header}>
        <Text tag="h1" view="title" weight="bold">
          Products
        </Text>
        <Text
          className={styles.catalog_page__header__description}
          tag="p"
          view="p-20"
          weight="normal"
          color="secondary"
        >
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </div>
      <div className={styles.catalog_page__options}>
        <div className={styles.catalog_page__options__search}>
          <Input
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Product name"
          />
          <Button
            className={styles.catalog_page__options__button}
            disabled={false}
            loading={false}
            onClick={() => console.log(searchValue)}
          >
            Find now
          </Button>
        </div>
        <div className={styles.catalog_page__options__filter}>
          <MultiDropdown
            options={categoriesType}
            value={selectedCategories}
            onChange={setSelectedCategories}
            disabled={false}
            getTitle={(values) => values.length === 0 ? 'Выберите категории': values.map(({ value }) => value).join(', ')}
          />
        </div>
      </div>
      <CatalogProducts limit={dataLimit} total={total} products={products} loading={loading} />
      <Pagination pageCount={pageCount} page={page} setPage={setPage} />
    </div>
  );
};

export default CatalogPage;
