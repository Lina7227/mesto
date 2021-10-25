import Card from './Card.js';
import {config, FormValidator} from './FormValidator.js';

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


initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.element-template');

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
 
  // Добавляем в DOM
  document.querySelector('.elements__table').append(cardElement);
  
});

//валидация формы добавления фото
const formAddImg = new FormValidator(config, '.popup_images')
formAddImg.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(config, '.popup_edit_element')
formEditProfile.enableValidation();

// функция добавления фото из формы
function addNewCardImg(evt) {
  evt.preventDefault();
  const titleInput = evt.currentTarget.querySelector ('.form__item_input_title').value; 
  const linkInput = evt.currentTarget.querySelector ('.form__item_input_link').value;

  const newCard = new Card({name: titleInput,link: linkInput}, '.element-template');
  
  elementsTable.prepend(newCard.generateCard());

  popupToggle(popupEditElement);
  evt.currentTarget.reset();

  btnFormImgSubmit.setAttribute('disabled', 'disabled');
  btnFormImgSubmit.classList.add('form__button_invalid');
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

// обработчик закрытия попапа при клике на оверлей
popups.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      popupToggle(event.target);
    }
  });
});


// функция закрытия попапа при клике на esc
function closePopupEsc(evt) {
  const currentPopup = document.querySelector(".popup_opened");
  if (evt.key === 'Escape') {
    popupToggle(currentPopup);
  }
}

editButton.addEventListener('click', () => popupToggleProfile(popupEditProfile));
closeProfilePopupButton.addEventListener('click', () => popupToggle(popupEditProfile));

addButton.addEventListener('click', () => popupToggle(popupEditElement));

btnCloseElement.addEventListener('click', () => popupToggle(popupEditElement));
btnCloseImage.addEventListener('click', () => popupToggle(popupImgView));

formProfileElement.addEventListener('submit', submitProfileForm);
formImgElement.addEventListener("submit", addNewCardImg);


export {popupToggle, popupImgView};