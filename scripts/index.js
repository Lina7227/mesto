import { initialCards } from './cardArrow.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');

const editButton = profileInfo.querySelector('.profile__edit-button');

const popupEditElement = document.querySelector('.popup_edit_element'); // попап добавления картинок
const popupEditProfile = document.querySelector('.popup_edit_profile'); 
const btnCloseElement = popupEditElement.querySelector('.popup__close_element');

const closeProfilePopupButton = popupEditProfile.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const elementsTable = document.querySelector('.elements__table');

const formProfileElement = document.querySelector('.form_profile');
const formImgElement = document.querySelector('.form_img'); // находим форму попапа редактировнаия картинок

const nameInput = formProfileElement.querySelector('.form__item_input_name');
const jobInput = formProfileElement.querySelector('.form__item_input_job');

const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_images');

const btnCloseImage = popupImgView.querySelector('.popup__close_image');
const popups = document.querySelectorAll('.popup');
const btnFormImgSubmit = popupEditElement.querySelector('.form__button_add');


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

function createCard(item) {
  const card = new Card(item, '.element-template');
  const cardElement = card.generateCard();
  return cardElement;
}


initialCards.forEach((item) => {
  const element = createCard(item)
  elementsTable.append(element);
  
});

// функция добавления фото из формы
function addNewCardImg(evt) {
  evt.preventDefault();
  const titleInput = evt.currentTarget.querySelector ('.form__item_input_title').value; 
  const linkInput = evt.currentTarget.querySelector ('.form__item_input_link').value;

  const newCard = {name: titleInput,link: linkInput};

  const elementCard =createCard(newCard);
  
  elementsTable.prepend(elementCard);
  
  popupToggle(popupEditElement);
  evt.currentTarget.reset();
  
}

// функция редактирования профиля
function submitProfileForm (evt) {
    evt.preventDefault(); 
  
    const nameValue = nameInput.value; 
    const jobValue = jobInput.value;
 
    profileTitle.textContent = nameValue;
    profileSubtitle.textContent = jobValue;
    popupToggle(popupEditProfile);
}

// функция для открытия попапа редактирования профиля(данные из профиля в момент открытия передаются в поля инпутов)
function popupToggleProfile () {
  popupToggle(popupEditProfile);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formEditProfile.resetValidation();
}

// функция для открытия попапа добавления фото
function popupToggleFormImg () {

  popupToggle(popupEditElement);
  formAddImg.resetValidation();
}

// функция открытия и закрытия попапа
function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener("keydown", closePopupEsc);
  } else {
    document.removeEventListener("keydown", closePopupEsc);
  }
}

// функция закрытия попапа при клике на esc
function closePopupEsc(evt) {
  
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    popupToggle(currentPopup);
  }
}

// // обработчик закрытия попапа при клике на оверлей
// popups.forEach((item) => {
//   item.addEventListener('mousedown', (event) => {
//     if (event.target === event.currentTarget) {
//       popupToggle(event.target);
//     }
//   });
// });

// обработчик закрытия попапа при клике на оверлей
Array.from(popups).forEach(item => {
  item.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      popupToggle(item);
    } if (evt.target.classList.contains('popup__close')) {
      popupToggle(item);
    }
  });
});


editButton.addEventListener('click', () => popupToggleProfile(popupEditProfile));
// closeProfilePopupButton.addEventListener('click', () => popupToggle(popupEditProfile));

addButton.addEventListener('click', () => popupToggleFormImg(popupEditElement));

// btnCloseElement.addEventListener('click', () => popupToggle(popupEditElement));
// btnCloseImage.addEventListener('click', () => popupToggle(popupImgView));

formProfileElement.addEventListener('submit', submitProfileForm);
formImgElement.addEventListener("submit", addNewCardImg);


export {popupToggle, popupImgView};