import api from "./axiosInstance";

export const getProductsTotal = async () => {
  try {
    const response = await api.get("/products");
    return response.data.length;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
};

export const getProductsWithLimit = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  try {
    const response = await api.get(`/products?offset=${offset}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};

export const getRelatedProducts = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}/related`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении связанных товаров:", error);
    throw error;
  }
};
