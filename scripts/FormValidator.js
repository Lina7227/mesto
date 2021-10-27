class FormValidator {
    constructor (config, formElement) {
        this._formElement = formElement;
        this._config = config;
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
        const button = this._formElement.querySelector(this._config.submitButtonSelector);

        if (isActive) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }
    
    // обрабатывает инпуты 
    _setEventListeners = () => {

        const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
        const isFormValid = this._formElement.checkValidity();
        this._toggleButtonState(isFormValid);
        // console.log(inputList);
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

    // активизирует валидацию
    enableValidation = () => {
        const form = this._formElement;
        
        this._setEventListeners(form, this.config);
    }

}

export {FormValidator};
