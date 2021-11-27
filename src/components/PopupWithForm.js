import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor({popup, handleFormSubmit}) {
        super(popup)
        this.handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._popup.querySelectorAll('.form__item');
        this._submButton = this._form.querySelector('.form__button');
        this._submButtonExpectation = this._submButton.textContent;
    }

    // замена надписи на кнопке сабмита
    loadingSubmit(isLoading) {
        if(isLoading) {
            this._submButton.textContent = 'Сохранение...';
        } else {
            this._submButton.textContent = this._submButtonExpectation;
        }
    }

    _getInputValues() {
        
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            console.log("222");
            this._formValues[input.name] = input.value;
        });
        console.log("333");

        // возвращаем объект значений
        return this._formValues;

    }
    // обработка сабмита
    handleSubmit = (evt) => {

        evt.preventDefault();
        const getInputValues = this._getInputValues();
        console.log("111");
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