const config = {
    baseUrl: 'https://norma.nomoreparties.space/api/',
    ingredientsPath: 'ingredients',
    orderPath: 'order',
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
  
    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  
    getIngredients() {
        return fetch(`${this.ingredientsPath}`)
          .then(res => this._getResponseData(res));
    }

    setOrder(ingredients) {
      return fetch(`${this.orderPath}`, {
        method: 'POST',
        body: JSON.stringify({
          ingredients: `${ingredients}`,
        }),
        headers: this.headers
      })
        .then(res => this._getResponseData(res));
    }
      
  }
  
  const api = new Api(config);
  
  export default api;
  