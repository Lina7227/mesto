let profile = document.querySelector('.profile');
let profile__info = profile.querySelector('.profile__info');
let editButton = profile__info.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let saveButton = popup.querySelector('.form__button');
let closeButton = popup.querySelector('.popup__close');

// Находим форму в DOM
let formElement = document.querySelector('.form');
let inputCont = formElement.querySelector('.form__input-container');
// Находим поля формы в DOM
let nameInput = inputCont.querySelector('.form__item_name_input');
let jobInput = inputCont.querySelector('.form__item_job_input');

editButton.onclick = function(){
    editButton.classList.add('profile__edit-button_popup_opened');
    popup.setAttribute('style', 'display: flex');
    }

closeButton.onclick = function(){ 
    editButton.classList.remove('profile__edit-button_popup_opened');
    popup.setAttribute('style', 'display: none');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let nameValue = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
    let jobValue = jobInput.value; 

    // Выберите элементы, куда должны быть вставлены значения полей

    let profile__title = profile__info.querySelector('.profile__title');
    let profile__subtitle = profile__info.querySelector('.profile__subtitle');
    // Вставьте новые значения с помощью textContent
    profile__title.textContent = nameValue;
    profile__subtitle.textContent = jobValue;
    editButton.classList.remove('profile__edit-button_popup_opened');
    popup.setAttribute('style', 'display: none');
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);