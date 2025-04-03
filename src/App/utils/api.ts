import api from "./axiosInstance";
import { CategoryEntity, ProductEntity, TFiltersApi } from "@types";
import { API_ROUTES } from "./apiRoutes";

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

export const getCategories = async (): Promise<CategoryEntity[]> => {
  try {
    const response = await api.get<CategoryEntity[]>(API_ROUTES.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<ProductEntity> => {
  try {
    const response = await api.get<ProductEntity>(API_ROUTES.PRODUCT(id));
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};

export const getRelatedProducts = async (
  id: string,
): Promise<ProductEntity[]> => {
  try {
    const response = await api.get<ProductEntity[]>(
      API_ROUTES.RELATED_PRODUCTS(id),
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении связанных товаров:", error);
    throw error;
  }
};
