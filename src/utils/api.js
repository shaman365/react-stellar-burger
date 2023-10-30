const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  ingredientsPath: 'ingredients',
  orderPath: 'orders',
  registerPath: 'auth/register',
  loginPath: 'auth/login',
  logoutPath: 'auth/logout',
  refreshTokenPath: 'auth/token',
  forgotPath: 'password-reset',
  resetPath: 'password-reset/reset',
  userPath: 'auth/user',  
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
};

class Api {
  constructor({ baseUrl, ingredientsPath, orderPath, registerPath, loginPath, logoutPath,
    refreshTokenPath, forgotPath, resetPath, userPath, headers }) {
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

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
    }).then(this._checkReponse);
  };

  _fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options);
      return await this._checkReponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await this._checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

  getIngredients() {
    return this._request(`${this.ingredientsPath}`)
  }

  setOrder(ingredients) {
    this.addAuthHeader();
    return this._request(`${this.orderPath}`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredients,
      }),
      headers: this.headers
    })
  }

  register(userData) {
    return this._request(`${this.registerPath}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: this.headers
    })
  }

  login(userData) {
    return this._request(`${this.loginPath}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: this.headers
    })
  }

  logout(token) {
    return this._request(`${this.logoutPath}`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
      headers: this.headers
    })
  }

  forgot(emailData) {
    return this._request(`${this.forgotPath}`, {
      method: 'POST',
      body: JSON.stringify(emailData),
      headers: this.headers
    })
  }

  reset(passData) {
    return this._request(`${this.resetPath}`, {
      method: 'POST',
      body: JSON.stringify(passData),
      headers: this.headers
    })
  }

  getUser() {
    this.addAuthHeader();

    return this._fetchWithRefresh(`${this.userPath}`, {
      method: 'GET',
      headers: this.headers
    })
  }

  updateUser(userData) {
    this.addAuthHeader();
    return this._fetchWithRefresh(`${this.userPath}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: this.headers
    })
  }

  addAuthHeader() {
    this.headers.authorization = localStorage.getItem("accessToken");
  }

  getOrder(number) {
    console.log('API getOrder(number): ', number);

    return this._request(`${this.orderPath}/${number}`)
  }
}

const api = new Api(config);

export default api;
