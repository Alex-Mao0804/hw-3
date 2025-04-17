import { TOrderByEmailResponse, TOrderItem, TOrderResponse } from "@/api/type/directionSendOrder/list";
import { getProduct } from "@/api/handlers/directionProduct/item";
import { ProductEntityWithQuantity } from "@/utils/types";

const LOCAL_STORAGE_KEY = 'mockOrders';

export const mockSendOrder = async (
  email: string,
  address: string,
  items: TOrderItem[]
): Promise<TOrderResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const order: TOrderResponse = {
        id: crypto.randomUUID(), 
        email,
        address,
        datetime: new Date().toISOString(),
        items,
      };

      const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      orders.push(order);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));

      resolve(order);
    }, 2000); 
  });
};


export const mockGetOrdersByEmail = async (email: string): Promise<TOrderByEmailResponse[]> => {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return [];

  const allOrders: TOrderResponse[] = JSON.parse(raw);

  const filteredOrders = allOrders
    .filter(order => order.email === email)
    .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  const enrichedOrders: TOrderByEmailResponse[] = await Promise.all(
    filteredOrders.map(async (order) => {
      const itemsWithNullableProducts = await Promise.all(
        order.items.map(async (item): Promise<ProductEntityWithQuantity | null> => {
          try {
            const product = await getProduct(String(item.id));
            return {
              ...product,
              quantity: item.count,
            };
          } catch (e) {
            console.error(`Не удалось загрузить товар с id ${item.id}`, e);
            return null;
          }
        })
      );

      // Type guard для фильтрации null
      const enrichedItems: ProductEntityWithQuantity[] = itemsWithNullableProducts.filter(
        (item): item is ProductEntityWithQuantity => item !== null
      );

      return {
        ...order,
        items: enrichedItems,
      };
    })
  );

  return enrichedOrders;
};
