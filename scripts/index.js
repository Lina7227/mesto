const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');

const editButton = profileInfo.querySelector('.profile__edit-button');

const popupEditElement = document.querySelector('.popup_edit_element'); // попап добавления картинок
const popupEditProfile = document.querySelector('.popup_edit_profile'); 
const btnCloseElement = popupEditElement.querySelector('.popup__close_element');

const closeButton = popupEditProfile.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const elementsTable = document.querySelector('.elements__table');
const imgElementTemplate = document.querySelector('.element-template');

const formElement = document.querySelector('.form_profile');
const formImgElement = document.querySelector('.form_img'); // находим форму попапа редактировнаия картинок

const nameInput = formElement.querySelector('.form__item_input_name');
const jobInput = formElement.querySelector('.form__item_input_job');

const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup_image');
const btnCloseImage = popupImgView.querySelector('.popup__close_image');
const imgPopup = popupImgView.querySelector('.popup__image');
const titlePopup = popupImgView.querySelector('.popup__title');


const initialCards = [
  {
    name: 'Балтийское море',
    link: 'https://images.unsplash.com/photo-1589876876491-df78ff60e196?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80.jpg'
  },
  {
    name: 'Мыс Фиолент',
    link: 'https://images.unsplash.com/photo-1591528848788-ffdfd2d40309?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80.jpg'
  },
  {
    name: 'Уральские горы',
    link: 'https://images.unsplash.com/photo-1566221880968-ad3da1d5fe84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80.jpg'
  },
  {
    name: 'Пермский край',
    link: 'https://images.unsplash.com/photo-1601274589050-e05871df86d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1081&q=80.jpg'
  },
  {
    name: 'Ялта',
    link: 'https://images.unsplash.com/photo-1564085892527-f072eb172a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80.jpg'
  },
  {
    name: 'Соловецкие острова',
    link: 'https://images.unsplash.com/photo-1615727551941-a8d55481a0b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80.jpg'
  }
];

initialCards.reverse(); 

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

      addElement.querySelector('.element__title').textContent = item.name;
      addElement.querySelector('.element__image').src = item.link;
      addElement.querySelector('.element__image').alt = item.name;
      addElement.querySelector('.element__emotion').addEventListener('click', likeElement);
      addElement.querySelector('.element__remove').addEventListener('click', deleteButton);
      addElement.querySelector('.element__image').addEventListener('click', openPopupImg);
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
}


editButton.addEventListener('click', () => popupToggleProfile(popupEditProfile));
closeButton.addEventListener('click', () => popupToggle(popupEditProfile));

addButton.addEventListener('click', () => popupToggle(popupEditElement));

btnCloseElement.addEventListener('click', () => popupToggle(popupEditElement));
btnCloseImage.addEventListener('click', () => popupToggle(popupImgView))

formElement.addEventListener('submit', submitProfileForm);
formImgElement.addEventListener("submit", addNewCardImg);

