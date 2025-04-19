import NumberFlow from "@number-flow/react";
import styles from "./RandomDiscount.module.scss";
import Text from "@components/Text";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ProductEntity } from "@/utils/types";

const getRandomDiscount = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type RandomDiscountProps = {
  product: ProductEntity;
  count: number;
  discount: number;
  setDiscount: (discount: number) => void;
};

const RandomDiscount = observer(
  ({ product, count, discount, setDiscount }: RandomDiscountProps) => {
    const MIN_DISCOUNT = 5;
    const MAX_DISCOUNT = 50;

    const totalCost =
      product.price * count - (product.price * count * discount) / 100;

    useEffect(() => {
      setDiscount(getRandomDiscount(MIN_DISCOUNT, MAX_DISCOUNT));
    }, [setDiscount]);

    return (
      <div className={styles.randomDiscount}>
        <Text view="p-20" weight="medium" color="primary">
          {count} x {product.title}
        </Text>
        <Text view="p-20" weight="bold">
          🎉 Your personal discount:
        </Text>
        <Text view="title" weight="bold" color="accent">
          <NumberFlow
            value={discount}
            trend={0}
            format={{ style: "decimal" }}
          />
          %
        </Text>

        <div className={styles.randomDiscount__info}>
          <Text view="p-20" weight="medium" color="primary">
            Total cost: $&nbsp;
            <NumberFlow
              value={totalCost}
              trend={0}
              format={{ style: "decimal" }}
            />
          </Text>
        </div>
      </div>
    );
  },
);

export default RandomDiscount;
