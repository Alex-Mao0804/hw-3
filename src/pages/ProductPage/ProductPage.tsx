import { useEffect } from "react";
import styles from "./ProductPage.module.scss";
import ArrowSideIcon from "@/components/icons/ArrowSideIcon";
import Text from "@/components/Text";
import ProductItem from "./components/ProductItem";
import { useNavigate, useParams } from "react-router-dom";
import RelatedItems from "./components/RelatedItems";
import SkeletonProductItem from "./components/ProductItem/SkeletonProductItem";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "@/utils/useLocalStore";
import ItemStore from "@/stores/ItemStore";

const ProductPage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const itemStore = useLocalStore(() => new ItemStore());

  const { fetchItemAndRelated, item, related } = itemStore;

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchItemAndRelated(id);
  }, [id, fetchItemAndRelated]);

  const { product, loading: loadingItem, error } = item;

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
        {loadingItem ? (
          <SkeletonProductItem />
        ) : !product ? (
          <Text view="p-20" weight="bold">
            {error}
          </Text>
        ) : (
          <ProductItem product={product} />
        )}

        <RelatedItems related={related} />
        <div className={styles.content__related}></div>
      </div>
    </div>
  );
});

export default ProductPage;
