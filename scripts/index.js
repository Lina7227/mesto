const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');

const editButton = profileInfo.querySelector('.profile__edit-button');

const popupEditElement = document.querySelector('.popup_edit_element'); // попап добавления картинок
const popupEditProfile = document.querySelector('.popup_edit_profile'); 
const btnCloseElement = popupEditElement.querySelector('.popup__close_element');

const closeProfilePopupButton = popupEditProfile.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const elementsTable = document.querySelector('.elements__table');
const imgElementTemplate = document.querySelector('.element-template');

const formProfileElement = document.querySelector('.form_profile');
const formImgElement = document.querySelector('.form_img'); // находим форму попапа редактировнаия картинок

const nameInput = formProfileElement.querySelector('.form__item_input_name');
const jobInput = formProfileElement.querySelector('.form__item_input_job');

const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_image');
const btnCloseImage = popupImgView.querySelector('.popup__close_image');
const imgPopup = popupImgView.querySelector('.popup__image');
const titlePopup = popupImgView.querySelector('.popup__title');
const popups = document.querySelectorAll('.popup');

// функция лайков
function likeElement(evt) {
  evt.target.classList.toggle('element__emotion_active');
}

// функция удаления
function deleteButton(evt){
  evt.target.closest('.element').remove();
}

// функция создания элементов (наполняет содержимым)
function createCard(item){
      const addElement = imgElementTemplate.content.cloneNode(true);
      const elementImage = addElement.querySelector('.element__image');

      addElement.querySelector('.element__title').textContent = item.name;
      elementImage.src = item.link;
      elementImage.alt = item.name;
      addElement.querySelector('.element__emotion').addEventListener('click', likeElement);
      addElement.querySelector('.element__remove').addEventListener('click', deleteButton);
      elementImage.addEventListener('click', openPopupImg);
      return(addElement)

}

// функция добавления карточки 
function addCardImg(initialCards) {
  const newCardImg = initialCards.map(createCard);
  elementsTable.append(...newCardImg);
  
}
addCardImg(initialCards);

// функция открытия фотографии для просмотра 
function openPopupImg (evt) {
  popupToggle(popupImgView);

  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.currentTarget.alt;
  titlePopup.textContent = evt.currentTarget.alt;

}

// функция добавления фото из формы
function addNewCardImg(evt) {
  evt.preventDefault();

  const titleInput = evt.currentTarget.querySelector ('.form__item_input_title').value; 
  const linkInput = evt.currentTarget.querySelector ('.form__item_input_link').value;
  const newInitialCards = createCard ({name: titleInput,link: linkInput});
  
  elementsTable.prepend(newInitialCards);

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
