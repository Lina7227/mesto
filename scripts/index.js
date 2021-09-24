const profile = document.querySelector('.profile');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profileInfo.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

const closeButton = popup.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');

// Находим форму в DOM
const formElement = document.querySelector('.form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.form__item_input_name');
const jobInput = formElement.querySelector('.form__item_input_job');




// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = profileInfo.querySelector('.profile__title');
const profileSubtitle = profileInfo.querySelector('.profile__subtitle');



function popupToggle() {
  popup.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    } 
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value; 
    const jobValue = jobInput.value;
   
    // Вставьте новые значения с помощью textContent
    
    profileTitle.textContent = nameValue;
    profileSubtitle.textContent = jobValue;
    popupToggle();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);


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

const elementsTable = document.querySelector('.elements__table');
const imgElementTemplate = document.querySelector('.element-template');

// initialCards.forEach((item) => {
//   let imgElementTemplate = document.querySelector('.element-template');
//   let newElement = imgElementTemplate.content.cloneNode(true);
//   newElement.querySelector(".element__image").src.textContent = item.Link;
//   newElement.querySelector(".element__title").textContent = item.name;
//   elementsTable.append(newElement);
// });

// const imgInput = imgElementTemplate.querySelector(".form__item_input_link");
// const titleInput = imgElementTemplate.querySelector(".form__item_input_title");

// createCard[
//   {
//   link: placeLinkInput.value,
//   name: placeNameInput.value
//   }
// ];

// function formSubmitAdd(evt){
//   evt.preventDefault();
//   let imgElementTemplate = document.querySelector(".element-template").content;
//   let newElement = imgElementTemplate.cloneNode(true);
//   newElement.querySelector(".element__image").src = imgInput.value;
//   newElement.querySelector(".element__title").src = titleInput.value;
//   elementsTable.prepend(popupAdd);
// }



function addCardImg(item){
  const addElement = imgElementTemplate.content.cloneNode(true);
  addElement.querySelector(".element__title").textContent = item.name;
  addElement.querySelector(".element__image").src = item.link;
  addElement.querySelector(".element__emotion").addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__emotion_active");
  });

  elementsTable.prepend(addElement);

  
  const deleteButton = document.querySelector('.element__remove');
  deleteButton.addEventListener('click', function () {
    const element = deleteButton.closest('.element');
    element.remove();
  });
    
}



initialCards.map(addCardImg);