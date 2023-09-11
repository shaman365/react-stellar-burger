const config = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  ingredientsPath: 'ingredients',
  orderPath: 'orders',
  headers: {
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor({ baseUrl, ingredientsPath, orderPath, headers }) {
    this.baseUrl = baseUrl;
    this.ingredientsPath = this.baseUrl + ingredientsPath;
    this.orderPath = this.baseUrl + orderPath;
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

  getIngredients() {
    return this._request(`${this.ingredientsPath}`)
  }

  setOrder(ingredients) {
    return this._request(`${this.orderPath}`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredients,
      }),
      headers: this.headers
    })
  }
}

const api = new Api(config);

export default api;
