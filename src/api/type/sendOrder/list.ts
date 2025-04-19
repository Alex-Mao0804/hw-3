import { ProductEntityWithQuantity } from "@/utils/types";

export type TOrderItem = {
  id: number;
  name: string;
  price: number;
  count: number;
};

export type TOrderResponse = {
  id: string;
  email: string;
  address: string;
  datetime: string;
  items: TOrderItem[];
};

export type TOrderByEmailResponse = {
  id: string;
  email: string;
  address: string;
  datetime: string;
  items: ProductEntityWithQuantity[];
};
