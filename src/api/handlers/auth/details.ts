import { API_ROUTES } from "@/api/config/apiRoutes";
import api from "@/api/config/axiosInstance";
import {
  TAuthRefreshRequestApi,
  TAuthRequestApi,
  TAuthResponseApi,
  TProfileApi,
} from "@/api/type/directionAuth/list";

export const postLoginApi = async ({
  email,
  password,
}: TAuthRequestApi): Promise<TAuthResponseApi> => {
  const response = await api.post(API_ROUTES.LOGIN, { email, password });
  return response.data;
};

export const getProfileApi = async (
  accessToken: string,
): Promise<TProfileApi> => {
  const response = await api.get(API_ROUTES.PROFILE, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const postRefreshApi = async ({
  refreshToken,
}: TAuthRefreshRequestApi): Promise<TAuthResponseApi> => {
  const response = await api.post(API_ROUTES.REFRESH_TOKEN, { refreshToken });
  return response.data;
};
