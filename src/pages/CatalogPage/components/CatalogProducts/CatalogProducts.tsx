import styles from "./CatalogProducts.module.scss";
import { ProductEntity } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "@/components/Card/SkeletonCard";
import ROUTES from "@/utils/routes";
import { observer } from "mobx-react-lite";
import { initialFilters } from "@/utils/constants";
import { runInAction } from "mobx";
import rootStore from "@/stores/RootStore/RootStore";
import { useCallback } from "react";
import { Text, Card, Button, Loader } from "@components";

type CatalogProductsProps = {
  total: number;
  products: ProductEntity[];
  loading: boolean;
  limit?: number;
};

const CatalogProducts: React.FC<CatalogProductsProps> = observer(
  ({ products, loading, total, limit }) => {
    const navigate = useNavigate();

    const count = products.length;
    const handleProductClick = useCallback(
      (productId: string) => {
        navigate(ROUTES.PRODUCT(productId));
      },
      [navigate],
    );
    const handleResetFilters = useCallback(() => {
      navigate(ROUTES.CATALOG);
    }, [navigate]);

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
        {!loading && count === 0 && (
          <div className={styles.catalog_products__empty}>
            <Text tag="h2" view="title" weight="bold">
              No products
            </Text>
            <Button
              className={styles.catalog_products__empty__button}
              disabled={false}
              loading={false}
              onClick={handleResetFilters}
            >
              Reset all filters
            </Button>
          </div>
        )}
        <ul className={styles.catalog_products__list}>
          {loading &&
            Array.from({ length: limit ?? Number(initialFilters.limit) }).map(
              (_, index) => (
                <li key={index}>
                  <SkeletonCard />
                </li>
              ),
            )}
          {!loading &&
            products?.length > 0 &&
            products.map((product: ProductEntity) => (
              <li key={product.id}>
                <Card
                  image={product.images[0]}
                  title={product.title}
                  subtitle={product.description}
                  captionSlot={product.category.name}
                  onClick={() =>
                    runInAction(() => handleProductClick(String(product.id)))
                  }
                  contentSlot={`$${product.price}`}
                  actionSlot={
                    <Button
                      className={styles.catalog_products__card__button}
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

export default CatalogProducts;
