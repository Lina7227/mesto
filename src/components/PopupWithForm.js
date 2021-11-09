import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector)
        this.handleFormSubmit = handleFormSubmit;
        this._element = popupSelector;
        this._form = this._element.querySelector('.form');
    }

    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._element.querySelectorAll('.form__item');
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;

    }
    // обработка инпутов
    _handlInput = (evt) => {

        evt.preventDefault();
        this.handleFormSubmit(evt, this._getInputValues())
    }

    setEventListeners() {
        super.setEventListeners();
    
        this._form.addEventListener('submit', this._handlInput);

    }

    close() { 
        this._form.removeEventListener('submit', this._handlInput);
        this._form.reset();
        super.close();
    }

}

export { PopupWithForm };