import { CategoryEntity } from "@/utils/types";
import { API_ROUTES } from "@/api/config/apiRoutes";
import api from "@/api/config/axiosInstance";

export const getCategories = async (): Promise<CategoryEntity[]> => {
  try {
    const response = await api.get<CategoryEntity[]>(API_ROUTES.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    throw error;
  }
};
