class Card {
  constructor({data, handleCardClick, handleDelereCardClick, likeCountOn, likeCountOff}, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._evt = data.evt;
    this._likes = data.likes;
    this.id = data._id;
    this._userId = data.owner._id;
    this._myId = data.currentUser;
    this._likeCountOn = likeCountOn;
    this._likeCountOff = likeCountOff;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleDelereCardClick = handleDelereCardClick;
    
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

      if(this._likeButtonElement()) {
        this._likeButton.classList.add('element__emotion_active');
      } else {
        this._likeButton.classList.remove('element__emotion_active');
      }
    
      this._likeNumber = this._element.querySelector('.element__number');
      this._likeNumber.textContent = this._likes.length;
      this._cardRemoveButton =this._element.querySelector('.element__remove');

      if(this._myId === this._userId) {
        this._cardRemoveButton.classList.add('element__remove_visible');
      } else {
        this._cardRemoveButton.classList.remove('element__remove_visible');
      }

      this._setEventListeners();
      return this._element;
  }

  
  // слушатель событий
  _setEventListeners() {

      this._likeButton.addEventListener('click', () => {
          this._addLike(this);
        });

        this._cardRemoveButton.addEventListener('click', () => {
          this.handleDelereCardClick(this.id);
      });

      this._cardImage.addEventListener('click', () => {
        this.handleCardClick(this._evt);
      });

  }  

  // метод лайков
  _likeButtonElement() {
    return this._likes.some(like => like._id === this._myId);

  }

  _addLike = () => {
    if(this._likeButtonElement()) {
      this._likeCountOff(this.id);
    } else {
      this._likeCountOn(this.id);
    }
  }

  setLikes(dataLikes) {
    this._likes = dataLikes;
    this.like();
  }

  like = (evt) => {
    this._likes = evt.likes;
    this._likeNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__emotion_active');
  }

  // метод удаления карточки
  deleteButton() {
    this._element.remove();
    this._element.innerHTML = null;
      
  }

}

    
export { Card };