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
// const titleInput = formImgElement.querySelector ('.form__item_input_title'); // находим инпуты в форме
// const linkInput = formImgElement.querySelector ('.form__item_input_link');


const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');

const initialCards = [
  {
    name: 'Балтийское море',
    link: '../images/kaliningrad.jpg'
  },
  {
    name: 'Мыс Фиолент',
    link: '../images/Fiolent.jpg'
  },
  {
    name: 'Уральские горы',
    link: '../images/ural_mountains.jpg'
  },
  {
    name: 'Пермский край',
    link: '../images/perm.jpg'
  },
  {
    name: 'Ялта',
    link: '../images/Yalta.jpg'
  },
  {
    name: 'Соловецкие острова',
    link: '../images/solovki.jpg'
  }
];


function addNewCardImg(evt) {
  evt.preventDefault();

  const titleInput = evt.currentTarget.querySelector ('.form__item_input_title').value; 
  const linkInput = evt.currentTarget.querySelector ('.form__item_input_link').value;
  addCardImg({link: linkInput, name: titleInput});

  const newInitialCards = {
    name: titleInput,
    link: linkInput
  }

  initialCards.push(newInitialCards);

  popupToggle(popupEditElement);
  evt.currentTarget.reset();
}

function likeElement(evt) {
  evt.target.classList.toggle("element__emotion_active");
}

function deleteButton(evt){
  evt.target.closest('.element').remove();
}

function addCardImg(item){
      const addElement = imgElementTemplate.content.cloneNode(true);
      addElement.querySelector(".element__title").textContent = item.name;
      addElement.querySelector(".element__image").src = item.link;
      addElement.querySelector('.element__emotion').addEventListener('click', likeElement);
      addElement.querySelector('.element__remove').addEventListener('click', deleteButton);
      

      elementsTable.prepend(addElement);

     
    const element = elementsTable.querySelector('.element');
    let imageOpen = element.querySelectorAll('.element__image');

    imageOpen.forEach( function(el){
      el.addEventListener('click', function(){
        popupToggle(popupImgView)
        console.log(imageOpen);
      } )
    }
    );
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


const popupImgView = document.querySelector('.popup__image_view');
const tabbleElement = elementsTable.querySelector('.element');


const elementTitle = tabbleElement.querySelector('.element__title');
const btnCloseImage = popupImgView.querySelector('.popup__close_image');
const imgPopup = popupImgView.querySelector('.popup__image');
const titlePopup = popupImgView.querySelector('.popup__title');
const imageOpen = tabbleElement.querySelectorAll('.element__image');
// const elements = document.querySelectorAll('.element');

// console.log(imageOpen);



function popupToggle(popup) {
  popup.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
        titlePopup.value = elementTitle.textContent;
        imgPopup.src = imageOpen.src;
    
    } 
}



editButton.addEventListener('click', () => popupToggle(popupEditProfile));
closeButton.addEventListener('click', () => popupToggle(popupEditProfile));

addButton.addEventListener('click', () => popupToggle(popupEditElement));
// console.log(elements.length);


btnCloseElement.addEventListener('click', () => popupToggle(popupEditElement));
btnCloseImage.addEventListener('click', () => popupToggle(popupImgView))

formElement.addEventListener('submit', formSubmitHandler);
formImgElement.addEventListener("submit", addNewCardImg);






