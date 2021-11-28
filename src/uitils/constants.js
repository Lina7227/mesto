// валидация
const config =
  {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__item_input_invalid'
  }
;

// профиль
const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const redAvatarButton = profile.querySelector('.profile__avatar-button');
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

// кнопки профиля
const editButton = profileInfo.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileAvatar = profile.querySelector('.profile__avatar');

// попапы и инпуты
const popupAvatar = document.querySelector('.popup_avatar');
const popupRemove = document.querySelector('.popup_remove');
const popupEditElement = document.querySelector('.popup_edit_element');
const popupEditProfile = document.querySelector('.popup_edit_profile'); 
const popupImgView = document.querySelector('.popup_images');
const inputName = popupEditProfile.querySelector('.form__item_input_name');
const inputJob =popupEditProfile.querySelector('.form__item_input_job');

// разметка для карточек
const elementsTable = document.querySelector('.elements__table');

// формы попапов
const formProfileElement = document.querySelector('.form_profile');
const formImgElement = document.querySelector('.form_img');
const formAvatarElement = document.querySelector('.form_avatar');

export {
  config,
  editButton,
  popupEditElement,
  popupEditProfile,
  addButton,
  elementsTable,
  profileTitle,
  profileSubtitle,
  inputName,
  inputJob,
  popupImgView,
  formImgElement,
  formProfileElement,
  profileAvatar,
  popupRemove,
  popupAvatar,
  redAvatarButton,
  formAvatarElement
};