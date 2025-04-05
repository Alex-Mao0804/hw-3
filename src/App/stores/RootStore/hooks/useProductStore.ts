import { useMemo } from "react";
import ProductStore from "@/App/stores/ProductStore/ProductStore";

export default function useProductStore() {
  return useMemo(() => new ProductStore(), []);
}
