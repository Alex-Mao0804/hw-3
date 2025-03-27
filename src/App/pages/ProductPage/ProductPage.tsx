import { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import ArrowPaginationIcon from "@components/icons/ArrowPaginationIcon";
import Text from "@components/Text";
import ProductItem from "./components/ProductItem";
import { TProduct } from "@types";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getRelatedProducts } from "@api";
import RelatedItems from "./components/RelatedItems";
import SkeletonProductItem from "./components/ProductItem/SkeletonProductItem";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingItem, setLoadingItem] = useState(false);
  const [loadingRelatedItem, setLoadingRelatedItem] = useState(false);
  const [product, setProduct] = useState<TProduct>();
  const [relatedProducts, setRelatedProducts] = useState<TProduct[]>();

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchProduct = async () => {
      try {
        setLoadingItem(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setLoadingItem(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        setLoadingRelatedItem(true);
        const data = await getRelatedProducts(id);
        setRelatedProducts(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      } finally {
        setLoadingRelatedItem(false);
      }
    };

    fetchRelatedProducts();
    fetchProduct();
  }, [id]);
  return (
    <div className={styles.product_page}>
      <div className={styles.navigation}>
        <button
          className={styles.navigation__button}
          onClick={() => navigate(-1)}
        >
          <ArrowPaginationIcon className={styles.navigation__icon} />
          <Text view="p-20" color="primary" weight="normal">
            Назад
          </Text>
        </button>
      </div>
      <div className={styles.content}>
        {loadingItem || !product ? (
          <SkeletonProductItem />
        ) : (
          <ProductItem product={product} />
        )}
        <RelatedItems
          loading={loadingRelatedItem}
          relatedProducts={relatedProducts}
        />
        <div className={styles.content__related}></div>
      </div>
    </div>
  );
};

export default ProductPage;
