import Text from "@/components/Text";
import styles from "./ProductItem.module.scss";
import { ProductEntity } from "@/utils/types";
import Button from "@/components/Button";
import PreviewSwiper from "@/components/PreviewSwiper/PreviewSwiper";
import { observer } from "mobx-react-lite";

type ProductItemProps = {
  product: ProductEntity;
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className={styles.product_item}>
      <div className={styles.product_item__image}>
        <PreviewSwiper productData={product} />
      </div>
      <div className={styles.product_item__info}>
        <div className={styles.product_item__info__top}>
          <Text view="title" weight="bold">
            {product.title}
          </Text>
          <Text view="p-20" weight="normal" color="secondary">
            {product.description}
          </Text>
        </div>
        <div className={styles.product_item__info__bottom}>
          <Text view="title" weight="bold">
            ${product.price}
          </Text>

          <div className={styles.product_item__actions}>
            <Button className={styles.product_item__actions__button}>
              Buy Now
            </Button>
            <Button className={styles.product_item__actions__button}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ObservedProductItem = observer(ProductItem);
export default ObservedProductItem;
