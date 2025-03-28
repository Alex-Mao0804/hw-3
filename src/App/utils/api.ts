import api from "./axiosInstance";
import { CategoryEntity, ProductEntity } from "./types";
import { API_ROUTES } from "./apiRoutes";

export const getProducts = async (
  page?: number,
  limit?: number,
): Promise<ProductEntity[]> => {
  try {
    let url = API_ROUTES.PRODUCTS;
    if (page && limit) {
      const offset = (page - 1) * limit;
      url += `?offset=${offset}&limit=${limit}`;
    }
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
