import Text from "@/components/Text";
import styles from "./ProductItem.module.scss";
import { ProductEntity } from "@/utils/types";
import Button from "@/components/Button";
import PreviewSwiper from "@/components/PreviewSwiper/PreviewSwiper";
import { observer } from "mobx-react-lite";
import rootStore from "@/stores/RootStore";
import Modal from "@/components/Modal";
import { useState } from "react";
import QuicklyOrder from "@/pages/ProductPage/components/QuicklyOrder";
import clsx from "@libs/clsx";

type ProductItemProps = {
  product: ProductEntity;
};

const ProductItem: React.FC<ProductItemProps> = observer(({ product }) => {
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Button
              onClick={handleSubmitOrder}
              className={styles.product_item__actions__button}
            >
              Buy Now
            </Button>
            <Button
              disabled={rootStore.cart.checkProduct(product)}
              onClick={() => {
                rootStore.cart.addProduct(product);
              }}
              className={styles.product_item__actions__button}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Modal
        className={clsx(styles.modal, styles.modal__quicklyOrder)}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      >
        <div className={styles.modal__content}>
          <QuicklyOrder product={product} />
        </div>
      </Modal>
    </div>
  );
});

export default ProductItem;
