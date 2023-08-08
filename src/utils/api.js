const config = {
    baseUrl: 'https://norma.nomoreparties.space/api/ingredients'
};
  
  class Api {
    constructor({ baseUrl }) {
      this.baseUrl = baseUrl;
    }
  
    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    }
  
    getUserInformation() {
        return fetch(`${this.baseUrl}/users/me`, {
          headers: this.headers
        })
          .then(res => this._getResponseData(res));
      }

    getIngredients() {
        return fetch(`${this.baseUrl}`)
          .then(res => this._getResponseData(res));
      }
  }

  
  const api = new Api(config);
  
  export default api;
  