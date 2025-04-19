import {
  getProfileApi,
  postLoginApi,
  postRefreshApi,
} from "@/api/handlers/auth/details";
import {
  postCreateUserApi,
  postUpdateUserApi,
} from "@/api/handlers/users/details";
import { TProfileApi } from "@/api/type/directionAuth/list";
import {
  TCreateUserRequestApi,
  TUpdateUserRequestApi,
} from "@/api/type/directionUsers/list";
import { action, makeAutoObservable, runInAction } from "mobx";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/utils/constants";

export default class UserStore {
  private _token: string | null = null;
  private _refreshToken: string | null = null;
  private _user: TProfileApi | null = null;
  private _loading: boolean = false;
  private _isAuthenticated: boolean = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable<UserStore>(this, {
      registration: action.bound,
      login: action.bound,
      resetError: action.bound,
      logout: action.bound,
      updateProfile: action.bound,
    });

    const token = Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
    const refresh = Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
    if (token && refresh) {
      this._token = token;
      this._refreshToken = refresh;
      this.fetchProfile();
    }
  }

  get token() {
    return this._token;
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return this._isAuthenticated;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  resetError() {
    this._error = null;
  }

  async login(email: string, password: string) {
    this._loading = true;
    this._error = null;
    try {
      const { access_token, refresh_token } = await postLoginApi({
        email,
        password,
      });

      runInAction(() => {
        this._token = access_token;
        this._refreshToken = refresh_token;
        Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
        Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);
        this._loading = false;
        this._isAuthenticated = true;
      });

      await this.fetchProfile();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      runInAction(() => {
        this._error = err?.response?.data?.message || "Login failed";
        this._loading = false;
      });
    }
  }

  async registration({ email, password, name, avatar }: TCreateUserRequestApi) {
    this._loading = true;
    this._error = null;
    try {
      const user = await postCreateUserApi({ email, password, name, avatar });
      runInAction(() => {
        this._user = user;
        this._loading = false;
      });
      await this.login(email, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      runInAction(() => {
        this._error = err?.response?.data?.message || "Registration failed";
        this._loading = false;
      });
    }
  }

  async refreshToken() {
    if (!this._refreshToken) return;

    try {
      const { access_token } = await postRefreshApi({
        refreshToken: this._refreshToken,
      });
      runInAction(() => {
        this._token = access_token;
        Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
      });
    } catch {
      runInAction(() => {
        this.logout();
      });
    }
  }

  async fetchProfile(): Promise<void> {
    this._isAuthenticated = false;
    if (!this._token) return;

    try {
      const user: TProfileApi = await getProfileApi(this._token);
      runInAction(() => {
        this._user = user;
        this._isAuthenticated = true;
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this._isAuthenticated = false;
      if (err?.response?.status === 401) {
        await this.refreshToken();
        return this.fetchProfile();
      }
      runInAction(() => {
        this.logout();
      });
    }
  }

  logout() {
    this._token = null;
    this._refreshToken = null;
    this._user = null;
    Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
    Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
    this._isAuthenticated = false;
  }

  async updateProfile(data: TUpdateUserRequestApi) {
    if (!this._user) return;
    this._loading = true;
    this._error = null;
    try {
      const user = await postUpdateUserApi(this._user.id, data);
      runInAction(() => {
        this._user = user;
        this._loading = false;
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      runInAction(() => {
        this._error = err?.response?.data?.message || "Update failed";
        this._loading = false;
      });
    }
  }
}
