import Text from "@/components/Text";
import styles from "./RelatedItems.module.scss";
import { ProductEntity } from "@/utils/types";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "@/components/Card/SkeletonCard";
import ROUTES from "@routes";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import rootStore from "@/stores/RootStore/RootStore";

type RelatedItemsProps = {
  related: {
    relatedProducts: ProductEntity[] | null;
    loading: boolean;
  };
};

const RelatedItems: React.FC<RelatedItemsProps> = ({
  related: { relatedProducts, loading },
}) => {
  const navigate = useNavigate();
  if (!relatedProducts || loading) {
    return (
      <div className={styles.related_items}>
        <Text view="title" weight="bold">
          Related Items
        </Text>
        <ul className={styles.related_items__list}>
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <SkeletonCard />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const handleClickCard = (id: number) => {
    navigate(ROUTES.PRODUCT(String(id)), { replace: true });
  };
  return (
    <div className={styles.related_items}>
      <Text view="title" weight="bold">
        Related Items
      </Text>
      <ul className={styles.related_items__list}>
        {relatedProducts.map((product: ProductEntity) => (
          <li key={product.id}>
            <Card
              className={styles.catalog_products__card}
              image={product.images[0]}
              title={product.title}
              subtitle={product.description}
              captionSlot={product.category.name}
              onClick={() => runInAction(() => handleClickCard(product.id))}
              contentSlot={`$${product.price}`}
              actionSlot={
                <Button
                  className={styles.catalog_products__card__button}
                  disabled={false}
                  loading={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    rootStore.cart.addProduct(product)                                       
                  }}
                >
                  Add to cart
                </Button>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ObservedRelatedItems = observer(RelatedItems);
export default ObservedRelatedItems;
