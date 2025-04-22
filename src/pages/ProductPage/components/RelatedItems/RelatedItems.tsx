import styles from "./RelatedItems.module.scss";
import { ProductEntity } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "@/components/Card/SkeletonCard";
import ROUTES from "@routes";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import rootStore from "@/stores/RootStore/RootStore";
import { Text, Button, Card } from "@components";

type RelatedItemsProps = {
  related: {
    relatedProducts: ProductEntity[] | null;
    loading: boolean;
  };
};

const RelatedItems: React.FC<RelatedItemsProps> = observer(
  ({ related: { relatedProducts, loading } }) => {
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
                image={product.images[0]}
                title={product.title}
                subtitle={product.description}
                captionSlot={product.category.name}
                onClick={() => runInAction(() => handleClickCard(product.id))}
                contentSlot={`$${product.price}`}
                actionSlot={
                  <Button
                    disabled={rootStore.cart.checkProduct(product)}
                    loading={false}
                    onClick={(e) => {
                      e.stopPropagation();
                      rootStore.cart.addProduct(product);
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
  },
);

export default RelatedItems;
