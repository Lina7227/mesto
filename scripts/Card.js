import { initialCards } from './cardArrow.js';
import { popupToggle, popupImgView} from './index.js';

class Card {
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
          this._cardClickImg(this._name, this._link);
        });


    }

    // функция открытия фото для просмотра
    _cardClickImg() {
      
      popupToggle(popupImgView);
    
      const imgPopup = document.querySelector('.popup__image');
      imgPopup.src = this._link;
      imgPopup.alt = this._name;
      document.querySelector('.popup__title').textContent = this._name;
    
    }
  

    // функция лайков
    _likeButtonElement() {

        // const likeButoon = this._element.querySelector('.element__emotion');
        this._likeButton.classList.toggle('element__emotion_active');
    }

        // функция удаления
    _deleteButton() {
        this._element.remove();
        this._element.innerHTML = null;
        
    }

}

      
export { Card };