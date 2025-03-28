import api from "./axiosInstance";
import { CategoryEntity, ProductEntity } from "./types";

export const getProducts = async (
  page?: number,
  limit?: number,
): Promise<ProductEntity[]> => {
  try {
    if (page && limit) {
      const offset = (page - 1) * limit;
      const response = await api.get<ProductEntity[]>(
        `/products?offset=${offset}&limit=${limit}`,
      );
      return response.data;
    } else {
      const response = await api.get<ProductEntity[]>("/products");
      return response.data;
    }
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<CategoryEntity[]> => {
  try {
    const response = await api.get<CategoryEntity[]>("/categories");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<ProductEntity> => {
  try {
    const response = await api.get<ProductEntity>(`/products/${id}`);
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
    const response = await api.get<ProductEntity[]>(`/products/${id}/related`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении связанных товаров:", error);
    throw error;
  }
};
