import styles from "./CatalogProducts.module.scss";
import Card from "@components/Card";
import Text from "@components/Text";
import { ProductEntity } from "@types";
import Button from "@components/Button";
import Loader from "@components/Loader";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "@components/Card/SkeletonCard";
import ROUTES from "@/App/utils/routes";

type CatalogProductsProps = {
  total: number;
  products: ProductEntity[];
  loading: boolean;
  limit: number;
};

const CatalogProducts: React.FC<CatalogProductsProps> = ({
  products,
  loading,
  total,
  limit,
}) => {
  const navigate = useNavigate();

  const handleClickCard = (id: number) => {
    navigate(ROUTES.PRODUCT(String(id)));
  };

  return (
    <div className={styles.catalog_products}>
      <div className={styles.catalog_products__title}>
        <Text
          tag="h2"
          className={styles.catalog_products__title__text}
          weight="bold"
        >
          Total products
        </Text>
        <Text tag="span" view="p-20" weight="bold" color="accent">
          {loading ? <Loader size="s" /> : total}
        </Text>
      </div>
      <ul className={styles.catalog_products__list}>
        {loading &&
          Array.from({ length: limit }).map((_, index) => (
            <li key={index}>
              <SkeletonCard />
            </li>
          ))}
        {!loading &&
          products?.length > 0 &&
          products.map((product: ProductEntity) => (
            <li key={product.id}>
              <Card
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

export default CatalogProducts;
