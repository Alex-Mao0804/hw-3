import { ProductEntity } from "@/utils/types";
import styles from "./CartList.module.scss";
import Card from "@/components/Card";
import { runInAction } from "mobx";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/utils/routes";
import { observer } from "mobx-react-lite";
import Input from "@/components/Input";

type CartListProps = {
  products: ProductEntity[];
  handleSetProductQuantity: (productId: number, quantity: number) => void;
  handleGetProductQuantity: (productId: number) => number;
  handleRemoveProduct: (productId: number) => void;
};

const CartList = ({ products, handleSetProductQuantity, handleGetProductQuantity, handleRemoveProduct }: CartListProps) => {
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(ROUTES.PRODUCT(productId));
  };


  return (
    <ul className={styles.cart_list}>
      {products.map((product) => (
        <li key={product.id} className={styles.cart_list__item}>
          <Card
            className={styles.card}
            image={product.images[0]}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.category.name}
            onClick={() =>
              runInAction(() => handleProductClick(String(product.id)))
            }
            contentSlot={`$${product.price}`}
            actionSlot={
              <>
                <Input
                  className={styles.card__actions}
                  onClick={(e) => e.stopPropagation()}
                  value={String(handleGetProductQuantity(product.id))}
                  onChange={(e) => {
                    runInAction(() => handleSetProductQuantity(product.id, Number(e)));
                  }}
                  type="number"
                  placeholder="quantity"
                  afterSlot="шт"
                />
                <Button
                  className={styles.card__actions}
                  disabled={false}
                  loading={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    runInAction(() => handleRemoveProduct(product.id) );
                  }}
                >
                  Remove
                </Button>
              </>
            }
          />
        </li>
      ))}
    </ul>
  );
};

const CartListWithObserver = observer(CartList);
export default CartListWithObserver;
