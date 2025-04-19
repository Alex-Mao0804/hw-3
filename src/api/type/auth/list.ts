export type TProfileApi = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

export type TAuthRequestApi = {
  email: string;
  password: string;
};

export type TAuthResponseApi = {
  access_token: string;
  refresh_token: string;
};

export type TAuthRefreshRequestApi = {
  refreshToken: string;
};
