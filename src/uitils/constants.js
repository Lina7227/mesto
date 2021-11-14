const config =
  {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__item_input_invalid'
  }
;

const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');

const editButton = profileInfo.querySelector('.profile__edit-button');

const popupEditElement = document.querySelector('.popup_edit_element'); // попап добавления картинок
const popupEditProfile = document.querySelector('.popup_edit_profile'); 

const addButton = profile.querySelector('.profile__add-button');
const elementsTable = document.querySelector('.elements__table');

const formProfileElement = document.querySelector('.form_profile');
const formImgElement = document.querySelector('.form_img'); // находим форму попапа редактировнаия картинок

const nameInput = formProfileElement.querySelector('.form__item_input_name');
const jobInput = formProfileElement.querySelector('.form__item_input_job');
const titleInput = formImgElement.querySelector('.form__item_input_title');
const linkTitle = formImgElement.querySelector('.form__item_input_link');

const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_images');


export {
  config,
  editButton,
  popupEditElement,
  popupEditProfile,
  addButton,
  elementsTable,
  nameInput,
  jobInput,
  titleInput,
  linkTitle,
  profileTitle,
  profileSubtitle,
  popupImgView,
  formImgElement,
  formProfileElement
};