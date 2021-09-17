let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile__info');
let editButton = profileInfo.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');

// Находим форму в DOM
let formElement = document.querySelector('.form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__item_input_name');
let jobInput = formElement.querySelector('.form__item_input_job');



// Выберите элементы, куда должны быть вставлены значения полей
let profileTitle = profileInfo.querySelector('.profile__title');
let profileSubtitle = profileInfo.querySelector('.profile__subtitle');


function popupToggle() {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        nameInput.value.textContent = profileTitle;
        jobInput.value.textContent = profileSubtitle;
    } 
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value; 
    let jobValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
    
    profileTitle.textContent = nameValue;
    profileSubtitle.textContent = jobValue;
    popupToggle();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// editButton.addEventListener('click', openPopupHandler);
editButton.addEventListener('click', popupToggle);

closeButton.addEventListener('click', popupToggle);
