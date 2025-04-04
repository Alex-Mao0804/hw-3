import { useEffect } from "react";
import styles from "./ProductPage.module.scss";
import ArrowSideIcon from "@components/icons/ArrowSideIcon";
import Text from "@components/Text";
import ProductItem from "./components/ProductItem";
import { useNavigate, useParams } from "react-router-dom";
import RelatedItems from "./components/RelatedItems";
import SkeletonProductItem from "./components/ProductItem/SkeletonProductItem";
import itemStore from "@stores/ItemStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchItemAndRelated, item, related } = itemStore;

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchItemAndRelated(id);

    return () => {
      itemStore.destroy();
    };
  }, [id]);

  const { product, loading: loadingItem } = item;
  const { relatedProducts, loading: loadingRelatedItem } = related;

  return (
    <div className={styles.product_page}>
      <div className={styles.navigation}>
        <button
          className={styles.navigation__button}
          onClick={() => navigate(-1)}
        >
          <ArrowSideIcon className={styles.navigation__icon} />
          <Text view="p-20" color="primary" weight="normal">
            Назад
          </Text>
        </button>
      </div>
      <div className={styles.content}>
        {loadingItem || !product ? (
          <SkeletonProductItem />
        ) : (
          <ProductItem product={toJS(product)} />
        )}
        <RelatedItems
          loading={toJS(loadingRelatedItem)}
          relatedProducts={toJS(relatedProducts) || []}
        />
        <div className={styles.content__related}></div>
      </div>
    </div>
  );
};

export default observer(ProductPage);
