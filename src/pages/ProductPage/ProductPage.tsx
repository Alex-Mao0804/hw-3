import { useEffect } from "react";
import styles from "./ProductPage.module.scss";
import ProductItem from "./components/ProductItem";
import { useParams } from "react-router-dom";
import RelatedItems from "./components/RelatedItems";
import SkeletonProductItem from "./components/ProductItem/SkeletonProductItem";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "@/utils/useLocalStore";
import ItemStore from "@/stores/ItemStore";
import { Text, ButtonBack } from "@components";

const ProductPage = observer(() => {
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
  let content;

  if (loadingItem) {
    content = <SkeletonProductItem />;
  } else if (!product) {
    content = (
      <Text view="p-20" weight="bold">
        {error}
      </Text>
    );
  } else {
    content = <ProductItem product={product} />;
  }

  return (
    <div className={styles.product_page}>
      <ButtonBack />
      <div className={styles.content}>
        {content}
        {related.relatedProducts && related.relatedProducts?.length > 0 ? (
          <RelatedItems related={related} />
        ) : (
          <Text view="p-16" color="secondary">
            Нет похожих товаров
          </Text>
        )}{" "}
        <div className={styles.content__related}></div>
      </div>
    </div>
  );
});

export default ProductPage;
