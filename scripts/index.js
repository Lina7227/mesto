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

const formElement = document.querySelector('.form');
const formImgElement = document.querySelector('.form__content_img'); // находим форму попапа редактировнаия картинок

const nameInput = formElement.querySelector('.form__item_input_name');
const jobInput = formElement.querySelector('.form__item_input_job');

const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const popupImgView = document.querySelector('.popup__image_view');
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

function addNewCardImg(evt) {
  evt.preventDefault();

  const titleInput = evt.currentTarget.querySelector ('.form__item_input_title').value; 
  const linkInput = evt.currentTarget.querySelector ('.form__item_input_link').value;
  const newInitialCards = {name: titleInput,link: linkInput}
  
  addCardImg(newInitialCards);
  initialCards.push(newInitialCards);

  popupToggle(popupEditElement);
  evt.currentTarget.reset();
}

function likeElement(evt) {
  evt.target.classList.toggle('element__emotion_active');
}

function deleteButton(evt){
  evt.target.closest('.element').remove();
}

function addCardImg(item){
      const addElement = imgElementTemplate.content.cloneNode(true);

      addElement.querySelector('.element__title').textContent = item.name;
      addElement.querySelector('.element__image').src = item.link;
      addElement.querySelector('.element__emotion').addEventListener('click', likeElement);
      addElement.querySelector('.element__remove').addEventListener('click', deleteButton);
      elementsTable.prepend(addElement);

      const element = elementsTable.querySelector('.element');
      const imageOpen = element.querySelector('.element__image');

  imageOpen.addEventListener('click', function(){
    popupToggle(popupImgView, item)
  } )
}


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value; 
    const jobValue = jobInput.value;
    
    profileTitle.textContent = nameValue;
    profileSubtitle.textContent = jobValue;
    popupToggle(popupEditProfile);
}

initialCards.map(addCardImg);




function popupToggle(popup, item = NaN) {
  popup.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
        titlePopup.textContent = item.name;
        imgPopup.src = item.link;
    } 
}



editButton.addEventListener('click', () => popupToggle(popupEditProfile));
closeButton.addEventListener('click', () => popupToggle(popupEditProfile));

addButton.addEventListener('click', () => popupToggle(popupEditElement));

btnCloseElement.addEventListener('click', () => popupToggle(popupEditElement));
btnCloseImage.addEventListener('click', () => popupToggle(popupImgView))

formElement.addEventListener('submit', formSubmitHandler);
formImgElement.addEventListener("submit", addNewCardImg);

