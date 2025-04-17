import {
  getProfileApi,
  postLoginApi,
  postRefreshApi,
} from "@/api/handlers/directionAuth/details";
import { postCreateUserApi, postUpdateUserApi } from "@/api/handlers/directionUsers/details";
import { TProfileApi } from "@/api/type/directionAuth/list";
import { TCreateUserRequestApi, TUpdateUserRequestApi } from "@/api/type/directionUsers/list";
import { RequestStatus } from "@/utils/types";
import { action, makeAutoObservable, runInAction } from "mobx";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "@/utils/constants";
import { RootStore } from "../RootStore";


export default class UserStore {
  private _token: string | null = null;
  private _refreshToken: string | null = null;
  private _user: TProfileApi | null = null;
  private _requestStatus = RequestStatus.Idle;
  private _isAuthChecked: boolean = false;
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
    return this._requestStatus === RequestStatus.Loading;
  }

  get error() {
    return this._error;
  }

  get isAuthChecked() {
    return this._isAuthChecked;
  }

  resetError() {
    this._error = null;
  }

  async login(email: string, password: string) {
    this._requestStatus = RequestStatus.Loading;
    this._error = null;
    this._isAuthChecked = false;
    try {
      const { access_token, refresh_token } = await postLoginApi({ email, password });

      runInAction(() => {
        this._token = access_token;
        this._refreshToken = refresh_token;
        Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, access_token);
        Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refresh_token);
        this._requestStatus = RequestStatus.Success;
        this._isAuthChecked = true;
        this._isAuthenticated = true;
      });

      await this.fetchProfile();
    } catch (err: any) {
      runInAction(() => {
        this._isAuthChecked = true;
        this._error = err?.response?.data?.message || "Login failed";
        this._requestStatus = RequestStatus.Failed;
      });
    } finally {
      runInAction(() => {
        this._requestStatus = RequestStatus.Idle;
      });
    }
  }

  async registration({ email, password, name, avatar }: TCreateUserRequestApi) {
    this._requestStatus = RequestStatus.Loading;
    this._error = null;
    this._isAuthChecked = false;
    try {
      const user = await postCreateUserApi({ email, password, name, avatar });
      runInAction(() => {
        this._user = user;
        this._requestStatus = RequestStatus.Success;
      });
      await this.login(email, password);
    } catch (err: any) {
      runInAction(() => {
        this._error = err?.response?.data?.message || "Registration failed";
        this._requestStatus = RequestStatus.Failed;
      });
    } finally {
      runInAction(() => {
        this._requestStatus = RequestStatus.Idle;
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
    this._isAuthChecked = false;
  }

  async updateProfile(data: TUpdateUserRequestApi) {
    if (!this._user) return;
    this._requestStatus = RequestStatus.Loading;
    this._error = null;
    try {
      const user = await postUpdateUserApi(this._user.id, data);
      runInAction(() => {
        this._user = user;
        this._requestStatus = RequestStatus.Success;
      });
    } catch (err: any) {
      runInAction(() => {
        this._error = err?.response?.data?.message || "Update failed";
        this._requestStatus = RequestStatus.Failed;
      });
    } finally {
      runInAction(() => {
        this._requestStatus = RequestStatus.Idle;
      });
    }
  }
}
