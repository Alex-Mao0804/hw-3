import { ProductEntity } from "@/utils/types";
import { API_ROUTES } from "@/api/config/apiRoutes";
import api from "@/api/config/axiosInstance";
import { TFiltersState } from "@/api/type/product/list";
import * as qs from "qs";

export const getProducts = async (
  filters: TFiltersState,
): Promise<ProductEntity[]> => {
  try {
    const { page, limit, ...rest } = filters;

    const offset = page && limit ? (page - 1) * limit : undefined;

    const queryObject = {
      ...rest,
      limit,
      offset,
    };

    const response = await api.get<ProductEntity[]>(API_ROUTES.PRODUCTS, {
      params: queryObject,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          skipNulls: true,
        }),
    });

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error;
  }
};
