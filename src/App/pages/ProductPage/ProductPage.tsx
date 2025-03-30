import { useEffect } from "react";
import styles from "./ProductPage.module.scss";
import ArrowPaginationIcon from "@components/icons/ArrowPaginationIcon";
import Text from "@components/Text";
import ProductItem from "./components/ProductItem";
import { ProductEntity } from "@types";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getRelatedProducts } from "@api";
import RelatedItems from "./components/RelatedItems";
import SkeletonProductItem from "./components/ProductItem/SkeletonProductItem";
import { useFetchData } from "@/App/hooks/useFetchData";
import PreviewSwiper from "@/App/components/PreviewSwiper/PreviewSwiper";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: product,
    loading: loadingItem,
    fetchData: fetchProduct,
  } = useFetchData<ProductEntity, [string]>(getProduct);
  const {
    data: relatedProducts,
    loading: loadingRelatedItem,
    fetchData: fetchRelatedProducts,
  } = useFetchData<ProductEntity[], [string]>(getRelatedProducts);
  useEffect(() => {
    if (!id) {
      return;
    }

    fetchRelatedProducts(id);
    fetchProduct(id);
  }, [fetchRelatedProducts, fetchProduct, id]);
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
          relatedProducts={relatedProducts || []}
        />
        <div className={styles.content__related}></div>
      </div>
    </div>
  );
};

export default ProductPage;
