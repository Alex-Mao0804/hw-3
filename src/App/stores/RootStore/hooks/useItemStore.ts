import { useMemo } from "react";
import ItemStore from "@stores/ItemStore";

export default function useItemStore() {
  return useMemo(() => new ItemStore(), []);
}
