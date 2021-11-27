import { initialCards } from '../uitils/initialCards.js';
import {
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
} from '../uitils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import css from '../pages/index.css';

const popupImg = new PopupWithImage(popupImgView);
popupImg.setEventListeners();

const popupConfirm = new PopupWithConfirm(popupRemove);
popupConfirm.setEventListeners();

// отправка запросов
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '15dc4595-bdc3-4503-bc80-ce15dbc42c36',
    'Content-Type': 'application/json'
  }
});

let userOwnId = null;


// загрузка запросов 
Promise.all([api.getInfoUserData(), api.getInitialCards()])
  .then(([dataUser, dataCards]) => {
    userOwnId = dataUser._id;

    console.log(dataCards);
    console.log(dataUser);
    // console.log(userOwnId);
    // console.log("-----------------------------");

    // добавлем полученные данные
    userInfo.setUserInfo({
      userName: dataUser.name,
      userJob: dataUser.about
    });

    userInfo.setUserAvatar(dataUser.avatar);

    
    defaultCardList.renderItems(dataCards); 

  })
  .catch((err) => {
    console.log(err);
  })


//  добавление карточек  с сервера
const defaultCardList = new Section({
  renderer: (item) => { 
    const element = createCard(item); 
    defaultCardList.addItem(element); 
    } 
  }, 
  elementsTable 
); 
// создание новой карточки
const createCard = (data) => {

  const card = new Card({
    data: {...data, currentUser: userOwnId},
    
    handleCardClick: () => {
      
      popupImg.open(data);
      
    },
    handleDelereCardClick: (cardId) => {
      popupConfirm.open();
      popupConfirm.setGoSubmit(() => {
        popupConfirm.loadingSubmit(true)
        api.removeCard(cardId)
        .then(() => {
          popupConfirm.close();
          card.deleteButton();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupConfirm.loadingSubmit(false);
        })
      });
    },
    likeCountOn: (cardId) => {
      api.likeCard(cardId)
      .then((res) => {
        card.like(res);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    likeCountOff: (cardId) => {
      api.removeLikeCard(cardId)
      .then((res) => {
        card.like(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  }, 
  '.element-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//валидация формы добавления фото
const formAddImg = new FormValidator(config, formImgElement);
formAddImg.enableValidation();

//валидация формы редактирования профиля
const formEditProfile = new FormValidator(config, formProfileElement);
formEditProfile.enableValidation();


//валидация формы добавления аватарки
const formAddAvatar = new FormValidator(config, formAvatarElement);
formAddAvatar.enableValidation();


// объект данных о пользователе
const userInfo = new UserInfo({
  name: profileTitle,
  job: profileSubtitle,
  avatar: profileAvatar
});

// попап формы пользователя
const formProfile = new PopupWithForm({
  popup: popupEditProfile,
  handleFormSubmit: (data) => {
    
    handleProfileSubmit(data);

  }
});
formProfile.setEventListeners();

// попап формы фото
const formCard = new PopupWithForm({
  popup: popupEditElement,
  handleFormSubmit: (item) => {
    formCard.loadingSubmit(true);
    
    api.addCards(item)
      .then(() => {
        const newCard = createCard(item);
        defaultCardList.addCardItem(newCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formCard.close();
        formCard.loadingSubmit(false);
      })
    
  }
  
});
formCard.setEventListeners();

// попап формы аватара
const formAvatar = new PopupWithForm({
  popup: popupAvatar,
  handleFormSubmit: () => {
    changeAvatar();
  }
});
formAvatar.setEventListeners();

// открытие формы добавления фото
const openPopupForm = () => {
  formAddImg.resetValidation();
  formCard.open();
}


// открытие формы информации о пользователе
const openPopupProfile = () => {
  formEditProfile.resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  inputName.value = currentUserInfo.userName;
  inputJob.value = currentUserInfo.userJob;
  formProfile.open();
}

// сохраняет новые данные о пользователе 
// const handleProfileSubmit = (data) => {

//   userInfo.setUserInfo(data['name'], data['job']);
//   formProfile.close();
// } 

const handleProfileSubmit = (data) => {

  formProfile.loadingSubmit(true);
  api.setInfoUserData({
    name: data['name'],
    about: data['job']
  })
    .then((data) => {
      userInfo.setUserInfo({
        userName: data.name,
        userJob: data.about
      });
    })
    .then(() => {
      formProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formProfile.loadingSubmit(false);
    })
} 

// открытие попапа замены аватарки
const openPopupAvatar = () => {
  formAddAvatar.resetValidation();
  formAvatar.open();
}

// сохраняет новые данные после замены аватарки
const changeAvatar = () => {
  formAvatar.loadingSubmit(true);
  api.setAvatarUser(formAvatarElement.value)
  .then((data) => {
    userUnfo.setAvatarUser(data.avatar);
  })
  .then(() => {
    formAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    formAvatar.loadingSubmit(false);
  })
}

// открытие попапа пользователя
editButton.addEventListener('click', openPopupProfile);

// открытие попапа с формой карточек
addButton.addEventListener('click', openPopupForm);

// открытие попапа с аватаркой
redAvatarButton.addEventListener('click', openPopupAvatar);