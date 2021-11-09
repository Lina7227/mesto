import { initialCards } from '../components/cardArrow'
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import css from '../pages/index.css';

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');

const editButton = profileInfo.querySelector('.profile__edit-button');

const popupEditElement = document.querySelector('.popup_edit_element'); // попап добавления картинок
const popupEditProfile = document.querySelector('.popup_edit_profile'); 

const addButton = profile.querySelector('.profile__add-button');
const elementsTable = document.querySelector('.elements__table');

const formProfileElement = document.querySelector('.form_profile');
const formImgElement = document.querySelector('.form_img'); // находим форму попапа редактировнаия картинок


const titleInput = formImgElement.querySelector('.form__item_input_title');
const linkTitle = formImgElement.querySelector('.form__item_input_link');

const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_images');


// создание новой карточки
const createCard = (item) => {

  const card = new Card({
    data: item,
    handleCardClick: (evt) => {
      const popupImg = new PopupWithImage(item, popupImgView);
      popupImg.open(evt);
    }
  }, 
  '.element-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// добавление карточки в массив
const newImgCard = () => {

  const addNewCard = {
    name: titleInput.value,
    link: linkTitle.value
  }

  const newCard = createCard(addNewCard);
  elementsTable.prepend(newCard);

  formCard.close();
  
}

// добавление карточки из массива 
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const element = createCard(item);
    defaultCardList.addItem(element);
    }
  },
  elementsTable
);
defaultCardList.renderItems();

const config =
  {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__item_input_invalid'
  }
;

//валидация формы добавления фото
const formAddImg = new FormValidator(config, formImgElement);
formAddImg.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(config, formProfileElement);
formEditProfile.enableValidation();


// объект данных о пользователе
// const userInfoProfile = { firstname: profileTitle, jobname: profileSubtitle};

const userForm = new UserInfo({firstname: profileTitle, jobname: profileSubtitle});

// попап формы пользователя
const formProfile = new PopupWithForm({
  popupSelector: popupEditProfile,
  handleFormSubmit: (evt) => {

    newProfile(evt);
  }
});

// попап формы фото
const formCard = new PopupWithForm({
  popupSelector: popupEditElement,
  handleFormSubmit: (evt) => {

    newImgCard(evt);
  }
  
});

// открытие формы добавления фото
const popupForm = () => {
  formCard.open();
}


// открытие формы информации о пользователе
const popupProfile = () => {
  userForm.getUserInfo();
  formProfile.open();
}

// сохраняет новые данные о пользователе при закрытии попапа)
const newProfile = () => {

  userForm.setUserInfo();
  formProfile.close();
} 



// открытие попапа пользователя
editButton.addEventListener('click', popupProfile);

// открытие попапа с формой карточек
addButton.addEventListener('click', popupForm);

