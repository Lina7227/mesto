export default class Card {
    constructor(data, cardSelector){
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
      return cardElement;
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const cardImage = this._element.querySelector('.element__image');   
      
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
      
      return this._element;
    }

    
    // слушатель событий
    _setEventListeners() {

        this._element.querySelector('.element__emotion').addEventListener('click', () => {
            this._likeButtonElement();
          });

        this._element.querySelector('.element__remove').addEventListener('click', () => {
            this._deleteButton();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
          this._cardClickImg(this._name, this._link);
        });


    }

    // функция открытия фото для просмотра
    _cardClickImg() {
      
      const openPopupImg = document.querySelector('.popup_images');
      
      openPopupImg.classList.add('popup_opened');
    
      const imgPopup = document.querySelector('.popup__image');
      imgPopup.src = this._link;
      imgPopup.alt = this._name;
      document.querySelector('.popup__title').textContent = this._name;
    
    }
  

    // функция лайков
    _likeButtonElement() {

        const likeButoon = this._element.querySelector('.element__emotion');
        likeButoon.classList.toggle('element__emotion_active');
    }

        // функция удаления
    _deleteButton() {
        this._element.remove();
        this._element.innerHTML = "";
        
    }

    
}

      
initialCards.forEach((item) => {
// Создадим экземпляр карточки
const card = new Card(item, '.element-template');
// Создаём карточку и возвращаем наружу
const cardElement = card.generateCard();

// Добавляем в DOM
document.querySelector('.elements__table').append(cardElement);

});