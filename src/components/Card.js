import { initialCards } from './cardArrow.js';
// import { popupToggle, popupImgView} from './index.js';

class Card {
    constructor({data, handleCardClick}, cardSelector){
      this._name = data.name;
      this._link = data.link;
      this._evt = data.evt;
      this._cardSelector = cardSelector;
      this.handleCardClick = handleCardClick;
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
        
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__emotion');   
      
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
      
        this._setEventListeners();
      return this._element;
    }

    
    // слушатель событий
    _setEventListeners() {

        this._likeButton.addEventListener('click', () => {
            this._likeButtonElement();
          });

        this._element.querySelector('.element__remove').addEventListener('click', () => {
            this._deleteButton();
        });

        this._cardImage.addEventListener('click', () => {
          this.handleCardClick(this._evt);
        });


    }  

    // функция лайков
    _likeButtonElement() {
        this._likeButton.classList.toggle('element__emotion_active');
    }

    // функция удаления
    _deleteButton() {
        this._element.remove();
        this._element.innerHTML = null;
        
    }

}

      
export { Card };