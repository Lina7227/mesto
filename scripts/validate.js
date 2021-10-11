// показ ошибки
const displayError = (errorElement, inputElement, config)=> {
    
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
}

// скрытие ошибки
const hideError = (errorElement, inputElement, config)=> {
    
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.remove(config.inputErrorClass);
}

//  проверка на ошибку
const inspectInputValidity = (formElement, inputElement, config) => {

        const isInputNotValid = !inputElement.validity.valid;
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
       
        if (isInputNotValid) {
            displayError(errorElement, inputElement, config);
        } else {
            
            hideError(errorElement, inputElement, config);
        }
}

// переключение кнопки: активное/ неактивное состояние
const toggleButtonState = (button, isActive, config) => {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = 'desabled';
    }
}

// обрабатывает инпуты 
const setEventListers = (formElement, config) => {

    const inputList = formElement.querySelectorAll(config.inputSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    
    Array.from(inputList).forEach(inputElement => {

        inputElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();

            inspectInputValidity(formElement, inputElement, config);
            toggleButtonState(buttonElement, isFormValid, config);
        })
    })

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });



}

// активизирует валидацию
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    
    Array.from(forms).forEach(formElement => {
        
        setEventListers(formElement, config);
    });
}

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__item_input_invalid'
} 

enableValidation(validationConfig);
