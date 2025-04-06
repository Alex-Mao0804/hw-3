import { ProductEntity } from "@types";
import { API_ROUTES } from "@api/config/apiRoutes";
import api from "@api/config/axiosInstance";

export const getProduct = async (id: string): Promise<ProductEntity> => {
  try {
    const response = await api.get<ProductEntity>(API_ROUTES.PRODUCT(id));
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};
