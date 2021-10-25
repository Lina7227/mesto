const popupEditProfile = document.querySelector('.popup_edit_profile');
const profile = document.querySelector('.profile');
const popupEditElement = document.querySelector('.popup_edit_element'); // попап добавления картинок
const popupImgView = document.querySelector('.popup_images');
const closeProfilePopupButton = popupEditProfile.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const btnCloseElement = popupEditElement.querySelector('.popup__close_element');
const btnCloseImage = popupImgView.querySelector('.popup__close_image');
const popups = document.querySelectorAll('.popup');
const profileInfo = profile.querySelector('.profile__info');

const editButton = profileInfo.querySelector('.profile__edit-button');

// функция открытия и закрытия попапа
function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
      document.addEventListener("keydown", closePopupEsc);
    } else {
      document.removeEventListener("keydown", closePopupEsc);
    }
    
}

// функция для открытия попапа редактирования профиля(данные из профиля в момент открытия передаются в поля инпутов)
function popupToggleProfile () {
    popupToggle(popupEditProfile);
  
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
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

closeProfilePopupButton.addEventListener('click', () => popupToggle(popupEditProfile));
editButton.addEventListener('click', () => popupToggleProfile(popupEditProfile));
addButton.addEventListener('click', () => popupToggle(popupEditElement));

btnCloseElement.addEventListener('click', () => popupToggle(popupEditElement));
btnCloseImage.addEventListener('click', () => popupToggle(popupImgView));

export {popupToggle};