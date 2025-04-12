import { ProductEntity } from "@/utils/types";
import { API_ROUTES } from "@/api/config/apiRoutes";
import api from "@/api/config/axiosInstance";

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
