const config = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__item_input_invalid'
} 

class FormValidator {
    constructor (config, formSelector) {
        this._formSelector = formSelector;
        this._formElement = document.querySelector(this._formSelector);
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._button = document.querySelector(this._submitButtonSelector);
    }

    // показ ошибки
    _displayError = (errorElement, inputElement) => {
        
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    }

    // скрытие ошибки
    _hideError = (errorElement, inputElement) => {
        
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    }

    //  проверка на ошибку
    _inspectInputValidity = (inputElement) => {

            
        const isInputNotValid = !inputElement.validity.valid;
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
        if (isInputNotValid) {
            this._displayError(errorElement, inputElement);
        } else {
            
            this._hideError(errorElement, inputElement);
        }
    }

    // переключение кнопки: активное/ неактивное состояние
    _toggleButtonState = (isActive) => {
        
        if (isActive) {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
        }
    }
    
    // обрабатывает инпуты 
    _setEventListeners = () => {

        const inputList = this._formElement.querySelector(this._inputSelector);
        const isFormValid = this._formElement.checkValidity();
        this._toggleButtonState(isFormValid);
        
        Array.from(inputList).forEach(inputElement => {

            inputElement.addEventListener('input', () => {
                const isFormValid = this._formElement.checkValidity();

                this._inspectInputValidity(inputElement);
                this._toggleButtonState(isFormValid);
            });
        }); 

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();

        });

    }

    /// активизирует валидацию
    enableValidation = () => {
        const forms = document.querySelector(this._formSelector);
        console.log(forms);
        Array.from(forms).forEach(formElement => {
        
            this._setEventListeners(formElement, this._formSelector);
        });
    
    }

}

export {config, FormValidator};
