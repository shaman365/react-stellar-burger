import type {
  TOrderRequest,
  TConfiguration,
  TIngredient,
  TUser,
  TReponseToken,
  TOrderData,
  TUserLoginRequest,
  TUserLogoutRequest,
  TUserData,
  TUserInfoRequest,
  TUserUpdateData,
} from "../types/types";

const config: TConfiguration = {
  baseUrl: "https://norma.nomoreparties.space/api/",
  ingredientsPath: "ingredients",
  orderPath: "orders",
  registerPath: "auth/register",
  loginPath: "auth/login",
  logoutPath: "auth/logout",
  refreshTokenPath: "auth/token",
  forgotPath: "password-reset",
  resetPath: "password-reset/reset",
  userPath: "auth/user",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

class Api {
  baseUrl: string;
  ingredientsPath: string;
  orderPath: string;
  registerPath: string;
  loginPath: string;
  logoutPath: string;
  refreshTokenPath: string;
  resetPath: string;
  forgotPath: string;
  userPath: string;
  headers: HeadersInit;

  constructor({
    baseUrl,
    ingredientsPath,
    orderPath,
    registerPath,
    loginPath,
    logoutPath,
    refreshTokenPath,
    forgotPath,
    resetPath,
    userPath,
    headers,
  }: TConfiguration) {
    this.baseUrl = baseUrl;
    this.ingredientsPath = this.baseUrl + ingredientsPath;
    this.orderPath = this.baseUrl + orderPath;
    this.registerPath = this.baseUrl + registerPath;
    this.loginPath = this.baseUrl + loginPath;
    this.logoutPath = this.baseUrl + logoutPath;
    this.refreshTokenPath = this.baseUrl + refreshTokenPath;
    this.resetPath = this.baseUrl + resetPath;
    this.forgotPath = this.baseUrl + forgotPath;
    this.userPath = this.baseUrl + userPath;
    this.headers = headers;
  }

  _request<T>(url: RequestInfo, options?: RequestInit) {
    return fetch(url, options).then(this._getResponseData<T>);
  }

  _getResponseData<T>(response: Response): Promise<T> {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`) as Promise<T>;
    }
    return response.json() as Promise<T>;
  }

  _checkReponse = <T>(response: Response): Promise<T> => {
    return response.ok
      ? (response.json() as Promise<T>)
      : (response.json().then((err) => Promise.reject(err)) as Promise<T>);
  };

  refreshToken = () => {
    return fetch(`${this.refreshTokenPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(this._checkReponse<TReponseToken>);
  };

  _fetchWithRefresh = async <T>(
    url: RequestInfo,
    options: RequestInit
  ): Promise<T> => {
    try {
      const res = await fetch(url, options);
      return await this._checkReponse<T>(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set("Authorization", refreshData.accessToken);

        const res = await fetch(url, options); //повторяем запрос
        return await this._checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  getIngredients() {
    return this._request<TIngredient[]>(`${this.ingredientsPath}`);
  }

  setOrder(ingredients: string[]) {
    return this._request<TOrderData>(`${this.orderPath}`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredients,
      }),
      headers: this._getAuthHeaders(),
    });
  }

  register(userData: TUserData) {
    return this._request<TUserLoginRequest>(`${this.registerPath}`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: this.headers,
    });
  }

  login(userData: TUserData) {
    return this._request<TUserLoginRequest>(`${this.loginPath}`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: this.headers,
    });
  }

  logout() {

    const refreshToken = localStorage.getItem("refreshToken") ?? "Error";

    console.log("logout: refreshToken", refreshToken);
    

    return this._request<TUserLogoutRequest>(`${this.logoutPath}`, {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
      headers: this.headers,
    });
  }

  forgot(emailData: { email: string }) {
    return this._request(`${this.forgotPath}`, {
      method: "POST",
      body: JSON.stringify(emailData),
      headers: this.headers,
    });
  }

  reset(passData: { password: string; token: string }) {
    return this._request(`${this.resetPath}`, {
      method: "POST",
      body: JSON.stringify(passData),
      headers: this.headers,
    });
  }

  getUser() {
    return this._fetchWithRefresh<TUserInfoRequest>(`${this.userPath}`, {
      method: "GET",
      headers: this._getAuthHeaders(),
    });
  }

  updateUser(userData: TUserUpdateData) {
    return this._fetchWithRefresh<TUser>(`${this.userPath}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: this._getAuthHeaders(),
    });
  }

  _getAuthHeaders() {
    const accessToken = localStorage.getItem("accessToken") ?? "Error";
    const authorizationRequestHeaders: HeadersInit = new Headers();
    authorizationRequestHeaders.append("Content-Type", "application/json");
    authorizationRequestHeaders.append("authorization", accessToken);
        
    return authorizationRequestHeaders;
  }

  getOrder(number: string) {
    return this._request<TOrderRequest>(`${this.orderPath}/${number}`);
  }
}

const api = new Api(config);

export default api;
