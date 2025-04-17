import { TProfileApi } from "@/api/type/directionAuth/list";

export type TCreateUserRequestApi = Omit <TProfileApi, 'id' | 'role'>

export type TUserResponseApi = TProfileApi

export type TUpdateUserRequestApi = Partial<TCreateUserRequestApi>

