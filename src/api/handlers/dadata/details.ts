import { API_DADATA_ROUTES } from "@/api/config/apiRoutes";
import { apiDadata } from "@/api/config/axiosInstance";
import { TSuggestionApi } from "@/api/type/dadata/list";

export const getDadataAddressApi = async (
  query: string,
): Promise<TSuggestionApi> => {
  const response = await apiDadata.post<TSuggestionApi>(
    API_DADATA_ROUTES.ADDRESS,
    { query },
  );
  return response.data;
};
