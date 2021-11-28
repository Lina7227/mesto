class FormValidator {
    constructor (config, formElement) {
        this._formElement = formElement;
        this._config = config;
        this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        this._submitButton = formElement.querySelector(this._config.submitButtonSelector);
    }

    // показ ошибки
    _displayError = (errorElement, inputElement) => {
        
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.inputErrorClass);
    }

    // скрытие ошибки
    _hideError = (errorElement, inputElement) => {
        
        errorElement.textContent = '';
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    // метод для очистки ошибок
    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {

            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            this._hideError(inputElement, errorElement);
        });
        this._formElement.reset();
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
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }
    
    // обрабатывает инпуты 
    _setEventListeners = () => {

        const isFormValid = this._formElement.checkValidity();
        this._toggleButtonState(isFormValid);
        
        Array.from(this._inputList ).forEach(inputElement => {

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

    // активизирует валидацию
    enableValidation = () => {
        
        this._setEventListeners();
    }

}

export {FormValidator};
