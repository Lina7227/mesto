import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor({popup, handleFormSubmit}) {
        super(popup)
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__item');
    }

    _getInputValues() {
        
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;

    }
    // обработка сабмита
    handleSubmit = (evt) => {

        evt.preventDefault();
        const getInputValues = this._getInputValues();
        this.handleFormSubmit(getInputValues);
    }

    setEventListeners() {
        super.setEventListeners();
    
        this._form.addEventListener('submit', this.handleSubmit);

    }

    close() { 
        this._form.reset();
        super.close();
    }

}

export { PopupWithForm };