class Api{
    constructor(configure){
        this._url = configure.url;
        this._headers = configure.headers;
    }

    // возврат ответа сервера об ошибке
    onError = (res) => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    } 

    // запрос о получении информации о пользователе
    getInfoUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this.onError)
 
    }
    // сохранение данных пользователя
    setInfoUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${data.name}`,
                about: `${data.about}`,
            })
        })
        .then(this.onError)

    }
    
    // отправка нового аватара
    setAvatarUser(avatar) {
        return fetch(`${this._url}/users/me/${avatar}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatar}`,
            })
        })
        .then(this.onError)
    }

    // запрос на получение карточек
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(this.onError)
            
    }

    // сохранение карточек
    addCards(data){
        return fetch(`${this._url}/cards`, {
          method:'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: `${data.name}`,
            link: `${data.link}`,
          })
        })
        .then(this.onError)

    }

    // удаление карточек
    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this.onError)
            
    }

    // запрос на лайки карточек
    likeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this.onError)
            
    }

    // удаление лайка с карточек
    removeLikeCard(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this.onError)
    }

}

export { Api };