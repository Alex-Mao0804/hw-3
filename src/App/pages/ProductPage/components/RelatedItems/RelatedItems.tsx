import Text from "@components/Text";
import styles from "./RelatedItems.module.scss";
import { ProductEntity } from "@types";
import Button from "@components/Button";
import Card from "@components/Card";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "@components/Card/SkeletonCard";

type RelatedItemsProps = {
  loading: boolean;
  relatedProducts: ProductEntity[] | undefined;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({
  relatedProducts,
  loading,
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
    navigate(`/${id}`, { replace: true });
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
              onClick={() => handleClickCard(product.id)}
              contentSlot={`$${product.price}`}
              actionSlot={
                <Button
                  className={styles.catalog_products__card__button}
                  disabled={false}
                  loading={false}
                  onClick={() => {
                    console.log("Add to cart button clicked:", product);
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

export default RelatedItems;
