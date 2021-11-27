import { Popup } from './Popup.js';

class PopupWithConfirm extends Popup{
    constructor(popup) {
        super(popup);
        this._form = this._popup.querySelector('.form');
        this._submButton = this._form.querySelector('.form__button_add-remove');
        this._submButtonExpectation = this._submButton.textContent;
        this._submitHandlerBind = this._submitHandler.bind(this);
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._submitHandlerBind);
        super.setEventListeners();
    }

    // замена надписи на кнопке сабмита
    loadingSubmit(isLoading) {
        if(isLoading) {
            this._submButton.textContent = 'Удаление...';
        } else {
            this._submButton.textContent = this._submButtonExpectation;
        }
    }

    setGoSubmit(action) {
        this._SubmitOn = action;
    }

    _submitHandler(evt) {
        evt.preventDefault();
        this._SubmitOn;
    }

    close = () => {
        super.close();
        this._form.removeEventListener('submit', this._submitHandlerBind);
        
    }
}

export { PopupWithConfirm };