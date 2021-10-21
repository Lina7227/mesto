class FormValidator {
    constructor (config, formSelector) {

        this._formSelector = formSelector;
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
    _inspectInputValidity = (formElement, inputElement) => {

            
        const isInputNotValid = !inputElement.validity.valid;
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
        if (isInputNotValid) {
            this._isplayError(errorElement, inputElement);
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
    _setEventListeners = (formElement) => {

        const inputList = formElement.querySelectorAll(this._inputSelector);
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        const isFormValid = formElement.checkValidity();
        this._toggleButtonState(buttonElement, isFormValid);
        
        Array.from(inputList).forEach(inputElement => {

            inputElement.addEventListener('input', () => {
                const isFormValid = formElement.checkValidity();

                this._inspectInputValidity(formElement, inputElement);
                this._toggleButtonState(buttonElement, isFormValid);
            });
        }); 

    }

    // активизирует валидацию
    enableValidation() {
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners(); 
    }
    

}


