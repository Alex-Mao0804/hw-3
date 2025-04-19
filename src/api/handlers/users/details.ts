import { API_ROUTES } from "@/api/config/apiRoutes";
import api from "@/api/config/axiosInstance";
import {
  TCreateUserRequestApi,
  TUserResponseApi,
} from "@/api/type/directionUsers/list";

export const postCreateUserApi = async ({
  name,
  email,
  password,
  avatar,
}: TCreateUserRequestApi): Promise<TUserResponseApi> => {
  const response = await api.post(API_ROUTES.CREATE_USER, {
    name,
    email,
    password,
    avatar,
  });
  return response.data;
};

export const postUpdateUserApi = async (
  id: number,
  userData: Partial<{
    name: string;
    email: string;
    password: string;
    avatar: string;
  }>,
): Promise<TUserResponseApi> => {
  const response = await api.put(API_ROUTES.UPDATE_USER(id), userData);
  return response.data;
};
