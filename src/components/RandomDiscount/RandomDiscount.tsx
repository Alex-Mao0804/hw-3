import NumberFlow from "@number-flow/react";
import styles from "./RandomDiscount.module.scss";
import Text from "@components/Text";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ProductEntity } from "@/utils/types";


const getRandomDiscount = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type RandomDiscountProps = {
  product: ProductEntity
  count: number
  discount: number
  setDiscount: (discount: number) => void
}


const RandomDiscount = ({ product,  count, discount, setDiscount }: RandomDiscountProps) => {

  const MIN_DISCOUNT = 5;
  const MAX_DISCOUNT = 50;
  
    let totalCost = (product.price * count) - product.price * count * discount / 100;
  
    useEffect(() => {
      setDiscount(getRandomDiscount(MIN_DISCOUNT, MAX_DISCOUNT));
    }, []);
  

  return (
    <div className={styles.randomDiscount}>

    <Text view="p-20" weight="medium" color="primary">
        {count} x {product.title}
        </Text>
      <Text view="p-20" weight="bold">
        🎉 Ваша персональная скидка:
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
        <Text view="p-20" weight="medium" color="primary">Всего на сумму: $&nbsp;
          <NumberFlow
            value={totalCost}
            trend={0}
            format={{ style: "decimal" }}
          />
          
        </Text>
      </div>
    </div>
  );
};

export default observer(RandomDiscount);
