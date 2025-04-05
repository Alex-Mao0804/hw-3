import { useMemo } from "react";
import ProductStore from "@stores/ProductStore";

export default function useProductStore() {
  return useMemo(() => new ProductStore(), []);
}
