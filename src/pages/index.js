import { initialCards } from '../uitils/initialCards.js';
import {
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
} from '../uitils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import css from '../pages/index.css';

const popupImg = new PopupWithImage(popupImgView);
popupImg.setEventListeners();

// создание новой карточки
const createCard = (item) => {

  // const card = new Card(item, '.element-template'); 
  const card = new Card({
    data: item,
    handleCardClick: () => {
      
      popupImg.open({data: item});
      
    }
  }, 
  '.element-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// // добавление карточки из массива 
// const defaultCardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     const card = new Card({
//       data: item,
//       handleCardClick: () => {
        
//         popupImg.open({data: item});
//         popupImg.setEventListeners();
        
//       }
//     }, 
//     '.element-template'
//     );
//     const cardElement = card.generateCard();
//     defaultCardList.addItem(cardElement);
//     }
//   },
//   elementsTable
// );
// defaultCardList.renderItems();

//  добавление карточки из массива  
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


//валидация формы добавления фото
const formAddImg = new FormValidator(config, formImgElement);
formAddImg.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(config, formProfileElement);
formEditProfile.enableValidation();


// объект данных о пользователе
const userInfo = new UserInfo({firstname: profileTitle, jobname: profileSubtitle});

// попап формы пользователя
const formProfile = new PopupWithForm({
  popup: popupEditProfile,
  handleFormSubmit: () => {
    handleProfileSubmit();

  }
});
formProfile.setEventListeners();

// попап формы фото
const formCard = new PopupWithForm({
  popup: popupEditElement,
  handleFormSubmit: (item) => {

    const newCard = createCard(item);
    defaultCardList.addCardItem(newCard);
  
    formCard.close();
  }
  
});

formCard.setEventListeners();

// открытие формы добавления фото
const openPopupForm = () => {
  formCard.open();
}


// открытие формы информации о пользователе
const openPopupProfile = () => {
  userInfo.getUserInfo();
  formProfile.open();
}

// сохраняет новые данные о пользователе при закрытии попапа)
const handleProfileSubmit = () => {

  userInfo.setUserInfo(nameInput.value, jobInput.value);
  formProfile.close();
} 



// открытие попапа пользователя
editButton.addEventListener('click', openPopupProfile);

// открытие попапа с формой карточек
addButton.addEventListener('click', openPopupForm);

