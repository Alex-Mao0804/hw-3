import { ProductEntity } from "@/utils/types";
import { API_ROUTES } from "@/api/config/apiRoutes";
import api from "@/api/config/axiosInstance";
import { TFiltersApi } from "@/api/type/directionProduct/list";

export const getProducts = async (
  filters: TFiltersApi,
): Promise<ProductEntity[]> => {
  try {
    const params = new URLSearchParams();
    if (filters.page && filters.limit) {
      params.set("offset", ((filters.page - 1) * filters.limit).toString());
      params.set("limit", filters.limit.toString());
    }
    if (filters.title) {
      params.set("title", filters.title);
    }
    if (filters.categoryId) {
      params.set("categoryId", filters.categoryId.toString());
    }
    if (filters.price_max) {
      params.set("price_max", String(filters.price_max));
    }
    if (filters.price_min) {
      params.set("price_min", String(filters.price_min));
    }
    const url = `${API_ROUTES.PRODUCTS}?${params.toString()}`;
    const response = await api.get<ProductEntity[]>(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
};
